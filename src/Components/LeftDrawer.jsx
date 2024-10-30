import React from "react";
import {
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
} from "@mui/material";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Close as CloseIcon } from "@mui/icons-material";

const Drawer = styled(MuiDrawer)`
  .MuiDrawer-paper {
    width: 35%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    overflow: auto;
    border-left: 1px solid #99aaff;
    border-right: 1px solid #99aaff;
    border-top: 1px solid #99aaff;
    border-bottom: 1px solid #99aaff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
`;

const StyledListItemText = styled(ListItemText)`
  .MuiTypography-root {
    color: #d3d3d3;
    font-size: 22px;
    font-family: "Belleza", sans-serif;
    margin: 0;
    margin-top: 12px;
    margin-left: 40px;
  }
`;

const HorizontalLine = styled.div`
  border-top: 1px solid #98fb98;
  width: 80%;
  margin: 10px 0;
`;

const IconWrapper = styled.div`
  color: #99aaff; 
  font-size: 24px; 
  display: flex;
  gap: 10px;
`;

const VerticalLine = styled.div`
  border-left: 2px solid #99aaff;
  height: 50px;
  margin-left: 20px;
  margin-right: 20px;
`;

const SmallText = styled.div`
  color: #999999;
  font-size: 14px;
  margin-top: 10px;
  margin: 0;
`;

const ContactInfo = styled.div`
  color: #d3d3d3;
  font-size: 14px;
  margin-top: 10px;
  margin: 0;
`;

const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 0;
  color: #99aaff; 
  padding: 8px; 
`;

const LeftDrawer = ({ open, onClose }) => {
  const navigate = useNavigate();

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ position: "relative", width: "100%" }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#99aaff",
            padding: 0,
            margin: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
        <List>
          <ListItem button onClick={() => navigate("/aboutdinebooker")}>
            <StyledListItemText primary="SOBRE NOSOTROS" />
          </ListItem>
          <ListItem button onClick={() => navigate("/dinepoints")}>
            <StyledListItemText primary="DINEPOINTS" />
          </ListItem>
          <ListItem button onClick={() => navigate("/ownerinfo")}>
            <StyledListItemText primary="TIENES UN RESTAURANTE" />
          </ListItem>

          <ListItem button onClick={() => navigate("/giftcardinfo")}>
            <StyledListItemText primary="TARGETA DE REGALO" />
          </ListItem>
          <ListItem>
            <StyledListItemText primary="RESTAURANTES" />
          </ListItem>
          <ListItem button onClick={() => navigate("/popularbarcelona")}>
            <VerticalLine />
            <StyledListItemText primary="Barcelona" />
          </ListItem>
          <ListItem button onClick={() => navigate("/popularmadrid")}>
            <VerticalLine />
            <StyledListItemText primary="Madrid" />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => navigate("/contact")}>
            <StyledListItemText primary="CONTACTO" />
          </ListItem>
          <HorizontalLine />
          <ListItem>
            <SmallText>ES EN FR IT</SmallText>
          </ListItem>
          <Divider />
          <ListItem>
            <IconWrapper>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </IconWrapper>
          </ListItem>
          <ListItem>
            <ContactInfo>infodinebooker@gmail.com</ContactInfo>
          </ListItem>
          <ListItem>
            <ContactInfo>BCN (+34) 12345678</ContactInfo>
          </ListItem>
          <ListItem>
            <ContactInfo>MAD (+34) 12345678</ContactInfo>
          </ListItem>
          <ListItem>
            <ContactInfo>© 2024 AFGROUP</ContactInfo>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default LeftDrawer;
