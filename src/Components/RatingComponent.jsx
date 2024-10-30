import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 300px;
`;

const RatingText = styled.div`
  margin-left: 20px;
  font-size: 20px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CircleContainer = styled.div`
  width: 160px;
  height: 160px;
  margin-right: 20px;
  margin-left: 30px;
  margin-bottom: 10px;
`;

const ReviewCount = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 20px;
`;

const StarIcon = styled.span`
  margin-right: 5px;
`;

function RatingComponent({ restaurant }) {
  console.log(restaurant);
  const averageRating = restaurant.rating;

  let ratingText;
  if (averageRating >= 4.5) {
    ratingText = "Sobresaliente";
  } else if (averageRating >= 4) {
    ratingText = "Muy Bueno";
  } else if (averageRating >= 3) {
    ratingText = "Bueno";
  } else {
    ratingText = "Regular";
  }

  const reviewCount = restaurant.user_ratings_total;

  return (
    <RatingContainer>
      <CircleContainer>
        <CircularProgressbar
          value={averageRating * 20}
          text={`${averageRating}/5`}
          styles={buildStyles({
            textSize: "16px",
            pathColor: `rgba(62, 152, 199, ${averageRating / 5})`,
            textColor: "#99aaff",
            trailColor: "#d6d6d6",
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
