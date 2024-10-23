import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';
import { Carousel } from 'react-responsive-carousel';
import styled from 'styled-components';


const CarouselContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`;

const CarouselItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageTitle = styled.h2`
  text-align: center;
  font-size: 1.5em;
  color: #333;
  margin-top: 10px;
`;

const StyledCarousel = styled(Carousel)`
    width: 50%;
    height: auto;
    max-height: 70vh;
    align-items: center;
    border-radius: 20px;
    margin-top: 15px;
    margin-bottom: 5px;
    box-shadow: 5px 5px 5px #333; 
    background-color: #7ccd7c;
    .carousel .slide .legend {
        background: #98e098;
        border-radius: 20px;
        color: #A2D2FF;
        margin-bottom: 0px;
        }
    .carousel .control-dots {
        display: none;
    }
    .carousel .thumbs-wrapper {
      margin-bottom: 0px;   }
    .carousel .thumbs {
      display: none;
    }
    .carousel.carousel-slider .control-arrow {
      background-color: #A2D2FF;
      border-radius: 20px;
      color: #98e098;
    }

`;
const StyledH1 = styled.h1`
   width: 100%;
  margin-top: 90px;
  margin-bottom: 50px;
  text-align: center;
  color: #757575;
  font-size: 2em;
  text-shadow: 2px 2px 2px #A2D2FF;
  font-weight: bold; // Hace el texto más grueso
  letter-spacing: 2px; // Aumenta el espacio entre las letras
  text-transform: uppercase; // Convierte el texto a mayúsculas
  border-bottom: 2px solid #A2D2FF; // Agrega una línea debajo del título
  padding-bottom: 10px; // Agrega espacio debajo del texto
  font-family: 'Belleza', sans-serif; // Cambia la familia de fuentes

`;


function SelectableImage({ src, alt, title, isSelected, onClick }) {
  return (
    <div 
      onClick={() => {
        console.log(`Imagen seleccionada: ${src}`);
        onClick();
      }} 
      style={{ border: isSelected ? '2px solid #98e098' : 'none' }}
    >
      <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto', borderRadius:'10px' }} />
<ImageTitle>{title}</ImageTitle>
</div>
  );
}
  
  function StepZero({ selectedImage, setSelectedImage }) {
    console.log('StepZero se está renderizando');

    return (
      <div>
      <StyledH1>Seleccione el diseño de su tarjeta regalo digital</StyledH1>
      <CarouselContainer>
        <StyledCarousel showThumbs={false}>     
          <CarouselItem>
            <SelectableImage 
              src="images/gift1.jpg" 
              alt="Cumpleaños" 
              title="Cumpleaños" 
              isSelected={selectedImage === 'images/gift1.jpg'} 
              onClick={() => setSelectedImage('images/gift1.jpg')} 
            />
          </CarouselItem>
          <CarouselItem>
            <SelectableImage 
              src="images/gift2.jpg" 
              alt="Gracias" 
              title="Gracias" 
              isSelected={selectedImage === 'images/gift2.jpg'} 
              onClick={() => setSelectedImage('images/gift2.jpg')} 
            />
          </CarouselItem>
          <CarouselItem>
            <SelectableImage 
              src="images/gift3.jpg" 
              alt="Dinebooker" 
              title="Dinebooker" 
              isSelected={selectedImage === 'images/gift3.jpg'} 
              onClick={() => setSelectedImage('images/gift3.jpg')} 
            />
          </CarouselItem>
        </StyledCarousel>
      </CarouselContainer>
    </div>
  );
}  
  export default StepZero;