import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px; // Ajusta el margen superior según tus necesidades
  margin-bottom: 20px; // Ajusta el margen inferior según tus necesidades
  margin-left: 400px; // Ajusta el margen izquierdo según tus necesidades
`;

const RatingText = styled.div`
  margin-left: 20px;
    font-size: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column; // Cambia la dirección de los elementos a columna
`;

const CircleContainer = styled.div`
  width: 160px; // Ajusta este valor para cambiar el tamaño del círculo
  height: 160px; // Asegúrate de que este valor sea el mismo que el de width para mantener el círculo perfectamente redondo
    margin-right: 20px; // Añade un margen a la derecha del círculo
    margin-left: 30px; // Añade un margen a la izquierda del círculo
    margin-bottom: 10px; // Añade un margen inferior al círculo
`;

const ReviewCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px; // Aumenta el margen izquierdo para mover el texto a la derecha
  font-size: 20px; // Ajusta el tamaño de la fuente según tus necesidades
`;

const StarIcon = styled.span`
  margin-right: 5px; // Añade un margen a la derecha del icono de la estrella
`;

function RatingComponent({ restaurant }) {
    console.log(restaurant);
  const averageRating = restaurant.rating;
  
  let ratingText;
  if (averageRating >= 4.5) {
    ratingText = 'Sobresaliente';
  } else if (averageRating >= 4) {
    ratingText = 'Muy Bueno';
  } else if (averageRating >= 3) {
    ratingText = 'Bueno';
  } else {
    ratingText = 'Regular';
  }

  // Usa la propiedad `user_ratings_total` para obtener la cantidad de opiniones
const reviewCount = restaurant.user_ratings_total;

return (
    <RatingContainer>
      <CircleContainer>
        <CircularProgressbar
          value={averageRating * 20}
          text={`${averageRating}/5`}
          styles={buildStyles({
            textSize: '16px',
            pathColor: `rgba(62, 152, 199, ${averageRating / 5})`,
            textColor: '#99aaff',
            trailColor: '#d6d6d6',
          })}
        />
      </CircleContainer>
      <TextContainer>
        <RatingText>{ratingText}</RatingText>
        <ReviewCount>
          <StarIcon>⭐</StarIcon>
          {reviewCount} Opiniones
        </ReviewCount>
      </TextContainer>
    </RatingContainer>
  );
}

export default RatingComponent;