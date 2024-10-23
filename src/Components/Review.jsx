import React from 'react';
import styled from 'styled-components';
import { FaUserCircle, FaThumbsUp, FaFlag, FaStar } from 'react-icons/fa'; 



const ReviewContainer = styled.div`
  margin-top: 40px;
  margin-left: 90px;
  margin-right: 50px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: justify;
  border-radius: 20px;  
  padding: 20px; /* Añade espacio alrededor del texto */
  opacity: ${props => props.isLastVisible ? 0.5 : 1}; // Aplica transparencia si es el último visible
  transition: opacity 0.5s; // Añade una transición suave
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 50px;
  margin-right: 50px;
`;
const IconsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const UserName = styled.p`
  margin-left: 10px;

`;

const UserIcon = styled(FaUserCircle)`
  color: #646cff;
  margin-right: 10px;
`;
const StyledFaThumbsUp = styled(FaThumbsUp)`
  color: #646cff;
`;

const StyledFaFlag = styled(FaFlag)`
  color: #646cff;
`;

const UserImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 10px;
`;

const ReviewText = styled.p`
  text-align: justify;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 50px;
`;


const Rating = styled.p`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 50px;
  margin-top: 20px;
  color: #646cff;
  font-size: 1em;
`;
const ClickableIcon = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-right: 5px; // Reduce este valor para acercar los elementos
  text-align: left;
  gap: 20px; // Ajusta este valor para cambiar la separación entre los elementos
  color: #646cff;
  &:hover {
    text-decoration: underline;
  }
`;

const Review = ({ review,isLastVisible }) => {
  const date = new Date(review.time * 1000);
  const formattedDate = date.toLocaleDateString();

  return (
    <ReviewContainer isLastVisible={isLastVisible}>
      <div>
      <UserContainer>
        {review.user_photo_url ? 
          <UserImage src={review.user_photo_url} alt={review.author_name} /> : 
          <UserIcon size={32} />
        }
        <UserName>{review.author_name}</UserName>
        <p>{formattedDate}</p>
      </UserContainer>
        <ReviewText>{review.text}</ReviewText>     
      <IconsContainer>
      <ClickableIcon onClick={() => console.log('Me gusta')}>
          <StyledFaThumbsUp /> ME GUSTA
        </ClickableIcon>
        <ClickableIcon onClick={() => console.log('Denunciar')}>
          <StyledFaFlag /> DENUNCIA
        </ClickableIcon>
      </IconsContainer>
      </div>
      <Rating>
        <FaStar />
        {review.rating}/5
      </Rating>
    </ReviewContainer>
  );
};
export default Review;