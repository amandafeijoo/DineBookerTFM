import React, { useContext, useEffect, useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import { AppContext } from "../Context/AppContext";
import styled from "styled-components";

const StyledH1 = styled.h1`
  color: grey;
  text-align: center;
  font-size: 2em;
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
  border-bottom: 2px solid #a2d2ff;
  padding-bottom: 10px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

const StepOne = ({ selectedImage, setAmount }) => {
  const { amount, isOpen, setIsOpen } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(50);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAmount(50);
  }, [setAmount]);

  const handleAmountChange = (event) => {
    const value = Number(event.target.value);
    if (value > 250) {
      setError("El valor máximo es 250€");
    } else {
      setError(null);
      setInputValue(value);
      setAmount(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAmount(inputValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: "20px" }}>
        <StyledH1>Tarjeta Regalo DineBooker</StyledH1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <img
            src={selectedImage}
            alt="Selected gift"
            style={{
              maxWidth: "60%",
              height: "auto",
              borderRadius: "10px",
              marginRight: "20px",
            }}
          />
          <div>
            <TextField
              label="Amount"
              value={inputValue}
              onChange={handleAmountChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">€</InputAdornment>
                ),
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <p>Desde €15 hasta €250</p>
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                backgroundColor: "transparent",
                color: "blue",
                border: "none",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "16px",
              }}
            >
              TERMINOS Y CONDICIONES {isOpen ? "▲" : "▼"}
            </button>
            <div style={{ minHeight: "50px" }}>
              {isOpen && (
                <p style={{ textAlign: "justify" }}>
                  La Tarjeta Regalo puede ser utilizada en restaurantes
                  asociados a DineBooker. La Tarjeta Regalo DineBooker digital
                  es válida durante 18 meses a partir de la fecha de emisión; la
                  Tarjeta Regalo DineBooker física se entrega ya activada, por
                  lo que el periodo de validez de 18 meses empieza a contar poco
                  después de su compra. El valor de la Tarjeta Regalo DineBooker
                  está predeterminado y no puede ser modificado. La Tarjeta
                  Regalo DineBooker no puede ser intercambiada por dinero. Las
                  Tarjetas Regalo DineBooker no puede ser revendidas pero puedes
                  comprarlas como regalo. Por favor, lea las Condiciones de
                  Venta y las Condiciones de Uso.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default StepOne;
