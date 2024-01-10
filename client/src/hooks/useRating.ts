import {useState, useContext} from 'react';
import {BusinessCard, isLiked, userRate} from '../utils/types';
import {getData, setData} from '../utils/localStorage';
import {AllCardsContext} from '../context/Cards';

export function useRating(card: BusinessCard) {
  const defaultCards = getData('defaultCards');
  const username = getData('userInfo', 'userName');
  const initialValue = {liked: false, disliked: false};

  const initialState = () => {
    const ratingInfo = getData(`rating${username}`) || false;
    if (ratingInfo) {
      const isRatingExist = ratingInfo.find((rating: userRate) => rating._id === card._id);
      return isRatingExist ? isRatingExist.rating : initialValue;
    } else {
      return initialValue;
    }
  };

  const [checked, setChecked] = useState<isLiked>(initialState);
  const {editDefaultCard} = useContext(AllCardsContext);

  const rate = (rate: boolean) => {
    setChecked((prevChecked) => ({
      liked: !rate ? !prevChecked.liked : !rate,
      disliked: !rate ? rate : !prevChecked.disliked,
    }));
    const userInfo: userRate = {
      _id: card._id!,
      rating: {
        liked: !rate ? !checked.liked : !rate,
        disliked: rate ? !checked.disliked : rate,
      },
    };
    const ratingList = getData(`rating${username}`) || false;
    if (ratingList) {
      const updatedInfo = ratingList.map((card: userRate) => {
        return card._id === userInfo._id ? userInfo : card;
      });
      const isRatingExist = updatedInfo.some((card: userRate) => card._id === userInfo._id);
      !isRatingExist && updatedInfo.push(userInfo);
      setData(`rating${username}`, updatedInfo);

      const updatedCards = defaultCards.map((card: BusinessCard) => {
        if (card._id === userInfo._id) {
          userInfo.rating.liked ? (card.rating! += 1) : (card.rating! -= 1);
          editDefaultCard(userInfo._id, card);
          return card;
        } else {
          return card;
        }
      });
      setData('defaultCards', updatedCards);
    } else {
      setData(`rating${username}`, [userInfo]);
    }
  };

  return {checked, rate};
}
