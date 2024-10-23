import React from 'react';
import styled from 'styled-components';
import DinePointsInfo from './DinePointsInfo';
import DinePointsInfo2 from './DinePointsInfo2';

const Container = styled.div`
  text-align: center;
  
`;

const StyledH1 = styled.h1`
    color: #000;
    font-weight: bold;  // Hace el texto en negrita
    font-size: 2.5em;
    margin-top: 40px;
    margin-bottom: 10px;
    font-family: 'Belleza', sans-serif;
    margin-left: 380px;
`;

const StyledH2 = styled.h2`
    color: #333;
    font-size: 2em;
    margin-right: 750px;

`;

const StyledP = styled.p`
    color: #445599;
    background-color: rgba(255, 255, 255, 0.5);  // 0.5 es el nivel de transparencia
    font-size: 1.5em;
    font-weight: bold;  // Hace el texto en negrita
    margin-top: 30px;
    margin-bottom: 0px;
    font-family: 'Belleza', sans-serif;
    margin-left: 400px;
`;


const ImageContainer = styled.div`
  background-image: url('/images/dinepoints-2.png');
  background-repeat: no-repeat;
  background-size: cover;
  width: 80%;
  margin-left: 150px;  
  margin-right: 50px;  
  margin-top: 130px;
  height: 500px;
  border-radius: 10px;
  border: 4px solid #99aaff;
  box-shadow: 5px 5px 5px #333;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 300px;
  margin-right: 270px;
  margin-top: 100px; // Ajusta este valor según tus necesidades
  margin-bottom: 170px;
  border-radius: 10px;
  border: 3px solid #99aaff;
  box-shadow: 5px 5px 5px #333;
`;

const InfoText = styled.div`
  flex: 1;
  text-align: justify;  // Cambiado a justify para justificar el texto
  margin-right: 60px;
  margin-left: 60px;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const CircleContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

const Circle = styled.div`
  background-color: #EEDC82; // color verde olivo
  border-radius: 50%;
  color: #000;
  width: 170px;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  box-shadow: 5px 5px 5px #333;
    border: 2px solid #FFD700;
    font-size: 1em;    
`;
const InfoContainer2 = styled.div`
  display: flex;
  justify-content: space-between;
  margin-left: 270px;
  margin-right: 190px;
  margin-top: 30px; // Ajusta este valor según tus necesidades
  margin-bottom: 10px;

`;

const InfoText2 = styled.div`
  flex: 1;
    text-align: left;
    margin-right: 70px;
    margin-left: 70px;
    margin-top: 20px;
    margin-bottom: 60px;
`;


const DividerLeft = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 120px;
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


const VideoContainer = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: -100px; // Aumenta este valor para mover el video más a la izquierda
  margin-right: -50px;
  border-radius: 10px;
    border: 3px solid #99aaff;
    box-shadow: 5px 5px 5px #333;
`;

const StyledVideo = styled.video`
  width: 100%; // Ajusta este valor según tus necesidades
  height: auto;
  border-radius: 20px;
  
`;

const DinePoints = () => {
  return (
    <Container>
      <ImageContainer>
        <StyledH1>NUESTRO PROGRAMA DE FIDELIDAD</StyledH1>
        <StyledP>DINEBOOKER premia tu confianza y tu amor por la comida</StyledP>
      </ImageContainer>
      <DividerLeft />     
      <InfoContainer>
  <InfoText>
    <h2>¿Qué son los DinePoints?</h2>
    <p>Los DinePoints son los puntos de fidelidad que obtienes cuando reservas con DineBooker. Puedes canjearlos por descuentos de fidelidad de 10 € o 25 € en los restaurantes socios del programa. Estos descuentos no pueden acumularse con otras ofertas promocionales.</p>
  </InfoText>
  <CircleContainer>
    <Circle>
      <p>1000 DINE = 10 €  descuento en tu reserva</p>
    </Circle>
    <Circle>
      <p>2000 DINE = 25 € descuento en tu reserva</p>
    </Circle>
  </CircleContainer>
</InfoContainer>
  <DividerRight />

<StyledH2>¿Cómo consigo DinePoints?</StyledH2>
<InfoContainer2>
  <VideoContainer>
    <StyledVideo autoPlay loop muted>
      <source src="/images/dinepointsapp.mp4" type="video/mp4" />
      Tu navegador no soporta el elemento de video.
    </StyledVideo>
  </VideoContainer>
  <InfoText2>
    <DinePointsInfo2 /> {/* Usa el nuevo componente aquí */}
  </InfoText2>
</InfoContainer2>
    <DinePointsInfo />
    </Container>
  );
};

export default DinePoints;