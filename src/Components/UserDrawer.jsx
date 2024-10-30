import { useState } from "react";
import styled from "styled-components";
import {
  Button,
  Avatar,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
} from "@mui/material";
import {
  Book,
  Favorite,
  MonetizationOn,
  Star,
  PersonAdd,
  Person,
  Build,
  Home,
  Help,
  ExitToApp,
} from "@mui/icons-material";
import Reservas from "./Reservas";
import Favoritos from "./UserDrawer/Favoritos";
import DinePointsDialog from "./UserDrawer/DinePointsDialog";
import RecommendFriendDialog from "./UserDrawer/RecommendFriendDialog";
import OpinionesDialog from "./UserDrawer/OpinionesDialog";
import GiftCardDialog from "./UserDrawer/GiftCardDialog";
import DatosPersonalesDialog from "./UserDrawer/DatosPersonalesDialog";
import SettingsDialog from "./UserDrawer/SettingsDialog";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import Swal from "sweetalert2";

const Drawer = styled(MuiDrawer)`
  .MuiPaper-root {
    background-color: rgba(0, 0, 0, 0.5);
    overflow: auto;
    border-left: 1px solid #99aaff;
    border-top: 1px solid #99aaff;
    border-bottom: 1px solid #99aaff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
  }
`;

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    color: #d3d3d3;
  }
`;
const IconWrapper = styled.span`
  color: #ccffcc;
`;

const UserDrawer = ({ open, onClose }) => {
  const [openFavoritos, setOpenFavoritos] = useState(false);
  const [openReservas, setOpenReservas] = useState(false);
  const [openDinePointsDialog, setOpenDinePointsDialog] = useState(false);
  const [openGiftCardDialog, setOpenGiftCardDialog] = useState(false);
  const [openRecommendFriendDialog, setOpenRecommendFriendDialog] =
    useState(false);
  const [openOpinionesDialog, setOpenOpinionesDialog] = useState(false);
  const [opiniones, setOpiniones] = useState([]);
  const [openDatosPersonales, setOpenDatosPersonales] = useState(false);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await fetch("http://localhost:8000/accounts/logout/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.status === 200) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("userToken");
        localStorage.removeItem("currentOwner");
        localStorage.removeItem("isOwnerLoggedIn");

        setCurrentUser(null);
        onClose();

        Swal.fire({
          icon: "success",
          title: "Sesión cerrada",
          text: "Has cerrado sesión exitosamente.",
        }).then(() => {
          navigate("/");
        });
      } else {
        console.error("Error during logout", response);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error during logout", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al cerrar sesión. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleReservasClick = () => {
    setReservasOpen(true);
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <List>
        <ListItem button onClick={() => setOpenReservas(true)}>
          <ListItemIcon>
            <IconWrapper>
              <Book />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Reservas" />
        </ListItem>
        <ListItem button onClick={() => setOpenFavoritos(true)}>
          <ListItemIcon>
            <IconWrapper>
              <Favorite />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Favoritos" />
        </ListItem>
        <ListItem button onClick={() => setOpenDinePointsDialog(true)}>
          <ListItemIcon>
            <IconWrapper>
              <MonetizationOn />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="DinePoints" />
        </ListItem>
        <ListItem button onClick={() => setOpenGiftCardDialog(true)}>
          <ListItemIcon>
            <IconWrapper>
              <Home />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Tarjeta de Regalo" />
        </ListItem>
        <ListItem button onClick={() => setOpenRecommendFriendDialog(true)}>
          <ListItemIcon>
            <IconWrapper>
              <PersonAdd />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Recomendar un amigo" />
        </ListItem>
        <ListItem button onClick={() => setOpenOpinionesDialog(true)}>
          <ListItemIcon>
            <IconWrapper>
              <Star />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Opiniones" />
        </ListItem>
        <ListItem button onClick={() => setOpenDatosPersonales(true)}>
          <ListItemIcon>
            <IconWrapper>
              <Person />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Datos personales" />
        </ListItem>
        <ListItem button onClick={() => setOpenSettingsDialog(true)}>
          <ListItemIcon>
            <IconWrapper>
              <Build />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Ajustes" />
        </ListItem>
        <ListItem
          button
          onClick={() => {
            navigate("/contact");
            onClose();
          }}
        >
          <ListItemIcon>
            <IconWrapper>
              <Help />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Ayuda" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <IconWrapper>
              <ExitToApp />
            </IconWrapper>
          </ListItemIcon>
          <StyledListItemText primary="Cerrar Sesión" />
        </ListItem>
      </List>
      <Dialog open={openReservas} onClose={() => setOpenReservas(false)}>
        <Reservas open={openReservas} onClose={() => setOpenReservas(false)} />
      </Dialog>
      <Dialog open={openFavoritos} onClose={() => setOpenFavoritos(false)}>
        <Favoritos
          open={openFavoritos}
          onClose={() => setOpenFavoritos(false)}
        />
      </Dialog>
      <Dialog
        open={openDinePointsDialog}
        onClose={() => setOpenDinePointsDialog(false)}
      >
        <DinePointsDialog
          open={openDinePointsDialog}
          onClose={() => setOpenDinePointsDialog(false)}
        />
      </Dialog>
      <Dialog
        open={openGiftCardDialog}
        onClose={() => setOpenGiftCardDialog(false)}
      >
        <GiftCardDialog
          open={openGiftCardDialog}
          onClose={() => setOpenGiftCardDialog(false)}
        />
      </Dialog>
      <Dialog
        open={openRecommendFriendDialog}
        onClose={() => setOpenRecommendFriendDialog(false)}
      >
        <RecommendFriendDialog
          open={openRecommendFriendDialog}
          onClose={() => setOpenRecommendFriendDialog(false)}
        />
      </Dialog>
      <Dialog
        open={openOpinionesDialog}
        onClose={() => setOpenOpinionesDialog(false)}
      >
        <OpinionesDialog
          open={openOpinionesDialog}
          onClose={() => setOpenOpinionesDialog(false)}
          opiniones={opiniones}
        />
      </Dialog>
      <Dialog
        open={openDatosPersonales}
        onClose={() => setOpenDatosPersonales(false)}
      >
        <DatosPersonalesDialog
          open={openDatosPersonales}
          onClose={() => setOpenDatosPersonales(false)}
        />
      </Dialog>
      <Dialog
        open={openSettingsDialog}
        onClose={() => setOpenSettingsDialog(false)}
      >
        <SettingsDialog
          open={openSettingsDialog}
          onClose={() => setOpenSettingsDialog(false)}
        />
      </Dialog>
    </Drawer>
  );
};

export default UserDrawer;
