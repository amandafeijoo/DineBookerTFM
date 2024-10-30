import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { CalendarToday, CreditCard, RestaurantMenu } from "@mui/icons-material";
import styled from "styled-components";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 50px;
  padding: 20px;
  border: 3px solid #ccffcc;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #333;
  background-color: #a2d2ff;
`;

const Circle = styled.div`
  background-color: #ffe066;
  border-radius: 50%;
  color: #000;
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 12px;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 20px;
  font-size: 1em;
`;

const CircleContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 60px;
`;

const InfoBox = styled.div`
  background-color: white;
  border: 3px solid #a2d2ff;
  padding: 20px;
  flex: 1;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #333;
  text-align: center;
`;

const InfoBoxIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const RecommendFriendDialog = ({ open, onClose }) => {
  const [promoCode, setPromoCode] = useState("");
  const [inputPromoCode, setInputPromoCode] = useState("");

  useEffect(() => {
    if (open) {
      const token = localStorage.getItem("access_token");
      console.log("Token:", token);

      if (token) {
        fetch("http://localhost:8000/accounts/generate_promo_code/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Origin: "http://localhost:5173",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Código promocional:", data.promo_code);
            console.log("Mensaje:", data.message);
            setPromoCode(data.promo_code);
          })
          .catch((error) => {
            console.error(
              "Hubo un error al generar el código promocional:",
              error
            );
          });
      }
    }
  }, [open]);

  const handlePromoCodeSubmit = () => {
    const token = localStorage.getItem("access_token");
    console.log("Token:", token);

    fetch("http://localhost:8000/accounts/validate_promo_code/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ promo_code: inputPromoCode }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Mensaje:", data.message);
        if (
          data.message ===
          "Código promocional válido. Se han otorgado 1000 puntos."
        ) {
          alert("¡Felicidades! Has recibido 1000 puntos.");
        } else {
          alert("Código promocional no válido.");
        }
      })
      .catch((error) => {
        console.error("Hubo un error al validar el código promocional:", error);
      });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promoCode);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        <Typography
          variant="h2"
          align="center"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "20px",
            marginTop: "20px",
            marginLeft: "10px",
          }}
        >
          Mi espacio de recomendaciones
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Container>
          <Typography
            variant="h6"
            style={{ fontFamily: "'Belleza', sans-serif" }}
          >
            ¡Gana DinePoints recomendando DineBooker!
          </Typography>
          <Typography
            variant="h6"
            style={{ fontFamily: "'Belleza', sans-serif" }}
          >
            Invita a tus amigos a DineBooker
          </Typography>
          <Typography
            variant="h7"
            style={{ fontFamily: "'Belleza', sans-serif" }}
          >
            Obtendrán 1000 DinePoints en su primera reserva y tú recibirás 500
            DinePoints por invitarlos.
          </Typography>
          <CircleContainer>
            <Circle>
              <p>500 para ti</p>
            </Circle>
            <Circle>
              <p>1000 para tu amigo </p>
            </Circle>
          </CircleContainer>
        </Container>
        <Typography
          variant="h5"
          align="center"
          style={{
            fontFamily: "'Belleza', sans-serif",
            marginBottom: "50px",
            marginTop: "20px",
          }}
        >
          Comparte tu código hoy mismo
        </Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TextField
            value={promoCode || ""}
            disabled
            sx={{
              color: "#CCFFCC",
              marginLeft: "20px",
              marginRight: "20px",
              marginTop: "-10px",
            }}
          />
          <Button onClick={handleCopy}>Copiar enlace</Button>
        </div>
        <InfoContainer>
          <InfoBox>
            <InfoBoxIcon>
              <RestaurantMenu />
            </InfoBoxIcon>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "'Belleza', sans-serif" }}
            >
              Comparte tu código de recomendación
            </Typography>
            <Typography
              variant="body2"
              style={{ fontFamily: "'Belleza', sans-serif" }}
            >
              Invita a tu amigo compartiendo tu código {promoCode}
            </Typography>
          </InfoBox>
          <InfoBox>
            <InfoBoxIcon>
              <CalendarToday />
            </InfoBoxIcon>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "'Belleza', sans-serif" }}
            >
              Tu amigo reserva
            </Typography>
            <Typography
              variant="body2"
              style={{ fontFamily: "'Belleza', sans-serif" }}
            >
              Tiene que hacer su primera reserva con tu código.
            </Typography>
          </InfoBox>
          <InfoBox>
            <InfoBoxIcon>
              <CreditCard />
            </InfoBoxIcon>
            <Typography
              variant="subtitle1"
              style={{ fontFamily: "'Belleza', sans-serif" }}
            >
              ¡Disfruta de tus DinePoints!
            </Typography>
            <Typography
              variant="body2"
              style={{ fontFamily: "'Belleza', sans-serif" }}
            >
              3 días después de que la comida tenga lugar en el restaurante,
              recibirás tus DinePoints(1)
            </Typography>
          </InfoBox>
        </InfoContainer>
      </DialogContent>
    </Dialog>
  );
};

export default RecommendFriendDialog;
