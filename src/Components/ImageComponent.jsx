import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: auto;
  border: 3px solid #000;
  box-shadow: 5px 5px 5px #333;
  margin: 0;
`;

const ImageComponent = ({ src = "/images/ownerpubli1.png", alt = "Descripción de la imagen" }) => {
  return <Image src={src} alt={alt} />;
};

export default ImageComponent;