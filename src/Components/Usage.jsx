import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendarCheck, faPercent, faTrophy } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

// Define el componente de estilo para el contenedor
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 130px;
  margin-top: 50px;
`;

const StyledH3 = styled.h3`
margin-top: 90px;
margin-bottom: 60px;
text-align: left;
margin-left: 170px;
font-size: 30px;
color: #000000;
`;

const StyledH4 = styled.h4`
  font-weight: bold; /* Hace que el texto sea en negrita */
  font-size: 20px;
  `;

const StyledH5 = styled.h5`
  font-weight: normal; /* Hace que el texto no sea en negrita */
  font-size: 15px;
`;



// Define el componente de estilo para cada sección
const Section = styled.div`
    width: 250px;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    text-align: center;
border: 3px solid #99aaff;
box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4), 0px 6px 20px 0px rgba(0, 0, 0, 0.4);`;


const Usage = () => {
  return (
    <> 
    <StyledH3>¿Cómo funciona?</StyledH3>
    <Container>
      <Section>
      <FontAwesomeIcon icon={faStar} size="2x" color="#99aaff" />
        <StyledH4>Opiniones de los Usuarios</StyledH4>
        <StyledH5>Recomendaciones y opiniones de una magnifíca comunidad.</StyledH5>
        </Section>
        <Section>
        <FontAwesomeIcon icon={faCalendarCheck} size="2x" color="#99aaff" />
        <StyledH4>Sistema de Reservas Sencillo</StyledH4>
        <StyledH5>Reservar inmediata,gratuita y estés donde estés. Las 24 horas, los 7 dias de la semana.</StyledH5>
        </Section>
        <Section>
        <FontAwesomeIcon icon={faPercent} size="2x" color="#99aaff" />
        <StyledH4>Ventajas Exclusivas</StyledH4>
        <StyledH5>Ofertas en multitud de restaurantes y muchas otras ventajas con nuestro programa DinePoints.</StyledH5>
        </Section>
        <Section>
        <FontAwesomeIcon icon={faTrophy} size="2x" color="#99aaff" />
        <StyledH4>La Mejor Opción</StyledH4>
        <StyledH5>Una selección inigualable de restaurantes para todo lo que quieras</StyledH5>
      </Section>
    </Container>
    </>
  );
};

export default Usage;