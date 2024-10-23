import React from 'react';
import styled from 'styled-components';



export const PhotoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Crea tres columnas de igual tamaño
  margin-top: 40px;
  margin-left: 90px;
  margin-right: 50px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: justify;
  border-radius: 20px;  
  padding: 20px; /* Añade espacio alrededor del texto */
`;

export const PhotoContainer = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 10px;
`;

export const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const MorePhotos = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.5);
  color: white;
  padding: 5px;
  font-size: 1em;
`;

const PhotoUserComponent = ({ photos, showAllPhotos, setShowAllPhotos }) => {
    const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
  
    return (
      <PhotoGrid>
        {(showAllPhotos ? photos : photos.slice(0, 3)).map((photo, index) => (
          <PhotoContainer key={index}>
            <Photo src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${GOOGLE_API_KEY}`} alt="" />
          </PhotoContainer>
        ))}
        {!showAllPhotos && photos.length > 3 && (
          <PhotoContainer onClick={() => setShowAllPhotos(true)}>
            <Photo src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[3].photo_reference}&key=${GOOGLE_API_KEY}`} alt="" />
            <MorePhotos>
              +{photos.length - 3} more
            </MorePhotos>
          </PhotoContainer>
        )}
      </PhotoGrid>
    );
  };

export default PhotoUserComponent;

