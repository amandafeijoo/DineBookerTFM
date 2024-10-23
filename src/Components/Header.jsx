// Header.js
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUser,FaInstagram, FaFacebook } from 'react-icons/fa';
import LoginUser from './LoginUser';
import { Button, Avatar } from '@mui/material';
import UserDrawer from './UserDrawer';
import { UserContext } from '../Context/UserContext';
import { useContext } from 'react';
import { OwnerContext } from '../Context/OwnerContext';
import OwnerDrawer from './OwnerDrawer/OwnerDrawer';




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
  font-size: 30px; // Ajusta esto al tamaño que desees
  color: #535bf2;
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
  gap: 10px; // Reduce el espacio entre los enlaces
  margin-right: 70px;
`;

const SocialLink = styled.a`
  color: #535bf2;
  text-decoration: none;
  display: flex; // Asegura que el contenido del enlace se alinee correctamente
  align-items: center; // Alinea verticalmente el contenido del enlace
  font-size: 1.5em; // Ajusta el tamaño del texto o íconos
  padding: 5px; // Añade padding para mejorar la alineación visual
  &:hover {
    color: #99aaff;
  }
`;

const InstagramIcon = styled(FaInstagram)`
  font-size: 24px; // Asegura que todos los íconos tengan el mismo tamaño
  display: flex;
  align-items: center;
`;

const FacebookIcon = styled(FaFacebook)`
  font-size: 24px; // Asegura que todos los íconos tengan el mismo tamaño
  display: flex;
  align-items: center;
`;


const UserIcon = styled(FaUser)`
  margin-right: 10px; // Ajusta esto según tus necesidades
  color: #535bf2;
  font-size: 20px; // Ajusta esto según tus necesidades
`;



const StyledImg = styled.img`
  margin-right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
`;



const Header = () => {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token')); // Nuevo estado para el token
  const { currentOwner, setCurrentOwner, isOwner, setIsOwner } = useContext(OwnerContext);
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
  const [ownerAccessToken, setOwnerAccessToken] = useState(localStorage.getItem('ownerAccess'));
  const [ownerRefreshToken, setOwnerRefreshToken] = useState(localStorage.getItem('ownerRefresh'));
  
  
  const getPayloadFromToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  };

  const handleAvatarClick = () => {
    console.log("Avatar button clicked"); // Agrega esto
    setDrawerOpen(prevState => {
      console.log("Updated isDrawerOpen:", !prevState);
      return !prevState;
    });
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const getUserInfo = async () => {
    const token = localStorage.getItem('userToken');
    // console.log('Getting user info with token:', userToken); // Imprime el token de usuario
    const response = await fetch('http://localhost:8000/accounts/user/', {
      headers: {
        Authorization: `Token ${userToken}`,  // Cambia Bearer a Token
        'Content-Type': 'application/json'  // Agrega el Content-Type si es necesario

      }
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('User data:', data); // Agrega esto

      setCurrentUser(data);
      setIsOwner(data.is_owner); // Actualiza el estado isOwner en LoginContext
    } else {
      console.error('Error fetching user info:', response.status, response.statusText);
      setCurrentUser(null);
      setIsOwner(false);
    }
  };

  const getOwnerInfo = async (token) => {
    console.log('Getting owner info with token:', token); // Imprime el token de propietario
    try {
      const decodedToken = getPayloadFromToken(token);
      console.log('Decoded token:', decodedToken); // Imprime el token decodificado
      const ownerId = decodedToken.user_id; // Asume que el ownerId está en el campo 'user_id' del token decodificado
      console.log('Owner ID:', ownerId); // Imprime el ID del propietario
  
      const apiUrl = `http://localhost:8000/owners/${ownerId}/`;
      console.log('API URL:', apiUrl); // Imprime la URL de la API
  
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log('Response:', response); // Imprime la respuesta de la API
  
      if (response.ok) {
        const data = await response.json();
        console.log('Received owner data:', data); // Imprime los datos del propietario
        setCurrentOwner(data);
        setIsOwner(true);
      } else {
        console.error('Error fetching owner info:', response.status, response.statusText);
        setCurrentOwner(null);
        setIsOwner(false);
      }
    } catch (error) {
      console.error('Exception while fetching owner info:', error); // Imprime cualquier error que ocurra
      setCurrentOwner(null);
      setIsOwner(false);
    }
  };

  useEffect(() => {
    console.log('Current owner:', currentOwner);
  }, [currentOwner]);

  const handleLogin = async (userToken, ownerAccess, ownerRefresh) => {
    console.log('Received tokens:', userToken, ownerAccess, ownerRefresh);
    localStorage.setItem('userToken', userToken);
    localStorage.setItem('ownerAccess', ownerAccess);
    localStorage.setItem('ownerRefresh', ownerRefresh);
    setUserToken(userToken);
    setOwnerAccessToken(ownerAccess);
    setOwnerRefreshToken(ownerRefresh);
  
    if (userToken) {
      const userInfo = await getUserInfo();
      console.log('User info after login:', userInfo);
      if (userInfo && userInfo.is_owner) {
        setCurrentOwner(userInfo);
        setCurrentUser(null);
        setIsOwner(true);
      } else {
        setCurrentUser(userInfo);
        setCurrentOwner(null);
      }
    }
  
    if (ownerAccess) {
      const ownerInfo = await getOwnerInfo(ownerAccess);
      console.log('Owner info after login:', ownerInfo);
      setCurrentOwner(ownerInfo);
      setCurrentUser(null);
      setIsOwner(true);
    }
  
    console.log('Current owner after login:', currentOwner);
    console.log('isOwner:', isOwner);
    console.log('currentOwner:', currentOwner);
  };
// Modifica estos useEffect para usar los nuevos estados de los tokens
useEffect(() => {
  const userToken = localStorage.getItem('userToken');
  const ownerAccessToken = localStorage.getItem('ownerAccess');
  console.log('User token from localStorage:', userToken);
  console.log('Owner access token from localStorage:', ownerAccessToken);
  setUserToken(userToken);
  setOwnerAccessToken(ownerAccessToken);
}, []);

useEffect(() => {
  if (userToken) {
    getUserInfo();
  }
}, [userToken]);


  const handleLoginClick = () => {
    if (currentUser) {
      setDrawerOpen(true);
    } else {
      setLoginOpen(true);
    }
  };

  
  return (
    <HeaderContainer>
      {console.log('Rendering Header:', currentUser, currentOwner, isOwner)} {/* Agrega esto */}
      <div>
        <StyledNavLink to="/" onClick={() => navigate('/')}>
          <StyledImg src="/public/images/logo.jpg" alt="Logo" /> DINEBOOKER 
        </StyledNavLink>
      </div>
      <div>
        <SocialLinks>
          <SocialLink href="https://instagram.com/yourusername">
            <InstagramIcon size={36} />
          </SocialLink>
          <SocialLink href="https://facebook.com/yourusername">
          <FacebookIcon size={36} />
          </SocialLink>
          {/* Aquí es donde decides qué botón renderizar */}
          {isOwner && currentOwner && currentOwner.first_name ? (
              <Button style={{ gap: '10px', fontFamily: "'Belleza', sans-serif", fontSize: '15px', fontWeight: 'bold', color: '#000' }} onClick={handleAvatarClick}>
                <Avatar>{currentOwner.first_name.charAt(0)}</Avatar>
                {currentOwner.first_name}
              </Button>
            ) : currentUser && currentUser.nombre ? (
              <Button style={{ gap: '10px', fontFamily: "'Belleza', sans-serif", fontSize: '15px', fontWeight: 'bold', color: '#000' }} onClick={handleAvatarClick}>
                <Avatar>{currentUser.nombre.charAt(0)}</Avatar>
                {currentUser.nombre}
              </Button>
            ) : (
              <Button onClick={handleLoginClick}>
                <UserIcon />
                Iniciar sesión
              </Button>
            )}
          <LoginUser open={isLoginOpen} onClose={() => setLoginOpen(false)} onLogin={handleLogin} />
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
