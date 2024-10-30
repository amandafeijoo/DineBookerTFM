import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Button,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import { Box } from "@mui/material";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";
import moment from "moment";
import Swal from "sweetalert2";

const StyledTypography = styled(Typography)({
  fontFamily: "'Belleza', sans-serif",
  marginBottom: "20px",
  marginTop: "50px",
  color: "#A2D2FF",
  fontWeight: "bold",
  textAlign: "center",
});

const StyledRestaurantName = styled(Typography)`
  font-family: "Belleza", sans-serif;
  font-size: 30px;
  text-align: center;
  margin-bottom: 20px;
`;

const StyledParagraph = styled(Typography)`
  font-family: "Belleza", sans-serif;
  margin-bottom: 60px;
  text-align: center;
`;

function CompletedReservation({
  people,
  time,
  ReservationDate,
  restaurantName,
  step,
  restaurantId,
}) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [seatPreference, setSeatPreference] = useState("inside");
  const [specialRequest, setSpecialRequest] = useState("");
  const [offerCode, setOfferCode] = useState("");
  const [receiveOffers, setReceiveOffers] = useState(false);
  const token = localStorage.getItem("userAccess");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [reservationDate, setReservationDate] = useState(new Date());
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  useEffect(() => {
    console.log(token); 

    fetch("http://localhost:8000/accounts/user/", {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); 
        setUser(data); 
      });
  }, [token]);

  useEffect(() => {
    if (step === 4) {
      handleOpen();
    }
  }, [step]);

  const handleReservation = async () => {
    try {
      if (!user) {
        throw new Error("User is not defined");
      }

      const formattedDate = reservationDate.toISOString().split("T")[0]; 
      const requestBody = {
        party_size: people, 
        time,
        reservation_date: formattedDate, 
        restaurant_id: restaurantId, 
        special_request: specialRequest, 
        offer_code: offerCode, 
        seat_preference: seatPreference, 
        receive_offers: receiveOffers, 
        user: user.id, 
      };

   
      console.log("Request Body:", requestBody);

      const response = await fetch("http://localhost:8000/reservations/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response Status:", response.status);
      console.log("Response Headers:", response.headers);

      const data = await response.json();
      console.log("Response Data:", data);

      if (!response.ok) {
        throw new Error(data.error || "Error al completar la reservación");
      }

      console.log("Reservación completada con éxito", data);
      handleClose(); 
      Swal.fire({
        icon: "success",
        title: "Reservación completada con éxito",
        text: "Tu reservación ha sido realizada con éxito.",
      }).then(() => {
        navigate("/"); 
      });
    } catch (error) {
      console.error("Error al completar la reservación", error);
      handleClose(); 
      Swal.fire({
        icon: "error",
        title: "Error al completar la reservación",
        text: error.message || "Hubo un error al completar tu reservación.",
      }).then(() => {
        navigate("/"); 
      });
    }
  };

  const handleSeatPreferenceChange = (event) => {
    setSeatPreference(event.target.value);
  };

  const handleSpecialRequestChange = (event) => {
    setSpecialRequest(event.target.value);
  };

  const handleOfferCodeChange = (event) => {
    setOfferCode(event.target.value);
  };

  const handleReceiveOffersChange = (event) => {
    setReceiveOffers(event.target.checked);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <StyledTypography variant="h2">Reserva</StyledTypography>
        <DialogContent>
          <StyledRestaurantName variant="h4">
            Restaurante {restaurantName}
          </StyledRestaurantName>
          {step === 4 && (
            <StyledParagraph>
              Reserva para {people} personas a las {time} en{" "}
              {reservationDate.toLocaleDateString("es-ES")}
            </StyledParagraph>
          )}
          {user && (
            <>
              <form>
                <Grid container justifyContent="center">
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      defaultValue={user.first_name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Correo electrónico"
                      defaultValue={user.email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Código del país"
                      defaultValue={user.countryCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      defaultValue={user.phoneNumber}
                    />
                  </Grid>
                </Grid>
              </form>
              <FormControl component="fieldset">
                <Box mt={3}>
                  <FormLabel component="legend">
                    Preferencia de asiento
                  </FormLabel>
                </Box>
                <RadioGroup
                  value={seatPreference}
                  onChange={handleSeatPreferenceChange}
                >
                  <FormControlLabel
                    value="inside"
                    control={<Radio />}
                    label="Dentro"
                  />
                  <FormControlLabel
                    value="bar"
                    control={<Radio />}
                    label="Barra"
                  />
                  <FormControlLabel
                    value="terrace"
                    control={<Radio />}
                    label="Terraza"
                  />
                </RadioGroup>
              </FormControl>
              <form>
                <Grid container direction="column">
                  <Grid item>
                    <TextField
                      fullWidth
                      InputProps={{ style: { fontSize: 20 } }} 
                      label="Petición especial para el restaurante"
                      placeholder="Por ejemplo, Tengo una alergia"
                      value={specialRequest}
                      onChange={handleSpecialRequestChange}
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      fullWidth
                      InputProps={{ style: { fontSize: 20 } }} 
                      label="Código de la oferta"
                      placeholder="Por ejemplo: Bienvenido16"
                      value={offerCode}
                      onChange={handleOfferCodeChange}
                    />
                  </Grid>
                </Grid>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={3}
                  mb={3}
                >
                  <Button variant="contained" color="primary" sx={{ mb: 2 }}>
                    Aplicar
                  </Button>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={receiveOffers}
                        onChange={handleReceiveOffersChange}
                      />
                    }
                    label="Deseo recibir ofertas y comunicados del restaurante (lo que incluye a las empresas afiliadas del grupo) por correo electrónico y mensajes de texto."
                  />
                </Box>
                <Box display="flex" justifyContent="center" mt={2} mb={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReservation}
                  >
                    CONFIRMAR RESERVA
                  </Button>
                </Box>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CompletedReservation;
