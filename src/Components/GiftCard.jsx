import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const GiftCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 300px;
  margin-right: 200px;
  margin-top: 120px;
  margin-bottom: 120px;
  
`;

const VideoContainer = styled.video`
  width: 45%;
  height: auto;
  border-radius: 10px;
  border: 3px solid #99aaff;
    box-shadow: 5px 5px 5px #333;
  

`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px; // Ajusta esto según tus necesidades
  border: 3px solid #99aaff;
    background-color: #d0ff94;
    color: #000000;
  &:hover {
    cursor: pointer;
    color: #d0ff94;
    background-color: #000000;
    border: 1px solid #99aaff;
  }
`;

const TextContainer = styled.div`
  width: 40%;
  padding: 20px;

  /* text-shadow: 2px 2px 3px #000000; // Añade sombra al texto */
`;

const GiftCard = () => {
  const navigate = useNavigate();

    return (
        <GiftCardContainer>
            <VideoContainer autoPlay muted loop>
                <source src="/images/giftcard.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
            </VideoContainer>
            <TextContainer>
                <h2>Descubre las nuevas</h2> 
                <h2>Tarjetas regalo de DINEBOOKER</h2>
                <p>6.000 restaurantes en un solo regalo.</p>
                <Button onClick={() => navigate('/giftcardinfo')}>COMPRAR AHORA</Button>           
                 </TextContainer>
        </GiftCardContainer>
    );
};

export default GiftCard;