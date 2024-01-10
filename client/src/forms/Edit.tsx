import {useLocation, useNavigate, useParams} from 'react-router-dom';
import Form from '../components/Form';
import {CardFields} from '../utils/fields';
import {cardSchema} from '../utils/schema';
import {editCard} from '../utils/services';
import {toast} from 'react-toastify';
import React, {useContext} from 'react';
import {AllCardsContext, CardsContext, FavoriteContext} from '../context/Cards';
import {getData, setData} from '../utils/localStorage';
import {LoginInfoContext} from '../context/LoginInfo';
import {errorMsg, limitedRequests, updatedCards, usernameStorageSync} from '../utils/helpers';
import {BusinessCard} from '../utils/types';
import Swal from 'sweetalert2';
import {editAlert, errorAlert} from '../utils/sweetalert';
import useCard from '../hooks/useCard';

function Edit() {
  const {setLoginInfo, loginInfo} = React.useContext(LoginInfoContext);
  const {editData} = useContext(CardsContext);
  const {editDefaultCard} = useContext(AllCardsContext);
  const {editFavorite} = useContext(FavoriteContext);
  const {id} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = getData('userInfo', '_id');
  const defaultCards = getData('defaultCards');
  const favoriteCards = getData('favoriteCards');
  let {business} = loginInfo;
  business = business === null ? false : business;
  const card = useCard(business);
  const staticData = {email: card?.email || ''};

  const handleEdit = <Type,>(data: Type) => {
    editAlert().then((result) => {
      if (result.isConfirmed && id) {
        if (limitedRequests(navigate, location)) {
          errorAlert();
        } else {
          editCard(id, {...(data as BusinessCard), ...staticData})
            .then((info) => {
              editData(id, info.data);
              editDefaultCard(id, info.data);
              editFavorite(id, info.data);
              setData('defaultCards', updatedCards(defaultCards, info.data));
              favoriteCards && setData('favoriteCards', updatedCards(favoriteCards, info.data));
              usernameStorageSync(info.data, true);
              navigate(`/my-cards/${userId}`);
              toast.success(`${info.data.title} info been updated`);
            })
            .catch((e) => errorMsg(e, navigate, setLoginInfo));
        }
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
        navigate(`/my-cards/${userId}`);
      }
    });
  };

  return <>{card && <Form FormTitle="Edit Card" FormFields={CardFields} FormSchema={cardSchema} handleForm={handleEdit} initialValue={card} />}</>;
}

export default Edit;
