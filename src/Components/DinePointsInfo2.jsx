import React, { useState } from "react";
import styled from "styled-components";
import DownloadApp from "./DownloadApp";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import RegisterForm from "./RegisterForm";
import Dialog2 from "@mui/material/Dialog"; 

const StyledP2 = styled.p`
  color: #333;
  font-size: 1em;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Circle = styled.div`
  background-color: #eedc82;
  border-radius: 50%;
  color: #000;
  width: 120px;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  margin-left: 30px;
  margin-right: 30px;
  margin-top: 20px;
  box-shadow: 5px 5px 5px #333;
  border: 4px solid #ffd700;
  font-size: 1em;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: justify;
  margin-left: 50px;
`;

const CircleContainer2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 120px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 3px solid #99aaff;
  background-color: #535bf2;
  color: #fff;
  &:hover {
    cursor: pointer;
    color: #d0ff94;
    background-color: #000000;
  }
`;

const DinePointsInfo2 = () => {
  const [registerOpen, setRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenRegister = () => {
    setRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  return (
    <CircleContainer2>
      <InfoBlock>
        <Circle>
          <p>100 DinePoints</p>
        </Circle>
        <TextContainer>
          <StyledP2>
            Al hacer una reserva a través de la aplicación o del sitio web.
          </StyledP2>
          <Button onClick={() => navigate("/downloadapp")}>
            DESCARGAR APLICACIÓN
          </Button>
        </TextContainer>
      </InfoBlock>
      <InfoBlock>
        <Circle>
          <p>500 DinePoints</p>
        </Circle>
        <TextContainer>
          <StyledP2>
            Regístrate hoy y recibe 500 dinepoints de bienvenida.
          </StyledP2>
          <Button onClick={handleOpenRegister}>REGISTRATE</Button>
          <Dialog2 open={registerOpen} onClose={handleCloseRegister}>
            <RegisterForm open={registerOpen} onClose={handleCloseRegister} />
          </Dialog2>
        </TextContainer>
      </InfoBlock>
      <InfoBlock>
        <Circle>
          <p>500 DinePoints</p>
        </Circle>
        <TextContainer>
          <StyledP2>
            Por cada amigo que invites a reservar por primera vez.
          </StyledP2>
          <Button onClick={() => navigate("/referralfriend")}>
            MÁS INFORMACIÓN
          </Button>
        </TextContainer>
      </InfoBlock>
    </CircleContainer2>
  );
};

export default DinePointsInfo2;
