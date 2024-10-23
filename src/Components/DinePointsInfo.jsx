import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faCreditCard, faCalendarCheck, faUser } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  padding: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
    margin-bottom: 60px;
    margin-left: 150px;
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

const DividerLeft = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 120px;
  margin-bottom: 0px;
  margin-left: 0; // Alinea el Divider a la izquierda
  margin-right: auto; // Asegura que el espacio restante esté a la derecha
`;

const Title = styled.h2`
    font-size: 30px;
    margin-bottom: 20px;
    margin-left: 160px;
    margin-right: 200px;
    text-align: left;
    margin-top: 70px;
`;

const Text = styled.p`
    font-size: 14px;
`;

const StyledH3 = styled.h3`
    font-size: 17px;
`;

const DinePointsInfo = () => {
  return (
    <Container>
    <DividerLeft />
      <Title>Más información sobre los DinePoints</Title>
      <InfoContainer>
        <InfoBox>
          <FontAwesomeIcon icon={faCalendar}style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH3>¿Durante cuánto tiempo tienen validez los DinePoints?</StyledH3>
          <Text>Los DinePoints tienen una validez de un año, se pueden canjear hasta el último día del mes en que caducan. Por ejemplo, los DinePoints que ganes el 3 de noviembre de 2020 caducarán el 30 de noviembre de 2021.</Text>
        </InfoBox>
        <InfoBox>
        <FontAwesomeIcon icon={faCreditCard} style={{ color: '#EEDC82', fontSize: '26px' }} />          <StyledH3>¿Cuántos DinePoints puedes gastar?</StyledH3>
          <Text>Como máximo, puedes gastar 2000 DinePoints por reserva, con un descuento del 25 € en la factura final. Si el descuento es más alto que el precio de la factura, el restaurante no pagará la diferencia.</Text>
        </InfoBox>
        <InfoBox>
          <FontAwesomeIcon icon={faCalendarCheck} style={{ color: '#EEDC82', fontSize: '26px' }} />
          <StyledH3>¿Cuándo recibo los DinePoints?</StyledH3>
          <Text>Tres días después de la comida, si vas al restaurante. Hasta 7 días después de la comida si pagas con DINEBOOKER PAY.</Text>
        </InfoBox>
        <InfoBox>
          <FontAwesomeIcon icon={faUser} style={{ color: '#EEDC82', fontSize: '26px' }}/>
          <StyledH3>¿Cómo puedo saber cuántos DinePoints tengo?</StyledH3>
          <Text>Puedes visitar la sección “Mi programa DinePoints”.</Text>
        </InfoBox>
      </InfoContainer>
    </Container>
  );
};

export default DinePointsInfo;