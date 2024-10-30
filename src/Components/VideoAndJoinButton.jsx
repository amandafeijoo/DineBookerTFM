import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const VideoContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const Video = styled("video")`
  width: 60%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  border: 4px solid #99aaff;
`;

const JoinButton = styled(Button)`
  display: block;
  width: 40%;
  margin: 20px auto;
  font-family: "Belleza", sans-serif;
  margin-bottom: 50px;
  background-color: #87cefa;
  color: #000000;
  border: 3px solid #646cff;
  border-radius: 10px;
  padding: 20px 30px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  font-size: 1.7em;
  &:hover {
    cursor: "pointer";
    color: #ffff;
    background-color: #99aaff;
  }
`;

const Title = styled(Typography)`
  text-align: center;
  font-size: 3em;
  margin-top: 50px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 30px;
  font-family: "Belleza", sans-serif;
`;

const Subtitle = styled(Typography)`
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 30px;
  font-family: "Belleza", sans-serif;
`;

const VideoAndJoinButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <VideoContainer>
        <Video controls>
          <source src="/images/marketing.mp4" type="video/mp4" /> // Asegúrate
          de que la ruta al video es correcta
        </Video>
      </VideoContainer>

      <Title variant="h2">
        ¿Estás listo para atraer más clientes a tu restaurante?
      </Title>

      <Subtitle variant="h6">
        Colabora hoy con DineBooker: ¡es fácil y puedes cancelarlo en cualquier
        momento!
      </Subtitle>

      <JoinButton
        variant="contained"
        onClick={() => navigate("/registrationstepper")}
      >
        Únete
      </JoinButton>
    </>
  );
};

export default VideoAndJoinButton;
