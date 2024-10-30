
import styled from 'styled-components';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 100px;
`;

const Container = styled.div`

`;

const ParagraphContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  flex: 1;
  font-size: 1.2em;
  border: none;
  padding: 15px;
  color:#000;
  background-color: #e8ffcc;
  border: 2px solid #7575f5;
  box-shadow: 0px 1px 3px #7575f5;
  width: 600px; 
  &:hover {
    cursor: pointer;
    color: #d0ff94;
    background-color: #535bf2;
  }
  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }
`;

const Button2 = styled.button`
    
    flex: 1;
    border: none;
    padding: 12px;
    color:#333;
    margin-bottom: 20px;
    background-color: #d0ff94;
    border: 2px solid #7575f5;
    box-shadow: 0px 1px 3px #7575f5;
    font-size: 1.2em;
    &:hover {
        cursor: pointer;
        color: #d0ff94;
        background-color: #000;
    }
    &:not(:last-child) {
        border-right: 1px solid #ccc;
    }
`;
const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  gap: 10px;
  margin: 50px auto;
  width: 80%; 
  border-radius: 10px;
  border: 1px solid #333;
  box-shadow: 5px 5px 5px #333;  
`;

const GridImage = styled.img`
  width: 80%;
  height: 80%;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0px 1px 3px #333;
  margin-top: 20px;
  margin-bottom: 20px;
  border: 3px solid #7575f5;
`;

const Image = styled.img`
  width: 90%;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

`;

const StyledH2 = styled.h2`
text-align: center;
font-size: 2em;
margin-top: 2em;
margin-left: 30px;
margin-right: 40px;
font-weight: bold;
`;

const StyledH3 = styled.h3`
    font-size: 20px;
    color: #333;
    text-align: center;
    margin-top: 20px;
    margin-right: 20px;
    margin-left: 20px;
    margin-bottom: 30px;
    `;

const StyledP = styled.p`
    font-size: 18px;
    color: #333;
    margin: 40px auto;
    width: 80%; 
    text-align: justify;
`;

const GiftCardPurchaseOptions = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const navigate = useNavigate();


  const handleMenuClick = (menu) => {
    setSelectedMenu(selectedMenu === menu ? null : menu);
  };

  useEffect(() => {
    handleMenuClick('online');
  }, []);

  return (
    <Container>
      <TitleContainer>
        <StyledH2>Cómprala online y en establecimientos</StyledH2>
      </TitleContainer>
      <ParagraphContainer>
        <StyledH3>Te podemos ayudar, sin importar cómo quieras comprar.</StyledH3>
      </ParagraphContainer>
      <MenuContainer>
        <ButtonContainer>
          <Button onClick={() => handleMenuClick('online')}>ONLINE</Button>
          <Button onClick={() => handleMenuClick('inStore')}>EN ESTABLECIEMIENTOS</Button>
        </ButtonContainer>
        {selectedMenu === 'online' && (
          <div>
            <StyledP>Visita nuestra tienda online y elige entre la tarjeta regalo digital, para enviarla por correo electrónico, o la tarjeta regalo física, para enviarla directamente a casa de la persona que quieras. Haz que la experiencia sea más especial con una imagen y un mensaje personalizados.</StyledP>
            <Button2 onClick={() => navigate('/giftcardpurchase')}>COMPRA AHORA</Button2>          
            </div>
        )}
        {selectedMenu === 'inStore' && (
            <ImageGrid>
                <GridImage src="/images/estanco.jpeg" alt="Logo Estanco" />
                <GridImage src="/images/fnac.png" alt="Logo Fnac" />
                <GridImage src="/images/carrefour.png" alt="Logo Carrefour" />
                <GridImage src="/images/correos.png" alt="Logo Correos" />
                <GridImage src="/images/mediamark.jpeg" alt="Logo Mediamark" />
                <GridImage src="/images/corteingles.png" alt="Logo Corte Ingles" />
            </ImageGrid>
        )}
      </MenuContainer>
    </Container>
  );
};

export default GiftCardPurchaseOptions;
