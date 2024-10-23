import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import AppStoreButton from '../assets/SVG/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg';
import googlePlayButton from '../assets/googleplay.png';
import { useNavigate } from 'react-router-dom';
import DinePoints from './DinePoints';

const StyledParagraph = styled.p`
  font-size: 16px;
  margin-bottom: 10px; // Ajusta este valor según tus necesidades
  padding-bottom: -10px;
  margin-top: 10px; // Ajusta este valor según tus necesidades
  margin-left: 20px;
  margin-right: 80px;
  color: #9397f8;
  cursor: pointer;
  &:hover {
    color: #535bf2;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: #9397f8;
 
   
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px; // Ajusta este valor según tus necesidades
`;

const IconLabel = styled.span`
  margin-left: 10px; // Ajusta este valor según tus necesidades
  cursor: pointer;
  &:hover {
    color: #535bf2;
  }
`;

const StyledH3 = styled.h3`
  color:  #fff;
`;

const Footer = styled.footer`
  width: 100%;
  background-color: #333;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: space-around; // O puedes usar 'space-evenly'
  column-gap: 0px; // Ajusta este valor según tus necesidades
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;



const Button = styled.button`
  width: 200px;
  background-color: #535bf2;
  color: #fff;
  border: none;
  border-radius: 0;
  padding: 10px;
  margin-bottom: 10px;
  &:hover {
    background-color: #000;
  }
`;

const FooterComponent = () => {
    const navigate = useNavigate(); 
    return (
      <Footer>
        <Column>
        <div>
  <StyledH3>Descargar aplicación</StyledH3>
  <a href="https://apps.apple.com/idYOUR_APP_ID" target="_blank" rel="noopener noreferrer">
    <img src={AppStoreButton} alt="Descargar de la App Store" style={{width: '150px', display: 'block', marginBottom: '10px'}} />
  </a>
  {/* Asegúrate de reemplazar el enlace de Google Play con el enlace correcto y la imagen cuando la tengas */}
  <a href="https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME" target="_blank" rel="noopener noreferrer">
    <img src={googlePlayButton} alt="Descargar de Google Play" style={{width: '150px', display: 'block'}} />
  </a>
</div>
        </Column>
        <Column>
        <StyledParagraph onClick={() => navigate('/aboutdinebooker')}>Sobre nosotros</StyledParagraph>
        <StyledParagraph onClick={() => navigate('/dinepoints')}>Programa DinePoints</StyledParagraph>
        <StyledParagraph onClick={() => navigate('/contact')}>Información de contacto</StyledParagraph>
        <StyledParagraph onClick={() => navigate('/ownerinfo')}>¿Tienes un restaurante?</StyledParagraph>
        <StyledParagraph onClick={() => navigate('/giftcardinfo')}>Tarjeta Regalo DineBooker</StyledParagraph>
        </Column>
        <Column>
        <StyledH3>Síguenos</StyledH3>
            <SocialIcons>
            <IconContainer>
                <FaFacebook />
                <IconLabel>Facebook</IconLabel>
            </IconContainer>
            <IconContainer>
                <FaInstagram />
                <IconLabel>Instagram</IconLabel>
            </IconContainer>
            <IconContainer>
                <FaLinkedin />
                <IconLabel>LinkedIn</IconLabel>
            </IconContainer>
            <IconContainer>
                <FaTwitter />
                <IconLabel>Twitter</IconLabel>
            </IconContainer>
            </SocialIcons>
        </Column>
      </Footer>
    );
  };
  
  export default FooterComponent;