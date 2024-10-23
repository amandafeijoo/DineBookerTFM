import React from 'react';
import styled from 'styled-components';
import AppStoreButton from '../assets/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';
import googlePlayButton from '../assets/googleplay.png';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 150px; // Ajusta este valor según tus necesidades
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 1.5em; 
    margin-bottom: 20px; // Ajusta este valor según tus necesidades
    text-align: left; // Ajusta este valor según tus necesidades
    margin-left: 60px; // Ajusta este valor según tus necesidades
    color: #333;
`;

const Video = styled.video`
    width: 55%; // Ajusta este valor según tus necesidades
    height: auto;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333;
    border: 5px solid #99aaff;
    margin-right: 60px; // Ajusta este valor según tus necesidades
`;

const DownloadButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px; // Ajusta este valor según tus necesidades
  margin-left: 120px; // Ajusta este valor según tus necesidades
    margin-top: 20px; // Ajusta este valor según tus necesidades
    gap: 10px; // Ajusta este valor según tus necesidades
    border-radius: 10px;
    
    `;

const BonusBanner = styled.div`
  background-color: lightgreen; // Ajusta este valor según tus necesidades
  width: 100%; // Ajusta este valor según tus necesidades
  height: 100px; // Ajusta este valor según tus necesidades
  color: black; // Ajusta este valor según tus necesidades
  padding: 10px; // Ajusta este valor según tus necesidades
  text-align: center;
  margin-top: 20px; // Ajusta este valor según tus necesidades
  margin-bottom: 20px; // Ajusta este valor según tus necesidades
  font-size: 1.5em; // Ajusta este valor según tus necesidades
`;




const DownloadApp = () => (
    <Container>
  <FlexContainer>
  <ColumnDiv>
    <Title>Descarga la aplicación DineBooker y reserva el restaurante adecuado en solo unos pocos clics</Title>
    <DownloadButtons>
      <a href="https://apps.apple.com/idYOUR_APP_ID" target="_blank" rel="noopener noreferrer">
        <img src={AppStoreButton} alt="Descargar de la App Store" style={{width: '150px', display: 'block', marginBottom: '10px'}} />
      </a>
      <a href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME" target="_blank" rel="noopener noreferrer">
        <img src={googlePlayButton} alt="Descargar de Google Play" style={{width: '160px', display: 'block'}} />
      </a>
    </DownloadButtons>
  </ColumnDiv>
  <Video autoPlay loop muted>
    <source src="/images/dinepointsapp.mp4" type="video/mp4" />
  </Video>
</FlexContainer>
  <BonusBanner>
  Bonificación de 1000 DinePoints* al reservar por primera vez en la aplicación DineBooker con el código    <span style={{ color: 'blue' }}>APP24</span>
  </BonusBanner>
</Container>
);

export default DownloadApp;