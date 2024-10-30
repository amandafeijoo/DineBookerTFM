import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
  margin-left: 40px;
  margin-right: 50px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  text-align: justify;
  border-radius: 20px;
  padding: 20px;
  border-radius: 20px;
  border: 3px solid #99aaff;
  box-shadow: 0px 4px 20px rgba(255, 105, 180, 0.5),
    0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5);
  width: 80%;
  height: 60vh;
  position: relative;
  z-index: 0;
`;

const RestaurantMap = ({ location }) => {
  console.log(location);
  const position = [location.lat, location.lng];

  return (
    <Container>
      <MapContainer
        center={position}
        zoom={18}
        style={{ height: "50vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
};

export default RestaurantMap;
