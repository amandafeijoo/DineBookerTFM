import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 60px;
  margin-bottom: 50px;
  margin-left: 180px;
  margin-right: 30px;
  font-size: 1.5em;
`;

const Styledh1 = styled.h1`
  color: #333;
  font-size: 1.5em;
`;

const Styledh3 = styled.h3`
  color: #333;
  font-size: 1em;
  margin-bottom: 10px;
`;

const RestaurantContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 150px;
  margin-right: 150px;
  margin-bottom: 90px;
  background-color: rgba(230, 230, 250, 0.8);
  border: 3px solid #99aaff;
  box-shadow: 5px 5px 5px #333;
`;

const Restaurant = styled.div`
  flex: 1 0 250px;
  margin: 16px;
  text-align: center;
  background-color: #f5f5dc;
  box-shadow: 5px 5px 5px #333;
  border: 3px solid #99aaff;
  border-radius: 10px;
  transition: transform 0.5s;
  min-height: 120px;

  &:hover {
    transform: scale(1.1);
  }
`;

const Image = styled.img`
  width: 250px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 5px 5px 5px #333;
  margin-bottom: 10px;
`;

const Button = styled.button`
  border: 2px solid #99aaff;
  background-color: #d0ff94;
  color: #000000;
  border-radius: 20%;
  padding: 12px;
  margin-right: 5px;
  &:hover {
    background-color: #535bf2;
    color: #ffffff;
  }
`;

const StyledLink = styled.a`
  margin-right: 100px;
  font-size: 18px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #535bf2;
    color: #ffffff;
    border-radius: 5px;
    padding: 10px 20px;
    border: 2px solid #ffffff;
    transform: scale(1.1);
  }
`;

const PopularBarcelona = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [displayStartIndex, setDisplayStartIndex] = useState(0);
  const navigate = useNavigate();

  const getRestaurants = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/rating_restaurants/Barcelona/?page=${page}`
      );
      console.log(response.data);
      setRestaurants((prevRestaurants) => [
        ...prevRestaurants,
        ...response.data,
      ]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, [page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <TitleContainer>
        <Styledh1>Restaurantes populares en Barcelona</Styledh1>
        <div style={{ transform: "translateX(-115px)" }}>
          <div>
            <Button
              onClick={() =>
                setDisplayStartIndex((prevIndex) => Math.max(prevIndex - 4, 0))
              }
            >
              &lt;
            </Button>
            <Button
              onClick={() =>
                setDisplayStartIndex((prevIndex) =>
                  Math.min(prevIndex + 4, restaurants.length - 4)
                )
              }
            >
              &gt;
            </Button>
          </div>
        </div>
      </TitleContainer>
      <RestaurantContainer>
        {restaurants
          .slice(displayStartIndex, displayStartIndex + 4)
          .map((restaurant, index) => {
            const address = restaurant.address || "N/A";
            const cuisineType = restaurant.cuisine_type || "N/A";
            const priceLevel = restaurant.price_level || "N/A";
            const photoUrl =
              restaurant.photos && restaurant.photos.length > 0
                ? restaurant.photos[0].image
                : "url_de_imagen_predeterminada";

            return (
              <Restaurant key={index}>
                <Image
                  src={photoUrl}
                  alt={restaurant.name}
                  onClick={() => {
                    console.log(restaurant.id);
                    if (restaurant.id !== undefined) {
                      navigate(`/restaurant/${restaurant.id}`);
                    }
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Styledh3 style={{ marginRight: "10px" }}>
                    {restaurant.name}
                  </Styledh3>
                  <p>
                    <FaStar color="gold" /> {restaurant.rating}
                  </p>
                </div>
                <p>{address}</p>
                <p>Precio medio {priceLevel}</p>
                <p>Categoría: {cuisineType}</p>
              </Restaurant>
            );
          })}
      </RestaurantContainer>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default PopularBarcelona;
