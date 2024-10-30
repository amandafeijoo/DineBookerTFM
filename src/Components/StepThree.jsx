import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { AppContext } from "../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { TextField as MuiTextField } from "@mui/material";
import styled from "styled-components";
import { Typography } from "@mui/material";

import backgroundImage from "/images/portada4.jpg";

const StyledH1 = styled.h1`
  color: grey;
  text-align: center;
  font-weight: bold;
  font-size: 2em;
  margin-top: 40px;
  margin-bottom: 35px;
  text-align: center;
  border-bottom: 2px solid #a2d2ff;
  padding-bottom: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const StyledBackgroundImage = styled.div`
  margin-bottom: 40px;
  width: 150%;
  padding: 30px;
  border-radius: 30px;
  border: 3px solid #99aaff;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  background-color: #fff8dc;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  &:active {
    box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);
  }
`;

const StyledTextField = styled(MuiTextField)`
  && {
    width: 100%;
    border-color: #7575f5;
    border-width: 1px;
    border-style: solid;

    label {
      color: #333;
    }
    .MuiFormHelperText-root {
      color: #333;
    }
  }

  .MuiInputBase-input {
    color: #333;
  }

  .MuiInput-underline:before {
    border-bottom-color: #7575f5;
  }
  .MuiInput-underline:hover:before {
    border-bottom-color: #d0ff94;
  }
  .MuiInput-underline:after {
    border-bottom-color: #d0ff94;
  }

  .MuiInputBase-input::placeholder {
    color: gray;
  }

  .MuiInputBase-input:disabled {
    color: gray;
  }
`;

const StepThree = ({
  email,
  setEmail,
  deliveryTime,
  setDeliveryTime,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}) => {
  const { order, setOrder } = useContext(AppContext);
  const navigate = useNavigate();
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  const [emailError, setEmailError] = useState("");

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (emailRegex.test(email)) {
      setEmail(email);
      setEmailError("");
    } else {
      setEmailError("Correo electrónico no válido");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  };

  const formatTime = (date) => {
    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, "0")}:${d
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    if (email && deliveryTime && selectedDate && selectedTime) {
      navigate("/PaymentComponent");
    }
  }, [email, deliveryTime, selectedDate, selectedTime, navigate, order]);

  useEffect(() => {
    setOrder({
      ...order,
      email,
      deliveryTime,
      selectedDate: formatDate(selectedDate),
      selectedTime: formatTime(selectedTime),
    });
  }, [email, deliveryTime, selectedDate, selectedTime]);

  return (
    <>
      <StyledH1>Entrega</StyledH1>
      <StyledBackgroundImage>
        <div style={{ display: "block", justifyContent: "center" }}>
          <p style={{ textAlign: "left" }}>Correo electrónico</p>
          <StyledTextField
            required
            label="Envía un correo electrónico a"
            placeholder="Correo electrónico"
            onChange={handleEmailChange}
            inputProps={{ maxLength: 50, style: { fontSize: "1.5em" } }}
            style={{ width: "100%", height: "3em", margin: 0, padding: 0 }}
            error={!!emailError}
            helperText={emailError}
          />
          <p
            style={{
              textAlign: "left",
              marginBottom: "20px",
              marginTop: "60px",
            }}
          >
            Hora de entrega
          </p>
          <RadioGroup
            row
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
          >
            <FormControlLabel
              value="now"
              control={<Radio />}
              label={
                <Typography style={{ fontFamily: "'Belleza', sans-serif" }}>
                  Ahora
                </Typography>
              }
            />
            <FormControlLabel
              value="later"
              control={<Radio />}
              label={
                <Typography style={{ fontFamily: "'Belleza', sans-serif" }}>
                  Más tarde
                </Typography>
              }
            />
          </RadioGroup>
          {deliveryTime === "later" && (
            <div>
              <Box mb={2}>
                <StyledTextField
                  id="date"
                  label="Fecha de entrega"
                  type="date"
                  defaultValue={selectedDate.toISOString().substr(0, 10)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  style={{ width: "100%" }}
                />
              </Box>
              <StyledTextField
                id="time"
                label="Hora de entrega"
                type="time"
                defaultValue={selectedTime.toTimeString().substr(0, 5)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300,
                }}
                onChange={(e) =>
                  setSelectedTime(new Date(`1970-01-01T${e.target.value}:00`))
                }
                style={{ width: "100%" }}
              />
            </div>
          )}
        </div>
      </StyledBackgroundImage>
    </>
  );
};

export default StepThree;
