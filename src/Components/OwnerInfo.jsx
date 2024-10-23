import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import OwnerInfoDetails from './OwnerInfoDetails';
import VideoAndJoinButton from './VideoAndJoinButton';

const Title = styled.h1`
  font-family: 'Belleza', sans-serif;
  text-align: center;
  margin-left: 40px;
  font-size: 2.2em;
  text-decoration: underline;
  text-decoration-color: transparent;
  background-image: linear-gradient(to right, #ff69b4, #98e098, #99aaff);
  background-size: 100% 2px;
  background-repeat: no-repeat;
  background-position: 0 100%;
`;

const Subtitle = styled.h2`
  font-family: 'Belleza', sans-serif;
  text-align: left;
  margin-left: 80px; 
  margin-top: 50px; 
  font-size: 1.2em;
  margin-bottom: 50px;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 120px;
`;

const Divider = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 20px;
  margin-bottom: 0px;
  margin-left: 0;
  margin-right: auto;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-right: 20px;
`;

const VideoContainer = styled.div`
  flex: 0.8;
  width: 40%;
  height: auto;
  border-radius: 10px;
`;

const BackgroundVideo = styled.video`
  width: 80%;
  height: auto;
  border-radius: 10px;
  border: 3px solid #99aaff;
  box-shadow: 
    0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
    0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
    0px 4px 20px rgba(153, 170, 255, 0.5);  // Azul  
  margin-left: 20px;
`;

const JoinButton = styled.button`
  display: block;
  width: auto;
  margin: 20px auto; // Centra el botón horizontalmente
  font-family: 'Belleza', sans-serif;
  font-size: 1.7em;
  margin-bottom: 50px;
  background-color: #87CEFA;
  color: #000000;
  border: 3px solid #646cff;
  border-radius: 10px;
  padding: 14px 40px;
  box-shadow: 
    0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
    0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
    0px 4px 20px rgba(153, 170, 255, 0.5);  // Azul
  font-size: 1.2em;
  cursor: pointer;
  &:hover {
    color: #ffff;
    background-color: #99aaff;
  }
`;

const OwnerInfo = () => {
  const navigate = useNavigate();

  return (
    <> 
      <MainContainer>
        <TextContainer>
          <Title>Atrae y gestiona nuevos clientes a tu restaurante</Title>
          <Subtitle>¿Deseas aumentar los ingresos de tu restaurante y optimizar tu actividad? Comienza a recibir nuevas reservas de comensales locales y de todas partes del mundo.</Subtitle>
          <JoinButton onClick={() => navigate('/registrationstepper')}>
            ÚNETE
          </JoinButton>
        </TextContainer>
        <VideoContainer>
          <BackgroundVideo autoPlay loop muted>
            <source src="/images/EresPropietario.mp4" type="video/mp4" />
          </BackgroundVideo>          
        </VideoContainer>
      </MainContainer>
      <Divider />
      <OwnerInfoDetails />
      <Divider />
      <VideoAndJoinButton />
    </>
  );
};

export default OwnerInfo;