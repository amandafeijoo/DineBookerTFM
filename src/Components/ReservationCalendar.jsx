import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import Swal from "sweetalert2";
import "react-calendar/dist/Calendar.css";
import "../styles/CustomCalendar.css";
import "react-calendar/dist/Calendar.css";
import { es } from "date-fns/locale";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faClock,
  faUser,
  faPercent,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import CompletedReservation from "./CompletedReservation";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Dialog2 from "@mui/material/Dialog";
import RegisterForm from "./RegisterForm";

const CalendarContainer = styled.div`
  position: sticky;
  top: 0px;
  background-color: #99aaff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledButton = styled.button`
  background-color: #646cff;
  width: 100%;
  padding: 15px;
  text-align: center;
  max-width: 100px;
  margin: auto;
  border: 2px solid #f5deb3;
  margin-top: 75px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;
const ButtonContainer = styled.div`
  display: grid;
  color: #333;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  height: ${(props) => (props.$showingTimes ? "200px" : "auto")};
  grid-row-gap: 5px;
  margin-top: -60px;
`;

const Container = styled.div`
  display: flex;
`;
const PeopleButtonContainer = styled.div`
  position: relative;
  top: -70px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  top: 60px;
  gap: 10px;
  grid-row-gap: 0px;
`;

const PeopleButton = styled.button`
  width: 100%;
  padding: 20px;
  text-align: center;
  max-width: 100px;
  margin-top: 40px;
  border: 2px solid #f5deb3;
  background-color: #646cff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

const StyledImg = styled.img`
  width: 60px;
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 0px;
`;
const StickyDiv = styled.div`
  position: sticky;
  background-color: #fff8dc;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
  margin-left: -40px;
  height: 670px;
  width: 400px;
  border-radius: 20px;
  border: 3px solid #99aaff;
  z-index: 1000;
`;

const StepIndicator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 104%;
  border-radius: 20px;
  margin-top: 20px;
`;

const Step = styled.div`
  width: 160px;
  height: 50px;
  background-color: ${(props) => (props.$active ? "blue" : "gray")};
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  background-color: ${(props) =>
    props.$active ? "blue" : props.$disabled ? "grey" : "tuColorNormal"};

  &:hover {
    background-color: #d0ff94;
    color: #000000;
  }
`;

const Icon = styled.div`
  position: relative;
  color: white;
  text-align: center;
  line-height: 50px;
`;

const StyledH2 = styled.h2`
  color: #333;
  font-size: 1.7em;
  margin-top: 20px;
  margin-bottom: 0px;
  text-align: center;
`;
const StyledP = styled.p`
  color: #333;
  font-size: 1em;
  margin-top: 0px;
  text-align: center;
`;

function ReservationCalendar({ openingHours, restaurantName, restaurantId }) {
  const schedule = {
    monday: [{ start: 390, end: 720 }],
    tuesday: [{ start: 390, end: 720 }],
    wednesday: [{ start: 390, end: 720 }],
    thursday: [{ start: 390, end: 720 }],
    friday: [
      { start: 390, end: 720 },
      { start: 780, end: 1020 },
    ],
    saturday: [
      { start: 390, end: 720 },
      { start: 780, end: 1020 },
    ],
    sunday: [
      { start: 390, end: 720 },
      { start: 780, end: 1020 },
    ],
  };
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [reservationDate, setReservationDate] = useState(new Date());
  const [time, setTime] = useState(null);
  const [people, setPeople] = useState(1);
  const [step, setStep] = useState(1);
  const [restaurantSchedule, setRestaurantSchedule] = useState(schedule);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const dayOfWeekIndices = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const handleNextStep = () => {
    if (step === 1 && reservationDate) {
      setStep(2);
    } else if (step === 2 && time) {
      setStep(3);
    } else if (step === 3 && people) {
      setStep(4);
    }
  };

  const handleDateChange = (date) => {
    setReservationDate(date);
    setDateSelected(true);
    const dayOfWeek = date
      .toLocaleDateString("en-US", { weekday: "long" })
      .toLowerCase();
    const daySchedules = restaurantSchedule[dayOfWeek];
    if (daySchedules) {
      const intervals = [];
      for (let j = 0; j < daySchedules.length; j++) {
        for (let i = daySchedules[j].start; i < daySchedules[j].end; i += 60) {
          const hours = Math.floor(i / 60);
          const minutes = i % 60;
          const formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes}`;
          intervals.push(formattedTime);
        }
      }
      setAvailableTimes(intervals);
    } else {
      setAvailableTimes([]);
    }
    setStep(2);
  };

  const handleBack = () => {
    if (step === 2) {
      setReservationDate(null);
      setDateSelected(false);
      setStep(1);
    }
  };

  const handleTimeClick = (value) => {
    console.log("handleTimeClick called with value", value);
    setTime(value);
    setStep(3);
  };

  const handlePeopleClick = (value) => {
    setPeople(value);
    if (!currentUser) {
      Swal.fire({
        title: "¡Atención!",
        text: "¡Inicia sesión para reservar!\nRegístrate ahora y gana 500 DinePoints para usar en futuras reservas.",
        icon: "warning",
        confirmButtonText: "Registrarse",
      }).then((result) => {
        if (result.isConfirmed) {
          setRegisterOpen(true);
        }
      });
    } else {
      setStep(4);
    }
  };

  const handleCloseRegister = () => {
    setRegisterOpen(false);
  };

  function convertTo24Hour(time) {
    var [hours, minutes] = time.split(":");
    var period = time.match(/AM|PM/)[0];
    hours = parseInt(hours);
    minutes = parseInt(minutes);

    if (period === "PM" && hours !== 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  }

  function convertTimeToMinutes(time) {
    if (time === null) return null;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  }

  function convertDayOfWeek(day) {
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    return days[day % 7];
  }

  useEffect(() => {
    if (!openingHours) {
      setRestaurantSchedule(schedule);
    } else if (Array.isArray(openingHours)) {
      const processedOpeningHours = openingHours.reduce(
        (acc, { day_of_week, open_time, close_time }) => {
          const day = convertDayOfWeek(day_of_week);
          const open = open_time ? convertTimeToMinutes(open_time) : null;
          const close = close_time ? convertTimeToMinutes(close_time) : null;

          if (open === null || close === null) {
            acc[day] = null;
          } else {
            acc[day] = [{ start: open, end: close }];
          }

          return acc;
        },
        {}
      );

      setRestaurantSchedule((prevSchedule) => ({
        ...prevSchedule,
        ...processedOpeningHours,
      }));
    } else {
      console.error("Invalid opening hours:", openingHours);
    }
  }, [openingHours]);
  const peopleNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <StickyDiv>
      <Container>
        <StyledImg src="/images/logo.jpg" alt="Logo" />
      </Container>
      <StyledH2>Encuentra una mesa</StyledH2>
      <StyledP>Reserva de forma gratuita</StyledP>
      <StepIndicator>
        <Step $active={step >= 1} onClick={() => setStep(1)}>
          <Icon>
            <FontAwesomeIcon icon={faCalendar} />
          </Icon>
        </Step>
        <Step
          $active={step >= 2 && reservationDate}
          onClick={(e) => {
            if (!reservationDate) e.preventDefault();
            else if (step === 1 && reservationDate) setStep(2);
          }}
          $disabled={step !== 1 || !reservationDate}
        >
          <Icon>
            <FontAwesomeIcon icon={faClock} />
          </Icon>
        </Step>
        <Step
          $active={step >= 3 && time}
          onClick={() => {
            if (step === 2 && time) setStep(3);
          }}
          $disabled={step !== 2 || !time}
        >
          <Icon>
            <FontAwesomeIcon icon={faUser} />
          </Icon>
        </Step>
        <Step
          $active={step === 4 && people}
          onClick={() => {
            if (step === 3 && people) setStep(4);
          }}
          $disabled={step !== 3 || !people}
        >
          <Icon>
            <FontAwesomeIcon icon={faCalendarCheck} />
          </Icon>
        </Step>
      </StepIndicator>
      <CalendarContainer>
        {step === 1 && (
          <Calendar
            onChange={handleDateChange}
            value={reservationDate}
            locale="es-ES"
            showNavigation
            tileDisabled={({ date }) => {
              const dayOfWeek = date
                .toLocaleDateString("en-US", { weekday: "long" })
                .toLowerCase();
              return schedule[dayOfWeek] === null;
            }}
          />
        )}
      </CalendarContainer>
      <ButtonContainer $showingTimes={step === 2}>
        {step === 2 &&
          Array.isArray(availableTimes) &&
          availableTimes.map((time, index) => (
            <StyledButton key={index} onClick={() => handleTimeClick(time)}>
              {time}
            </StyledButton>
          ))}
      </ButtonContainer>
      {step === 3 && (
        <PeopleButtonContainer>
          {peopleNumbers.map((number) => (
            <PeopleButton
              key={number}
              onClick={() => handlePeopleClick(number)}
            >
              {number}
            </PeopleButton>
          ))}
        </PeopleButtonContainer>
      )}
      {step === 4 && (
        <CompletedReservation
          people={people}
          time={time}
          reservationDate={reservationDate}
          restaurantName={restaurantName}
          restaurantId={restaurantId}
          step={step}
        />
      )}{" "}
      <Dialog2 open={registerOpen} onClose={handleCloseRegister}>
        <RegisterForm open={registerOpen} onClose={handleCloseRegister} />
      </Dialog2>
    </StickyDiv>
  );
}

export default ReservationCalendar;
