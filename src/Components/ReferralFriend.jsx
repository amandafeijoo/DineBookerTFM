import styled from 'styled-components';
import ReferralFriendInfo from "./ReferralFriendinfo";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const MainContainer = styled(Container)`
  display: flex;
  flex-direction: column;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 160px;
    margin-left: 70px;
`;
const Video = styled.video`
  width: 60%; // Ajusta este valor según tus necesidades
  height: auto;
    border-radius: 10px;
    box-shadow: 5px 5px 5px #333;
    margin-right: 20px;
    border: 5px solid #d0ff94;

`;

const ColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  border: 5px solid #99aaff;
  box-shadow: 5px 5px 5px #99aaff;
    padding: 20px;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 70px;
    margin-bottom: 20px;
`;

const Circle = styled.div`
  background-color: #EEDC82; // color verde olivo
  border-radius: 50%;
  color: #000;
  width: 150px;
  height: 150px; // Cambiado a un valor fijo
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  box-shadow: 5px 5px 5px #333;
  border: 2px solid #FFD700;
  font-size: 1em;    
`;
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
    text-align: justify;
    margin-right: 150px;
    margin-left: 120px;
    margin-top: 80px;
    border-radius: 10px;
    border: 4px solid #99aaff;
    box-shadow: 5px 5px 5px #333;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #FFF8DC;
`;

const CircleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
    margin-right: 250px;
    margin-top: 100px;
`;

const Title = styled.h2`
    font-size: 1.7em; 
    margin-bottom: 20px; // Ajusta este valor según tus necesidades
    text-align: center; // Ajusta este valor según tus necesidades
    color: #333;
`;
const StyledP = styled.p`
    color: #333;
    font-size: 1em; // Añade una unidad de medida
    margin-top: 0px;
    text-align: justify; // Cambiado a justify para justificar el texto
    margin-left: 20px;
    margin-right: 20px;`;

const RowContainer = styled(Container)`
  flex-direction: row;
`;

const DividerLeft = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 120px;
  margin-bottom: 0px;
  margin-left: 0; // Alinea el Divider a la izquierda
  margin-right: auto; // Asegura que el espacio restante esté a la derecha
`;

const DividerRight = styled.hr`
  border: 2px solid #F5DEB3;
  height: 2px;
  width: 50%;
  margin-top: 120px;
  margin-bottom: 100px;
  margin-left: auto; // Asegura que el espacio restante esté a la izquierda
  margin-right: 0; // Alinea el Divider a la derecha
`;

const ReferralFriend = () => {
    return (
      <MainContainer>
        <FlexContainer>
          <Video autoPlay loop muted>
            <source src="/images/referralfriend.mp4" type="video/mp4" />
            Tu navegador no soporta el elemento de video.
          </Video>
        </FlexContainer> 
        <DividerLeft />
        <RowContainer>
  <TextContainer>
    <Title>Invita a tus amigos a DineBooker</Title>
    <StyledP>Obtendrán 1000 DinePoints por su primera reserva y tú recibirás 500 DinePoints por recomendarles DineBooker.</StyledP>
    <StyledP>Los DinePoints son los puntos de fidelidad que obtienes cuando reservas con DineBooker. Puedes canjearlos por descuentos de fidelidad de 10 € o 25 € en los restaurantes socios del programa.</StyledP>   
  </TextContainer>
  <CircleContainer>
    <div>
      <Circle>
        <p>500<br />para ti</p>
      </Circle>
      <p>paga 10 € menos</p>
    </div>
    <div>
      <Circle>
        <p>1000<br />para tu amigo</p>
      </Circle>
    </div>
  </CircleContainer>
</RowContainer>
<DividerRight />
          <Container>
          <ReferralFriendInfo />
          </Container>
      </MainContainer>
    );
  }

export default ReferralFriend;