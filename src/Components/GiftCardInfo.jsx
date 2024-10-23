import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faUtensils, faMobile } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import GiftCardPurchaseOptions from './GiftCardPurchaseOptions';
import GiftCardInstructions from './GiftCardInstructions';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2em;

`;

const TextContainer = styled.div`
  flex: 1;
  padding: 2em;
  margin-left: 4em;
  margin-bottom: 7em;
`;

const VideoContainer = styled.div`
  flex: 1;
  margin-right: 2em;
  border-radius: 10px;
  margin-bottom: 1em;
  margin-top: 2em;
  margin-left: 4em;
  margin-right: 8em;
`;

const InfoBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 5em;
  margin-bottom: 6em;
  margin-left: 7em;
  margin-right: 7em;
`;

const InfoBox = styled.div`
  text-align: center;
  width: 30%;
  padding: 1em;
  margin-top: 2.5em;
  margin-bottom: 2.5em;
  margin-left: 1em;
  margin-right: 1em;
  background-color: white;
  border-radius: 10px;
  border: 6px solid #F5DEB3;
  box-shadow: 5px 5px 5px #535bf2;
`;
const StyledVideo = styled.video`
  width: 130%; // Esto hará que el video ocupe todo el ancho de su contenedor
  max-width: 700px; // Esto limitará el ancho máximo del video a 500px
  height: auto; // Esto mantendrá la relación de aspecto del video
  box-shadow: 5px 5px 5px #333;
  border-radius: 10px;
  border: 2px solid #535bf2;
`;
const Divider = styled.hr`
  border: none; // Cambia el color según tus necesidades
  border-top: 2px solid #535bf2; // Cambia el color según tus necesidades
  margin: 20px 0; 
  width: 50%;
  box-shadow: 5px 5px 5px #333;
`;

const StyledH1 = styled.h1`
    color: #757575;
    font-weight: bold;
    text-align: center;
    margin-top: 8rem;
    margin-bottom: 1rem;
    font-size: 3rem;
    box-shadow: 0 0 20px #a7a7f5;
    border-radius: 10px;
    border: 2px solid #a7a7f5;
    padding: 1rem;
`;

const StyledH2 = styled.h2`
  text-align: left;
  font-size: 2em;
  margin-top: 2em;
  margin-left: 30px;
  margin-right: 40px;
  font-weight: bold;
`;

const StyledH3 = styled.h3`
    font-size: 20px;
    color: #333;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    text-align: center; // Cambiado a justify para justificar el texto


    `;

const StyledH4 = styled.h4`
    font-size: 22px;
    color: #333;
    text-align: center;

`;

const StyledP = styled.p`
    font-size: 18px;
    color: #333;
    margin-left: 20px;
    margin-right: 20px;
`;

const DividerLeft = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 60px;
  margin-bottom: 0px;
  margin-left: 0; // Alinea el Divider a la izquierda
  margin-right: auto; // Asegura que el espacio restante esté a la derecha
`;

const DividerRight = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 120px;
  margin-bottom: 100px;
  margin-left: auto; // Asegura que el espacio restante esté a la izquierda
  margin-right: 0; // Alinea el Divider a la derecha
`;


const GiftCardInfo = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setSelectedMenu(selectedMenu === menu ? null : menu);
  };
  return (
    <div>
      <Container>
        <TextContainer>
          <StyledH1>Tarjetas regalo de DineBooker</StyledH1>
          <StyledH3>Regala una increíble experiencia gastronómica a tus seres queridos.</StyledH3>
        </TextContainer>
        <VideoContainer>
        <StyledVideo src="images/giftcard2.mp4" autoPlay muted loop />        
        </VideoContainer>
      </Container>
      <DividerLeft />
      <div>
        <StyledH2 style={{ textAlign: 'center' }}>El regalo ideal para cualquier ocasión</StyledH2>
        <StyledH3 style={{ textAlign: 'center' }}>¿Quieres regalar algo a tus amigos y familiares? Ofrece el regalo de disfrutar de una buena comida con las tarjetas regalo de DineBooker.</StyledH3>
      </div>
      <InfoBoxContainer>
        <InfoBox>
          <FontAwesomeIcon icon={faGift} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH4>Apto para todos los gustos</StyledH4>
          <StyledP>¡Olvídate de buscar el regalo perfecto! Ofrécele a tu gente la libertad de elección. Hay opciones aptas para todos los presupuestos.</StyledP>
        </InfoBox>
        <InfoBox>
          <FontAwesomeIcon icon={faUtensils} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH4>Posibilidades ilimitadas</StyledH4>
          <StyledP>Úsala en más de 6 000 restaurantes, incluidos los de la Guía MICHELIN, y combínala con las promociones y las ofertas especiales de DineBooker.</StyledP>
        </InfoBox>
        <InfoBox>
          <FontAwesomeIcon icon={faMobile} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH4>Conveniencia</StyledH4>
          <StyledP>Texto de descripción para la conveniencia de las tarjetas de regalo.</StyledP>
        </InfoBox>
      </InfoBoxContainer>
      <DividerRight />
      <GiftCardPurchaseOptions />
      <DividerLeft />
      <GiftCardInstructions />
    </div>
  );
};

export default GiftCardInfo;