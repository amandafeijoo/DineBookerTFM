import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { OwnerContext } from "../Context/OwnerContext";

const LoginOwner = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const { setCurrentOwner, setIsOwner } = useContext(OwnerContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  useEffect(() => {
    const storedOwner = localStorage.getItem("currentOwner");
    const isOwnerLoggedIn = localStorage.getItem("isOwnerLoggedIn");

    if (storedOwner && isOwnerLoggedIn === "true") {
      setCurrentOwner(JSON.parse(storedOwner));
      setIsOwner(true);
      navigate("/loginowner"); 
    }
  }, [setCurrentOwner, setIsOwner, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/owners/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Access Token:", data.access); 
        console.log("Refresh Token:", data.refresh); 

        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        setCurrentOwner(data.owner);
        localStorage.setItem("currentOwner", JSON.stringify(data.owner));
        localStorage.setItem("isOwnerLoggedIn", "true");
        setIsOwner(true);
        setValues({
          email: "",
          password: "",
          showPassword: false,
        });
        navigate("/loginowner"); 
      } else {
        setErrorMessage("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth={false}>
      <Box
        display="flex"
        flexDirection="row"
        minHeight="calc(100vh - 50px)"
        marginBottom="50px"
        alignItems="stretch"
        justifyContent="center"
      >
        <Box flex={1}>
          <video
            autoPlay
            loop
            muted
            style={{
              width: "70%",
              border: "3px solid #a7a7f5",
              height: "80%",
              objectFit: "cover",
              borderRadius: "20px",
              boxShadow:
                "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
              marginTop: "80px",
              padding: "0 30px",
            }}
          >
            <source src="images/login.mp4" type="video/mp4" />
          </video>
        </Box>
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{ maxHeight: "100vh", overflow: "auto" }}
        >
          <Box style={{ maxWidth: "400px", width: "100%", padding: "0 20px" }}>
            <Typography
              variant="h4"
              gutterBottom
              style={{
                color: "grey",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "3em",
                marginTop: "40px",
                marginBottom: "35px",
                borderBottom: "2px solid #A2D2FF",
                paddingBottom: "10px",
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: "'Belleza', sans-serif",
              }}
            >
              DINEBOOKER MANAGER
            </Typography>
            {errorMessage && <p>{errorMessage}</p>}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={values.email}
              onChange={handleChange("email")}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange("password")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "16px" }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginOwner;
