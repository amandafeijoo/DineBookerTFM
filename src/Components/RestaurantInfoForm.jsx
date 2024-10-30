import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Box } from "@mui/material";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/system";
import { useState } from "react";

const Title = styled.h1`
  font-family: "Belleza", sans-serif;
  text-align: center;
  margin-left: 170px;
  margin-top: 270px;
  margin-bottom: 40px;
  text-decoration: underline;
  text-decoration-color: transparent;
  background-image: linear-gradient(to right, #ff69b4, #98e098, #99aaff);
  background-size: 100% 2px;
  background-repeat: no-repeat;
  background-position: 0 100%;
`;

const Subtitle = styled.h2`
  font-family: "Belleza", sans-serif;
  text-align: justify;
  margin-left: 170px;
  margin-right: 50px;
  margin-top: 50px;
  font-size: 1.2em;
  margin-bottom: 50px;
`;

const FormContainer = styled.div`
  flex: 1;
  margin-right: 60px;
  margin-left: 100px;
`;

const Form = styled.form`
  padding: 30px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 90%;
  margin-left: 100px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  border: 3px solid #99aaff;
`;

const TextFieldLarge = styled(TextField)`
  flex: 1;
  margin-right: 10px;
`;

const MainContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  overflow: auto;
  margin-bottom: 20px;
  z-index: 1000;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 60px;
  margin-left: 180px;
`;

const StyledButton = muiStyled(Button)({
  border: "none",
  backgroundColor: "#646cff",
  color: "#ffffff",
  padding: "10px 20px",
  "&:hover": {
    cursor: "pointer",
    color: "#d0ff94",
    backgroundColor: "#000000",
  },
});
const ImageContainer = styled.div`
  width: 90%;
  margin-left: 50px;
  margin-bottom: 0px;
`;

const Image = styled.img`
  height: auto;
  width: 80%;
  border-radius: 10px;
  margin-left: 120px;
  margin-top: 100px;
  border: 3px solid #99aaff;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
`;

const RestaurantInfoForm = ({ handleNext, handleBack, handleData }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [averageTicket, setAverageTicket] = useState("");

  const handleNextClick = () => {
    handleData({ restaurantName, restaurantAddress, averageTicket });
    console.log({ restaurantName, restaurantAddress, averageTicket });
    handleNext();
  };

  return (
    <MainContainer>
      <FormContainer>
        <Title>¡Ya casi está!</Title>
        <Subtitle>
          Dinos más sobre tu restaurante. Esta información ayudará a nuestros
          expertos a entender tus necesidades.
        </Subtitle>
        <Form>
          <TextFieldLarge
            label="Nombre del restaurante"
            variant="outlined"
            required
            fullWidth
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
          />
          <TextFieldLarge
            label="Dirección del restaurante"
            variant="outlined"
            required
            fullWidth
            value={restaurantAddress}
            onChange={(e) => setRestaurantAddress(e.target.value)}
          />
          <TextFieldLarge
            label="Ticket Medio por Cliente"
            variant="outlined"
            required
            fullWidth
            value={averageTicket}
            onChange={(e) => setAverageTicket(e.target.value)}
          />
          <ButtonContainer>
            <StyledButton onClick={handleBack}>Volver</StyledButton>
            <StyledButton onClick={handleNextClick}>Siguiente</StyledButton>
          </ButtonContainer>
        </Form>
      </FormContainer>
      <Box style={{ overflow: "hidden", flex: 1, margin: 0, padding: 0 }}>
        <ImageContainer>
          <Image src="/images/ownerpubli1.png" alt="Owner" />
        </ImageContainer>
      </Box>
    </MainContainer>
  );
};

export default RestaurantInfoForm;
