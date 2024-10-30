import React, { useState, useEffect } from "react";
import { Button, Typography, Dialog } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Legend } from "chart.js";
import { Tooltip as ChartTooltip } from "chart.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import dinepointsImage from "/images/dinepoints01.png";
import QRCodeDialog from "./QRCodeDialog";

Chart.register(ArcElement, Legend, ChartTooltip);

const GradientUnderlineTypography = styled(Typography)`
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 100%;
    height: 5px;
    background-image: linear-gradient(to right, #99aaff, #98e098, #99aaff);
    text-decoration: none;
  }
`;
const DialogContainer = styled.div`
  width: 60vw;
  margin-bottom: 30px;
  padding: 20px;
  margin-top: 20px;
`;

const ChartContainer = styled.div`
  width: 50%;
  height: 30%;
  margin-left: 210px;
  margin-right: 70px;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 5px 5px 5px #333;
  border: 3px solid #535bf2;
`;

const DinePointsDialog = ({ open, onClose }) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();
  const [dinePoints, setDinePoints] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [reservationId, setReservationId] = useState(null);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const data = {
    labels: ["Dinepoints", "Restante"],
    datasets: [
      {
        data: [dinePoints, 100 - dinePoints],
        backgroundColor: ["#99aaff", "#CCFFCC"],
      },
    ],
  };

  useEffect(() => {
    if (open) {
      const token = localStorage.getItem("userAccess");
      console.log(token);

      let decodedUserId;

      if (token) {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split("")
            .map(function (c) {
              return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
        );

        const decodedJWT = JSON.parse(jsonPayload);
        decodedUserId = decodedJWT.user_id;
        console.log(decodedUserId);
      }

      fetch(`http://localhost:8000/accounts/users/${decodedUserId}/points/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);

          if (typeof data.points === "number") {
            setDinePoints(data.points);
            setTotalPoints(data.points_total);
          } else if (Array.isArray(data.points)) {
            const pointsTotal = data.points
              .filter(
                (point) =>
                  point.source === "reserva" ||
                  point.source === "GiftCardPurchase"
              )
              .reduce((total, point) => total + point.points, 0);
            setDinePoints(pointsTotal);
            setTotalPoints(data.points_total);
          } else {
            console.error(
              "data.points is not an array or a number:",
              data.points
            );
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
        });
    }
  }, [open]);

  const euros = dinePoints / 100;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <GradientUnderlineTypography
        variant="h3"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "10px",
          marginTop: "20px",
        }}
      >
        Tus DinePoints
      </GradientUnderlineTypography>
      <Typography
        variant="h6"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        Gana dinepoints al reservar en DineBooker
      </Typography>
      <Typography
        variant="body1"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        1 reserva = 500 DinePoints
      </Typography>
      <img
        src={dinepointsImage}
        style={{
          width: "50%",
          borderRadius: "10px",
          border: "4px solid #99aaff",
          boxShadow:
            "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
          marginLeft: "230px",
          marginTop: "20px",
          marginBottom: "30px",
        }}
      />
      <Button
        variant="contained"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "40px",
          marginTop: "0px",
          marginLeft: "300px",
          marginRight: "300px",
          backgroundColor: "#535bf2",
          color: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #99aaff",
        }}
        onClick={() => navigate("/dinepoints")}
      >
        MÁS INFORMACIÓN +
      </Button>
      <Typography
        variant="h4"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "20px",
          marginTop: "10px",
          marginLeft: "10px",
        }}
      >
        Tus dinepoints
      </Typography>
      <ChartContainer>
        <Doughnut data={data} />
      </ChartContainer>
      <Typography
        variant="body1"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        {dinePoints} dinepoints acumulados
      </Typography>
      <Typography
        variant="body1"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "20px",
          marginTop: "10px",
        }}
      >
        {euros} € euros acumulados
      </Typography>

      <Button
        variant="contained"
        align="center"
        style={{
          fontFamily: "'Belleza', sans-serif",
          marginBottom: "40px",
          marginTop: "0px",
          marginLeft: "300px",
          marginRight: "300px",
          backgroundColor: "#535bf2",
          color: "#ffffff",
          borderRadius: "10px",
          border: "2px solid #99aaff",
        }}
        onClick={handleOpenDialog}
      >
        Quiero gastar mis dinepoints
      </Button>
      <QRCodeDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        userId={userId}
        reservationId={reservationId}
      />
    </Dialog>
  );
};

export default DinePointsDialog;
