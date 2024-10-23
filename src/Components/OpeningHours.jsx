import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 50px;
  margin-bottom: 150px; /* Aumentado el margen inferior */
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),  /* Rosa */
              0px 4px 20px rgba(152, 224, 152, 0.5),  /* Verde */
              0px 4px 20px rgba(153, 170, 255, 0.5);  /* Azul */
  border: 2px solid #99aaff;
  text-align: justify;
  border-radius: 20px;  
  padding: 20px; /* Añade espacio alrededor del texto */
  width: 77%; /* Ajusta el ancho del contenedor */
  height: 25vh;
`;

const StyledLine = styled.div`
  display: flex;
  justify-content: center;  /* Centra los elementos horizontalmente */
  align-items: center;  /* Centra los elementos verticalmente */
  margin: 0;  /* Elimina el margen para evitar espacios extra entre las líneas */
  text-align: center;  /* Centra el texto dentro de los elementos */
`;

const StyledDay = styled.span`
  flex: 1;  /* Ajusta el valor de flex */
  font-weight: bold;  /* Hace el texto en negrita */
  margin-right: 10px;  /* Añade un margen a la derecha para separar el día de la hora */
  font-size: 1.2em;  /* Ajusta el tamaño del texto */
`;

const StyledTime = styled.span`
  flex: 1;  /* Ajusta el valor de flex */
  font-size: 1.2em;  /* Ajusta el tamaño del texto */
`;

const OpeningHours = ({ openingHours }) => {
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <StyledDiv>
      {openingHours && openingHours.map((openingHour, index) => {
        let dayOfWeek = daysOfWeek[openingHour.day_of_week];

        let openTime = openingHour.open_time ? openingHour.open_time.split(':').slice(0, 2).join(':') : 'Cerrado';
        let closeTime = openingHour.close_time ? openingHour.close_time.split(':').slice(0, 2).join(':') : 'Cerrado';

        const time = `${openTime} - ${closeTime}`;

        return (
          <StyledLine key={index}>
            <StyledDay>{dayOfWeek}</StyledDay>
            <StyledTime>{time}</StyledTime>
          </StyledLine>
        );
      })}
    </StyledDiv>
  );
};

export default OpeningHours;