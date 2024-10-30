import { Box, Button, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { styled as muiStyled } from "@mui/system";
import { useEffect } from "react";
import Swal from "sweetalert2";

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

const FormContainer = styled.div`
  flex: 1;
  margin-right: 50px;
  margin-left: 120px;
  margin-top: 180px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-left: 100px;
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
  width: 70%; 
  border-radius: 10px;
  margin-left: 170px;
  margin-top: 100px;
  border: 3px solid #000;
  box-shadow: 5px 5px 5px #333;
`;

const Confirmation = ({ formData }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const ownerData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone, 
      password: formData.password,
      phoneNumber: formData.phone,
      average_ticket: formData.averageTicket,
      countryCode: formData.countryCode, 
      restaurant_address: formData.restaurantAddress,
      restaurant_name: formData.restaurantName,
    };

    fetch("http://localhost:8000/owners/", {
      method: "POST",
      body: JSON.stringify(ownerData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        Swal.fire(
          "¡Registrado con éxito!",
          "Ahora puedes iniciar sesión en Dinebooker Manager.",
          "success"
        );
        navigate("/loginowner"); 
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "Hubo un problema con el registro. Por favor, inténtalo de nuevo.",
          "error"
        );
      });
  }, [formData, navigate]);

  return (
    <MainContainer>
      <FormContainer>
        <Typography
          variant="h2"
          gutterBottom
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginTop: "50px",
            marginLeft: "100px",
          }}
        >
          ¡Gracias por unirte a Dinebooker!
        </Typography>
        <Typography
          variant="h4"
          style={{
            color: green[500],
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "30px",
            marginLeft: "100px",
          }}
          gutterBottom
        >
          Tu solicitud ha sido recibida exitosamente.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontFamily: "'Belleza', sans-serif",
            textAlign: "left",
            marginLeft: "100px",
          }}
        >
          En breve, recibirás una llamada o un correo electrónico de uno de
          nuestros representantes para confirmar los detalles y guiarte en el
          proceso de integración a la plataforma. Una vez confirmado,
          comenzaremos a crear el perfil de tu restaurante en Dinebooker, para
          que los comensales puedan empezar a reservar lo antes posible.
        </Typography>
        <Typography
          variant="h4"
          gutterBottom
          style={{
            marginTop: "50px",
            fontFamily: "'Belleza', sans-serif",
            marginLeft: "100px",
          }}
        >
          ¿Tienes alguna pregunta?
        </Typography>
        <Typography
          variant="h6"
          gutterBottom
          style={{
            fontFamily: "'Belleza', sans-serif",
            textAlign: "left",
            marginLeft: "100px",
          }}
        >
          Si tienes alguna duda o necesitas más información antes de que nos
          pongamos en contacto, no dudes en escribirnos. Estaremos encantados de
          ayudarte.
        </Typography>
        <ButtonContainer>
          <StyledButton onClick={() => navigate("/contact")}>
            Contacto
          </StyledButton>
        </ButtonContainer>
      </FormContainer>
      <Box style={{ overflow: "hidden", flex: 1, margin: 0, padding: 0 }}>
        <Image src="/images/ownerpubli1.png" alt="Owner" />
      </Box>
    </MainContainer>
  );
};

export default Confirmation;
