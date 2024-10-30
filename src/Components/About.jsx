import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: left;
  margin-top: 60px;
  margin-bottom: 20px;
  margin-left: 150px;
  margin-right: 150px;
  padding: 20px; 
  box-shadow: 5px 5px 5px #666;
  border: 2px solid #99aaff;
  border-radius: 10px; 
`;

const StyledH3 = styled.h3`
  color: #666;
  font-size: 40px;
  font-weight: bold; 
  text-decoration: underline; 
`;

const StyledP = styled.p`
  color: #666;
  font-size: 18px;
`;

const About = () => {
  return (
    <>
      <Container>
        <StyledH3>Acerca de DineBooker</StyledH3>
        <StyledP>
          Dinebooker es la plataforma líder en reservas y descubrimiento de
          restaurantes en Madrid y Barcelona. Con una selección incomparable de
          restaurantes, te ofrecemos opciones gastronómicas para todos los
          gustos y ocasiones. Desde la cocina local más tradicional hasta las
          experiencias más innovadoras, en DineBooker encontrarás el lugar
          perfecto para cada momento.
        </StyledP>
        <StyledP>
          Busca la disponibilidad de restaurantes en cualquier momento y al
          mejor precio. Con muchas opiniones verificadas, te guiamos para que
          descubras los mejores lugares donde disfrutar de una buena comida.
        </StyledP>
        <StyledP>
          DineBooker te ofrece descuentos de hasta el 50% en la cuenta de la
          comida todos los días, además de puntos de recompensa llamados
          DinePoints, que puedes canjear en restaurantes participantes. ¿Te
          apetece una paella en Barcelona, sushi en Madrid, o prefieres
          descubrir un restaurante gastronómico?
        </StyledP>
        <StyledP>
          Desde pequeños bistrós con encanto hasta locales perfectos para un
          brunch dominical, DineBooker es tu guía confiable para encontrar los
          mejores restaurantes. ¡Explora, reserva y disfruta de la mejor
          gastronomía con Dinebooker!
        </StyledP>
      </Container>
    </>
  );
};

export default About;
