import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  Avatar,
  Grid,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];
const BASE_URL = "http://localhost:8000";

const RestaurantDetailsDialog = ({ open, onClose, restaurant, onUpdate }) => {
  const [menuPdf, setMenuPdf] = useState(restaurant.menu_pdf);
  const [website, setWebsite] = useState(restaurant.website);
  const [name, setName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [city, setCity] = useState(restaurant.city);
  const [cuisineType, setCuisineType] = useState(restaurant.cuisine_type);
  const [priceLevel, setPriceLevel] = useState(restaurant.price_level);
  const [rating, setRating] = useState(restaurant.rating);
  const [photos, setPhotos] = useState(restaurant.photos);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const initializeOpeningHours = (restaurant) => {
    const openingHoursMap = new Map();
    (restaurant.opening_hours_set || []).forEach((hour) => {
      openingHoursMap.set(hour.day_of_week, {
        openTime: hour.open_time || "Cerrado",
        closeTime: hour.close_time || "",
        id: hour.id,
      });
    });

    return daysOfWeek.map((day, index) => {
      const hour = openingHoursMap.get(index) || {
        openTime: "Cerrado",
        closeTime: "",
      };
      return {
        day,
        openTime: hour.openTime,
        closeTime: hour.closeTime,
        id: hour.id,
        dayOfWeek: index,
      };
    });
  };

  const [openingHours, setOpeningHours] = useState(
    initializeOpeningHours(restaurant)
  );

  useEffect(() => {
    setOpeningHours(initializeOpeningHours(restaurant));
  }, [restaurant]);

  const handleOpeningHoursChange = (index, field, value) => {
    const updatedHours = [...openingHours];
    updatedHours[index][field] = value;
    setOpeningHours(updatedHours);
  };

  const detectChanges = () => {
    const changes = [];

    if (menuPdf !== restaurant.menu_pdf) {
      changes.push(`Menú PDF: ${restaurant.menu_pdf} -> ${menuPdf}`);
    }
    if (website !== restaurant.website) {
      changes.push(`Sitio web: ${restaurant.website} -> ${website}`);
    }
    if (name !== restaurant.name) {
      changes.push(`Nombre: ${restaurant.name} -> ${name}`);
    }
    if (address !== restaurant.address) {
      changes.push(`Dirección: ${restaurant.address} -> ${address}`);
    }
    if (city !== restaurant.city) {
      changes.push(`Ciudad: ${restaurant.city} -> ${city}`);
    }
    if (cuisineType !== restaurant.cuisine_type) {
      changes.push(
        `Tipo de cocina: ${restaurant.cuisine_type} -> ${cuisineType}`
      );
    }
    if (priceLevel !== restaurant.price_level) {
      changes.push(
        `Nivel de precio: ${restaurant.price_level} -> ${priceLevel}`
      );
    }
    if (rating !== restaurant.rating) {
      changes.push(`Calificación: ${restaurant.rating} -> ${rating}`);
    }
    if (photos !== restaurant.photos) {
      changes.push(`Fotos: ${restaurant.photos} -> ${photos}`);
    }

    openingHours.forEach((hour, index) => {
      const originalHour =
        restaurant.opening_hours.find((h) => h.day_of_week === index + 1) || {};
      const originalOpenTime = originalHour.open_time || "Cerrado";
      const originalCloseTime = originalHour.close_time || "";
      if (
        hour.openTime !== originalOpenTime ||
        hour.closeTime !== originalCloseTime
      ) {
        changes.push(
          `${hour.day}: ${originalOpenTime} - ${originalCloseTime} -> ${hour.openTime} - ${hour.closeTime}`
        );
      }
    });
    return changes;
  };

  const updateRestaurant = async (updatedRestaurant) => {
    const token = localStorage.getItem("access");
    try {
      const response = await fetch(
        `${BASE_URL}/restaurants/${restaurant.id}/update/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: updatedRestaurant,
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      onUpdate(data);
      Swal.fire({
        icon: "success",
        title: "Actualización realizada",
        text: "La actualización se ha realizado con éxito.",
      });
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al realizar la actualización. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleUpdate = () => {
    const changes = detectChanges();

    if (changes.length === 0) {
      onClose();
      Swal.fire({
        icon: "error",
        title: "Sin cambios",
        text: "No se ha realizado ningún cambio.",
      });
      return;
    }

    onClose();
    Swal.fire({
      title: "¿Estás seguro?",
      html: `<p>¿Deseas realizar los siguientes cambios?</p><ul>${changes
        .map((change) => `<li>${change}</li>`)
        .join("")}</ul>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, actualizar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal2-popup-custom-zindex",
      },
      didOpen: () => {
        const swalPopup = document.querySelector(".swal2-popup");
        if (swalPopup) {
          swalPopup.style.zIndex = "2000";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        formData.append("website", website);
        formData.append("name", name);
        formData.append("address", address);
        formData.append("city", city);
        formData.append("cuisine_type", cuisineType);
        formData.append("price_level", priceLevel);
        formData.append("rating", rating);

        if (menuPdf instanceof File) {
          formData.append("menu_pdf", menuPdf);
        }

        photos.forEach((photo, index) => {
          if (photo instanceof File) {
            formData.append(`photos[${index}]`, photo);
          }
        });

        openingHours.forEach((hour, index) => {
          formData.append(`opening_hours[${index}][id]`, hour.id || "");
          formData.append(
            `opening_hours[${index}][day_of_week]`,
            hour.dayOfWeek || ""
          );
          formData.append(
            `opening_hours[${index}][open_time]`,
            hour.openTime || ""
          );
          formData.append(
            `opening_hours[${index}][close_time]`,
            hour.closeTime || ""
          );
        });

        updateRestaurant(formData);
      }
    });
  };

  const fontFamilyStyle = { fontFamily: "'Belleza', sans-serif" };

  const titleStyle = {
    ...fontFamilyStyle,
    fontWeight: "bold",
    fontSize: "2.7rem",
    textDecoration: "underline",
    textDecorationColor: "transparent",
    backgroundImage: "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
    backgroundSize: "70% 4px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100%",
    textAlign: "center",
  };

  const smallTitleStyle = {
    ...fontFamilyStyle,
    fontWeight: "bold",
    fontSize: "1.5rem",
    textDecoration: "underline",
    textDecorationColor: "transparent",
    backgroundImage: "linear-gradient(to right, #ff69b4, #98e098, #99aaff)",
    backgroundSize: "70% 4px",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center 100%",
    textAlign: "center",
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      sx={{ zIndex: 1500 }}
    >
      <DialogTitle style={titleStyle}>Detalles del Restaurante</DialogTitle>
      <DialogContent style={fontFamilyStyle}>
        <List>
          <ListItem>
            <TextField
              label="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Ciudad"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Tipo de Cocina"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Nivel de Precio"
              value={priceLevel}
              onChange={(e) => setPriceLevel(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Calificación"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          {openingHours.map((hour, index) => (
            <ListItem key={index}>
              <TextField
                label={`${hour.day} - Hora de Apertura`}
                value={hour.openTime}
                onChange={(e) =>
                  handleOpeningHoursChange(index, "openTime", e.target.value)
                }
                fullWidth
              />
              <TextField
                label={`${hour.day} - Hora de Cierre`}
                value={hour.closeTime}
                onChange={(e) =>
                  handleOpeningHoursChange(index, "closeTime", e.target.value)
                }
                fullWidth
              />
            </ListItem>
          ))}
          <ListItem>
            <TextField
              label="Menú PDF"
              value={menuPdf}
              onChange={(e) => setMenuPdf(e.target.value)}
              fullWidth
            />
          </ListItem>
          <ListItem>
            <TextField
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              fullWidth
              disabled
            />
          </ListItem>
          <ListItem>
            <Grid container direction="column" alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <Typography style={smallTitleStyle}>
                  Fotos del restaurante
                </Typography>
              </Grid>
              <Grid item container justifyContent="center" spacing={2}>
                {restaurant.photos.map((photo, index) => (
                  <Grid item key={index}>
                    <Avatar
                      variant="square"
                      src={`${BASE_URL}${photo.image}`}
                      alt={`Foto ${index + 1}`}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: "10px",
                        boxShadow:
                          "0px 4px 20px rgba(255, 105, 180, 0.5), 0px 4px 20px rgba(152, 224, 152, 0.5), 0px 4px 20px rgba(153, 170, 255, 0.5)",
                        marginRight: "20px",
                        border: "1px solid #A2D2FF",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </ListItem>
        </List>
      </DialogContent>
      <ListItem>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          style={{ marginTop: "20px" }}
        >
          {" "}
          **Si desea modificar algún campo, por favor póngase en contacto con el
          equipo de DineBooKer.
        </Typography>
      </ListItem>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdate} color="primary">
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantDetailsDialog;
