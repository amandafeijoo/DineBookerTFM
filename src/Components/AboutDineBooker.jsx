import React from "react";
import styled from "styled-components";
import Owner from "./Owner";

const Container = styled.div`
  padding: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 80px;
`;

const InfoBox = styled.div`
  background-image: url("images/background2.png"); 
  background-size: cover; 
  background-repeat: no-repeat; 
  background-position: center; 
  border: 4px solid #f5deb3; 
  padding: 20px;
  flex: 1;
  margin: 5px;
  margin-top: 100px;
  border-radius: 10px;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    // Rosa
    0px 4px 20px rgba(152, 224, 152, 0.5),
    // Verde
    0px 4px 20px rgba(153, 170, 255, 0.5); 
  height: 600px;
  width: 300px;
  transform: ${(props) =>
    props.index % 2 === 0
      ? "translateY(-30px)"
      : "translateY(10px)"}; 
`;

const Title = styled.h2`
  font-family: "Belleza", sans-serif; 
  color: #6688cc;
  font-weight: bold;
  text-align: center;
  margin-top: 8rem;
  margin-bottom: 1rem;
  font-size: 4.2em;
  text-decoration: underline;
  text-decoration-color: transparent; 
  background-image: linear-gradient(
    to right,
    #ff69b4,
    #98e098,
    #99aaff
  ); 
  background-size: 100% 4px; 
  background-repeat: no-repeat;
  background-position: 0 100%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); 
  border: 2px solid #99aaff; 
  padding: 0.5rem; 
  border-radius: 10px; 
  box-shadow: 0px 4px 20px rgba(153, 170, 255, 0.5); 
`;

const Text = styled.p`
  font-size: 15px;
  font-family: "Belleza", sans-serif; 
  color: #fff;
  margin-top: 20px;
  font-weight: bold;
  text-align: justify;
  background-color: rgba(50, 50, 50, 0.5); 
  padding: 10px; 
  line-height: 1.6;
  justify-content: center;
  border-radius: 10px;
  border: 1px solid #99aaff;
`;

const StyledH3 = styled.h3`
  font-size: 20px;
  font-weight: bold;
  color: #f5deb3;
  margin-top: 200px;
  background-color: rgba(
    50,
    50,
    50,
    0.7
  ); 
  padding: 10px;
`;

const StyledParagraph = styled.p`
  font-size: 1.2em;
  color: "gray";
  line-height: 1.6;
  text-align: justify;
  justify-content: center;
  margin-left: 160px;
  margin-right: 200px;
  margin-top: 40px;
  margin-bottom: 80px;
`;

const Divider = styled.hr`
  border: 2px solid #f5deb3;
  height: 2px;
  width: 50%;
  margin-top: 20px;
  margin-bottom: 30px;
  margin-left: 0; 
  margin-right: auto; 
`;

const DividerRight = styled.hr`
  border: 2px solid #f5deb3;
  height: 2px;
  width: 50%;
  margin-top: 120px;
  margin-bottom: 100px;
  margin-left: auto; 
  margin-right: 0; 
`;

const StyledImage = styled.img`
  width: 40%; 
  height: auto; 
  border-radius: 10px;
  background-color: rgba(
    50,
    50,
    50,
    0.7
  ); 
  margin-top: 50px;
  border: 2px solid #99aaff;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5), 
    0px 4px 20px rgba(152, 224, 152, 0.5),
    0px 4px 20px rgba(
        153,
        170,
        255,
        0.5
      ); 
`;
const StyledParagraph2 = styled.p`
  font-size: 2em;
  color: #757575;
  text-align: left;
  margin-left: 150px;
  margin-top: 50px;
  margin-bottom: 30px;
`;
const AboutDineBooker = () => {
  return (
    <Container>
      <Title>DINEBOOKER</Title>
      <StyledParagraph2>¿Quiénes Somos?</StyledParagraph2>
      <StyledParagraph>
        Somos una plataforma líder en reservas de restaurantes que facilita la
        experiencia de reservar mesas de forma rápida y sin complicaciones. Ya
        sea para una cena especial, un almuerzo de negocios o simplemente un
        brunch entre amigos, en DineBooker te ayudamos a encontrar el lugar
        perfecto para cada ocasión. Para los comensales DineBooker te permite
        descubrir una amplia selección de restaurantes en tu ciudad. Con
        opciones para todos los gustos y ocasiones, desde cocinas locales hasta
        internacionales, puedes explorar menús, leer reseñas, obtener descuentos
        y reservar tu mesa en segundos. Además, con nuestro sistema de fidelidad
        DinePoints, ganas puntos en cada reserva, que luego podrás canjear por
        recompensas y descuentos exclusivos. Para los propietarios de
        restaurantes Ayudamos a los restaurantes a gestionar sus reservas de
        forma eficiente y a aumentar su visibilidad. Con DineBooker, los
        propietarios pueden maximizar la ocupación de sus mesas, atraer nuevos
        clientes y ofrecer una experiencia impecable desde la reserva hasta el
        servicio. Nuestra plataforma es fácil de usar y está diseñada para
        facilitar la gestión del restaurante, con herramientas que simplifican
        el día a día y optimizan el negocio.{" "}
      </StyledParagraph>
      <Divider />
      <InfoContainer>
        <InfoBox index={0}>
          <StyledH3>Nuestra Historia</StyledH3>
          <Text>
            Dinebooker nació de una pasión compartida por la buena comida y la
            tecnología. Lo que comenzó como una simple idea en [año de
            fundación] se ha transformado en una plataforma líder en la
            industria de las reservas de restaurantes. Vimos la necesidad de un
            servicio que hiciera más fácil para los amantes de la comida
            encontrar y asegurar una mesa en sus lugares favoritos, y desde
            entonces hemos estado dedicados a cumplir con esa misión.
          </Text>
        </InfoBox>
        <InfoBox index={1}>
          <StyledH3>Nuestra Misión</StyledH3>
          <Text>
            En Dinebooker, creemos que cada comida debe ser una experiencia
            memorable, desde la primera búsqueda hasta el último bocado. Nos
            esforzamos por ofrecerte una selección cuidadosamente curada de
            restaurantes, desde joyas locales hasta establecimientos de
            renombre, todo en un solo lugar. Nuestra misión es conectar a los
            comensales con las mejores mesas, brindando una experiencia de
            reserva sencilla y rápida.
          </Text>
        </InfoBox>
        <InfoBox index={2}>
          <StyledH3>Qué Ofrecemos</StyledH3>
          <Text>
            Con Dinebooker, puedes explorar una amplia gama de restaurantes
            según tu ubicación, tipo de cocina, y preferencias. Ya sea que
            busques una cena elegante, un brunch relajado, o una nueva aventura
            culinaria, nuestra plataforma está diseñada para llevarte
            directamente a las mejores opciones disponibles.
          </Text>
        </InfoBox>
        <InfoBox index={3}>
          <StyledH3>Nuestra Visión</StyledH3>
          <Text>
            Nuestra visión es ser la plataforma de reservas gastronómicas
            preferida a nivel global, donde cada usuario pueda encontrar su mesa
            perfecta sin complicaciones. Aspiramos a ser no solo un
            intermediario, sino un verdadero aliado en la creación de
            experiencias gastronómicas excepcionales.
          </Text>
        </InfoBox>
      </InfoContainer>
      <Divider />
      <StyledImage src="/images/ubi.png" alt="Ubicación" />
      <DividerRight />
      <Owner />
    </Container>
  );
};

export default AboutDineBooker;
