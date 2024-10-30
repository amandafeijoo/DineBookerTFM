import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-top: 40px;
  margin-left: 40px;
  margin-right: 50px;
  margin-bottom: 500px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  border: 2px solid #99aaff;
  text-align: justify;
  border-radius: 20px;
  padding: 20px;
  width: 77%;
  height: 30vh;
`;

const StyledLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  text-align: center;
`;

const StyledDay = styled.span`
  flex: 1;
  font-weight: bold;
  margin-right: 10px;
  font-size: 1.2em;
  border-right: 2px solid #99aaff;
`;

const StyledTime = styled.span`
  flex: 1;
  font-size: 1.2em;
`;

const OpeningHours = ({ openingHours }) => {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <StyledDiv>
      {openingHours &&
        openingHours.map((openingHour, index) => {
          let dayOfWeek = daysOfWeek[openingHour.day_of_week];

          let openTime = openingHour.open_time
            ? openingHour.open_time.split(":").slice(0, 2).join(":")
            : "Cerrado";
          let closeTime = openingHour.close_time
            ? openingHour.close_time.split(":").slice(0, 2).join(":")
            : "Cerrado";

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
