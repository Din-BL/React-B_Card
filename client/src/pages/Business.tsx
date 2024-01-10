import {getData} from '../utils/localStorage';
import {useParams} from 'react-router-dom';
import {BusinessCard} from '../utils/types';
import Contact from './Contact';
import useCard from '../hooks/useCard';
import About from './About';

function Business() {
  const {id} = useParams();
  const data = {...getData('defaultCards').find((business: BusinessCard) => business._id === id)};
  const card = useCard('business', data);

  return (
    <>
      {card && (
        <>
          <About businessInfo={card} />
          <Contact businessInfo={card} />
        </>
      )}
    </>
  );
}

export default Business;
