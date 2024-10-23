import styled from 'styled-components';

const InstructionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledVideo = styled.video`
  width: 60%; // Ajusta este valor a lo que necesites
  height: auto;
    border-radius: 10px;
    margin-top: 40px;
    margin-bottom: 40px;
    box-shadow: 5px 5px 5px #333;
    border: 5px solid #99aaff;
`;

const StyledH2 = styled.h2`
    text-align: center;
    font-size: 2em;
    margin-top: 90px;
    width: 50%; // Esto hará que StyledH2 ocupe el 80% del ancho disponible   
    margin-bottom: 20px;
    font-weight: bold;
    color: #333;
    background-color: rgba(238, 220, 130, 0.5);  // 0.5 es el nivel de transparencia    box-shadow: 5px 5px 5px #333; 
    border-radius: 10px;
    padding: 12px;
    box-shadow: 0px 1px 3px #333;

`;
const StyledP = styled.p`
  text-align: justify;
  font-size: 1.3em;
   text-align: center;
   margin-bottom: 0px;

`;



const GiftCardInstructions = () => (
  <InstructionsContainer>
    <StyledH2>Regalos Simplificados</StyledH2>
    <StyledP>¿Quieres regalar algo especial a alguien especial? ¡Regala una tarjeta de regalo! Es fácil, rápido y seguro.</StyledP>
    <StyledP>Sigue estos pasos para regalar una tarjeta de regalo.</StyledP>
    <VideoContainer>
      <StyledVideo src="images/giftcardinstructions.mp4" autoPlay muted loop />
    </VideoContainer>
  </InstructionsContainer>
);

export default GiftCardInstructions;