import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaUser, FaInstagram, FaFacebook } from "react-icons/fa";
import LoginUser from "./LoginUser";
import { Button, Avatar } from "@mui/material";
import UserDrawer from "./UserDrawer";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { OwnerContext } from "../Context/OwnerContext";
import OwnerDrawer from "./OwnerDrawer/OwnerDrawer";
import LeftDrawer from "./LeftDrawer";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const RegisterButton = styled(NavLink)`
  text-decoration: none;
  padding: 10px 20px;
  border: 2px solid #fadadd;
  color: #535bf2;
  font-size: 16px;
  border-radius: 5px;

  background-color: transparent;
  &:hover {
    background-color: #535bf2;
    color: white;
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #d0ff94;
  z-index: 100;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0 10px;
  font-size: 37px; 
  color: #535bf2;
  margin-left: 30px; 
  font-family: "Belleza", sans-serif;
  display: flex;
  align-items: center;
  &:hover {
    color: #99aaff;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; 
  margin-right: 10px;
`;

const SocialLink = styled.a`
  color: #535bf2;
  text-decoration: none;
  display: flex; 
  align-items: center; 
  font-size: 1.5em;
  padding: 5px;
  &:hover {
    color: #99aaff;
  }
`;

const InstagramIcon = styled(FaInstagram)`
  font-size: 24px; 
  display: flex;
  align-items: center;
`;

const FacebookIcon = styled(FaFacebook)`
  font-size: 24px; 
  display: flex;
  align-items: center;
`;

const UserIcon = styled(FaUser)`
  margin-right: 10px; 
  color: #99aaff;
  font-size: 20px; 
`;

const StyledImg = styled.img`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const MenuIconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 24px;
`;

const Bar = styled.div`
  height: 3px;
  background-color: #99aaff;
  border-radius: 2px;

  &:nth-child(1) {
    width: 12px; 
  }

  &:nth-child(2) {
    width: 22px; 
  }

  &:nth-child(3) {
    width: 40px; 
  }
`;

const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { currentOwner, setCurrentOwner, isOwner, setIsOwner } =
    useContext(OwnerContext);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [ownerAccessToken, setOwnerAccessToken] = useState(
    localStorage.getItem("ownerAccess")
  );
  const [ownerRefreshToken, setOwnerRefreshToken] = useState(
    localStorage.getItem("ownerRefresh")
  );
  const [userAccessToken, setUserAccessToken] = useState(
    localStorage.getItem("userAccess")
  );
  const [userRefreshToken, setUserRefreshToken] = useState(
    localStorage.getItem("userRefresh")
  );
  const [isLeftDrawerOpen, setLeftDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const toggleLeftDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setLeftDrawerOpen(open);
  };

  const getPayloadFromToken = (token) => {
    if (!token) {
      console.error("Token is undefined or null");
      return null;
    }

    const base64Url = token.split(".")[1];
    if (!base64Url) {
      console.error("Invalid token format");
      return null;
    }

    try {
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  const handleAvatarClick = () => {
    console.log("Avatar button clicked");
    setDrawerOpen((prevState) => {
      console.log("Updated isDrawerOpen:", !prevState);
      return !prevState;
    });
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleLeftDrawerClose = () => {
    setLeftDrawerOpen(false);
  };

  const getUserInfo = async () => {
    const accessToken = localStorage.getItem("userAccess");

    if (!accessToken) {
      console.error("No access token found");
      setCurrentUser(null);
      setIsOwner(false);
      return;
    }

    console.log("Getting user info with token:", accessToken);

    try {
      const response = await fetch("http://localhost:8000/accounts/user/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User data:", data);
        setCurrentUser(data);
        setIsOwner(data.is_owner);
      } else {
        console.error(
          "Error fetching user info:",
          response.status,
          response.statusText
        );
        setCurrentUser(null);
        setIsOwner(false);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setCurrentUser(null);
      setIsOwner(false);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  console.log("Rendering Header:", currentUser, isOwner);

  const getOwnerInfo = async (token) => {
    console.log("Getting owner info with token:", token);
    try {
      const decodedToken = getPayloadFromToken(token);
      console.log("Decoded token:", decodedToken);
      const ownerId = decodedToken.user_id;
      console.log("Owner ID:", ownerId);

      const apiUrl = `http://localhost:8000/owners/${ownerId}/`;
      console.log("API URL:", apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response:", response);

      if (response.ok) {
        const data = await response.json();
        console.log("Received owner data:", data);
        setCurrentOwner(data);
        setIsOwner(true);
      } else {
        console.error(
          "Error fetching owner info:",
          response.status,
          response.statusText
        );
        setCurrentOwner(null);
        setIsOwner(false);
      }
    } catch (error) {
      console.error("Exception while fetching owner info:", error);
      setCurrentOwner(null);
      setIsOwner(false);
    }
  };

  useEffect(() => {
    console.log("Current owner:", currentOwner);
  }, [currentOwner]);

  useEffect(() => {
    console.log("Current user:", currentUser);
  }, [currentUser]);

  const handleLogin = async (
    userAccess,
    userRefresh,
    ownerAccess,
    ownerRefresh
  ) => {
    console.log(
      "Received tokens:",
      userAccess,
      userRefresh,
      ownerAccess,
      ownerRefresh
    );
    localStorage.setItem("userAccess", userAccess);
    localStorage.setItem(
      "userRefresh",
      typeof userRefresh === "string"
        ? userRefresh
        : JSON.stringify(userRefresh)
    );
    localStorage.setItem("ownerAccess", ownerAccess);
    localStorage.setItem(
      "ownerRefresh",
      typeof ownerRefresh === "string"
        ? ownerRefresh
        : JSON.stringify(ownerRefresh)
    );

    setUserAccessToken(userAccess);
    setUserRefreshToken(userRefresh);
    setOwnerAccessToken(ownerAccess);
    setOwnerRefreshToken(ownerRefresh);

    if (userAccess) {
      await getUserInfo();
    }
    if (ownerAccess) {
      await getOwnerInfo(ownerAccess);
    }
    console.log("Current owner after login:", currentOwner);
    console.log("isOwner:", isOwner);
    console.log("currentOwner:", currentOwner);
  };

  useEffect(() => {
    if (userAccessToken) {
      console.log("User access token found:", userAccessToken);
      getUserInfo();
    }
  }, [userAccessToken]);
  useEffect(() => {
    if (ownerAccessToken) {
      getOwnerInfo(ownerAccessToken);
    }
  }, [ownerAccessToken]);

  const handleLoginClick = () => {
    if (currentUser) {
      setDrawerOpen(true);
    } else {
      setLoginOpen(true);
    }
  };

  const handleOwnerLoginClick = () => {
    navigate("/loginowner");
  };

  return (
    <HeaderContainer>
      <LogoContainer>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleLeftDrawer(true)}
        >
          <MenuIconWrapper>
            <Bar />
            <Bar />
            <Bar />
          </MenuIconWrapper>
        </IconButton>
        <StyledNavLink to="/" onClick={() => navigate("/")}>
          DINEBOOKER
        </StyledNavLink>
      </LogoContainer>
      <LeftDrawer open={isLeftDrawerOpen} onClose={handleLeftDrawerClose} />
      <RegisterButton to="/ownerinfoform">
        REGISTRAR MI RESTAURANTE
      </RegisterButton>
      <div>
        <SocialLinks>
          <SocialLink href="https://instagram.com/yourusername">
            <InstagramIcon size={36} />
          </SocialLink>
          <SocialLink href="https://facebook.com/yourusername">
            <FacebookIcon size={36} />
          </SocialLink>
          {isOwner && currentOwner && currentOwner.first_name ? (
            <Button
              style={{
                gap: "10px",
                fontFamily: "'Belleza', sans-serif",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
              onClick={handleAvatarClick}
            >
              <Avatar>{currentOwner.first_name.charAt(0)}</Avatar>
              {currentOwner.first_name}
            </Button>
          ) : currentUser && currentUser.first_name ? (
            <Button
              style={{
                gap: "10px",
                fontFamily: "'Belleza', sans-serif",
                fontSize: "15px",
                fontWeight: "bold",
                color: "#000",
              }}
              onClick={handleAvatarClick}
            >
              <Avatar>{currentUser.first_name.charAt(0)}</Avatar>
              {currentUser.first_name}
            </Button>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                onClick={handleLoginClick}
                sx={{
                  display: "flex",
                  fontFamily: "'Belleza', sans-serif",
                  alignItems: "center",
                  textDecoration: "none",
                  padding: "5px 10px",
                  border: "2px solid #FADADD",
                  color: "#535bf2",
                  fontSize: "16px",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#535bf2",
                    color: "white",
                  },
                }}
              >
                <UserIcon sx={{ marginRight: "5px" }} />
                Iniciar sesión
              </Button>
              <Button
                onClick={handleOwnerLoginClick}
                sx={{
                  textDecoration: "none",
                  fontSize: "10px",
                  fontFamily: "'Belleza', sans-serif",
                  padding: "0px 5px",
                  border: "2px solid #FADADD",
                  color: "#535bf2",
                  borderRadius: "5px",
                  backgroundColor: "transparent",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "#535bf2",
                    color: "white",
                  },
                }}
              >
                Iniciar sesión propietario
              </Button>
            </div>
          )}
          <LoginUser
            open={isLoginOpen}
            onClose={() => setLoginOpen(false)}
            onLogin={handleLogin}
          />
        </SocialLinks>
      </div>
      {isOwner ? (
        <OwnerDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
      ) : (
        <UserDrawer open={isDrawerOpen} onClose={handleDrawerClose} />
      )}
    </HeaderContainer>
  );
};

export default Header;
