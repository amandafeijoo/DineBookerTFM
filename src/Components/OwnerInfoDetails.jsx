import React from "react";
import { Card, CardContent, Typography as MuiTypography } from "@mui/material";
import { styled } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faHamburger,
  faGhost,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

const InfoCard = styled(Card)`
  margin: 10px;
  flex: 1;
  margin-top: 30px;
  margin-bottom: 80px;
  border-radius: 10px;
  margin-left: 40px;
  margin-right: 40px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  display: flex;
  border: 5px solid #99aaff;
`;

const InfoBoxContainer = styled("div")`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const TypographyH4 = styled(MuiTypography)`
  margin-top: 90px;
  margin-bottom: 40px;
  font-family: "Belleza", sans-serif;
`;

const TypographyH6 = styled(MuiTypography)`
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: "Belleza", sans-serif;
`;

const TypographyBody2 = styled(MuiTypography)`
  font-family: "Belleza", sans-serif;
`;

const OwnerInfoDetails = () => {
  const infoBoxes = [
    {
      icon: <FontAwesomeIcon icon={faDesktop} size="3x" color="#F5DEB3" />,
      title: "Obtén una mayor visibilidad en línea",
      content:
        "DineBooker Manager es la primera plataforma de descubrimiento y reserva de restaurantes. Ahora puedes obtener una página personalizada de manera gratuita visible en todos los dispositivos.",
    },
    {
      icon: <FontAwesomeIcon icon={faHamburger} size="3x" color="#F5DEB3" />,
      title: "Aumenta tu tasa de ocupación de mesas",
      content:
        "Un modelo de negocio en el que todos ganan con un riesgo cero para tu restaurante. Ofrece ofertas especiales o participa en el programa de fidelidad de DinePoints y en los festivales para aumentar tus reservas durante las horas de menor actividad.",
    },
    {
      icon: <FontAwesomeIcon icon={faGhost} size="3x" color="#F5DEB3" />,
      title: "Lucha contra el «no-show»",
      content:
        "Reduce tus «no-shows» usando las herramientas de DineBooker  como correos electrónicos y SMS de confirmación automática, puntuación de fiabilidad del cliente y copia de la tarjeta de crédito.",
    },
    {
      icon: <FontAwesomeIcon icon={faUserTie} size="3x" color="#F5DEB3" />,
      title: "Confía en los expertos de la industria",
      content:
        "Los equipos de DineBooker trabajan junto a 60 000 restaurantes desde hace más de 14 años para hacer crecer su negocio, ofreciendo formación gratuita, consejos de expertos y asistencia al cliente los 7 días de la semana.",
    },
  ];

  return (
    <div>
      <TypographyH4 variant="h4">
        ¿Qué puedes esperar con TheDineBooker?
      </TypographyH4>
      <InfoBoxContainer>
        {infoBoxes.map((box, index) => (
          <InfoCard key={index}>
            <CardContent>
              {box.icon}
              <TypographyH6 variant="h5">{box.title}</TypographyH6>
              <TypographyBody2 variant="body1">{box.content}</TypographyBody2>
            </CardContent>
          </InfoCard>
        ))}
      </InfoBoxContainer>
    </div>
  );
};

export default OwnerInfoDetails;
