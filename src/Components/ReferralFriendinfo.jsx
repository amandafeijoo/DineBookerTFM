import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCalendar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
    margin-bottom: 60px;
    margin-left: 160px;
    margin-right: 190px;
`;

const InfoBox = styled.div`
  background-color: white;
  border: 8px solid #99aaff; // Añade un borde amarillo
  padding: 20px;
  flex: 1;
  margin: 10px;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333;
`;

const Title = styled.h2`
    font-size: 35px;
    margin-bottom: 20px;
    margin-left: 175px;
    margin-right: 200px;
    text-align: left;
    margin-top: 70px;
    color: #333;
`;

const Text = styled.p`
    font-size: 17px;
`;

const StyledH3 = styled.h3`
    font-size: 20px;
`;

const ReferralFriendInfo = () => {
  return (
    <Container>
      <Title>Cómo invitar a tus amigos a usar DineBooker</Title>
      <InfoContainer>
        <InfoBox>
        <FontAwesomeIcon icon={faUtensils} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH3>Comparte tu código de recomendación</StyledH3>
          <Text>Invita a tus amigos compartiendo tu código que encuentras en tu perfil en el apartado de dinepoints.</Text>
        </InfoBox>
        <InfoBox>
        <FontAwesomeIcon icon={faCalendar} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH3>Tu amigo reserva</StyledH3>
          <Text>Tiene que hacer su primera reserva con tu código que le has compartido.</Text>
        </InfoBox>
        <InfoBox>
          <FontAwesomeIcon icon={faCalendarCheck} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH3>¿Cuándo recibo los DineBooker?</StyledH3>
          <Text>3 días después de que la comida tenga lugar en el restaurante, recibirás tus DinePoints</Text>
        </InfoBox>
      </InfoContainer>
    </Container>
  );
};

export default ReferralFriendInfo;