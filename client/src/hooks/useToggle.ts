import {useState, useEffect} from 'react';
import {BusinessCard} from '../utils/types';
import {getData} from '../utils/localStorage';

export function useToggle(card: BusinessCard): [boolean, () => void] {
  const [checked, setChecked] = useState(false);
  const toggle = () => setChecked((currentCheck) => !currentCheck);

  useEffect(() => {
    const favData = getData(getData('userInfo', 'userName'));
    if (favData) {
      const isFavorite = favData.some((data: BusinessCard) => data._id === card._id);
      setChecked(isFavorite);
    }
  }, [card]);

  return [checked, toggle];
}
