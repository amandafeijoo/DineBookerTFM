import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 200px;
  margin-right: 200px;
  margin-top: 120px;
  margin-bottom: 120px;
`;

const VideoContainer = styled.video`
  width: 60%;
  height: auto;
  border-radius: 10px;
  border: 3px solid #99aaff;
  box-shadow: 5px 5px 5px #333;
`;

const TextContainer = styled.div`
  width: 50%;
  padding: 30px;
  border-radius: 10px;
  margin-left: 50px;
`;

const Button = styled.button`
  padding: 15px;
  margin-right: 5px;
  background-color: #535bf2;
  color: #ffffff;
  border: none;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #000000;
    color: #ffffff;
  }
`;

const Owner = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <VideoContainer autoPlay muted loop>
        <source src="/images/propietario.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </VideoContainer>
      <TextContainer>
        <h2>Registra tu restaurante</h2>
        <Button onClick={() => navigate("/ownerinfo")}>MAS INFO</Button>
        <p>
          Cuéntanos más sobre ti y nos pondremos en contacto contigo lo antes
          posible
        </p>
        <h2>Ya soy cliente</h2>
        <p>
          Inicia sesión en DineBooker Manager y ponte en contacto por nosotros
          por chat
        </p>
        <Button onClick={() => navigate("/loginowner")}>
          INICIAR SESIÓN EN DINEBOOKER MANAGER
        </Button>
      </TextContainer>
    </Container>
  );
};

export default Owner;
