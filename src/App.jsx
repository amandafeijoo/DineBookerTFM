// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoriteProvider } from './Context/FavoriteContext'; // Cambia esta línea
import { AppProvider } from './Context/AppProvider';
import { OwnerProvider } from './Context/OwnerContext';  // Asegúrate de actualizar esta ruta al archivo donde definiste LoginContext
import { AppContext } from './Context/AppContext';
import { useContext } from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Header from './Components/Header';
import GlobalStyle from './Components/GlobalStyle';
import styled from 'styled-components';
import Footer from './Components/Footer';
import PopularBarcelona from './Components/PopularBarcelona';
import PopularMadrid from './Components/PopularMadrid';
import GiftCard from './Components/GiftCard';
import Owner from './Components/Owner';
import About from './Components/About';
import Usage from './Components/Usage';
import RestaurantDetails from './Components/RestaurantDetails'; // Asegúrate de importar el componente
import DinePoints from './Components/DinePoints';
import DinePointsInfo from './Components/DinePointsInfo';
import DinePointsInfo2 from './Components/DinePointsInfo2';
import DownloadApp from './Components/DownloadApp';
import ReferralFriend from './Components/ReferralFriend';
import ReferralFriendinfo from './Components/ReferralFriendinfo';
import GiftCardInfo from './Components/GiftCardInfo';
import GiftCardPurchaseOptions from './Components/GiftCardPurchaseOptions';
import GiftCardInstructions from './Components/GiftCardInstructions';
import GiftCardPurchase from './Components/GiftCardPurchase';
import StepZero from './Components/StepZero';
import StepOne from './Components/StepOne';
import StepTwo from './Components/StepTwo';
import StepThree from './Components/StepThree';
import PaymentComponent from './Components/PaymentComponent';
import CartComponent from './Components/CartComponent';
import Contact from './Components/Contact';
import AboutDineBooker from './Components/AboutDineBooker';
import OwnerInfo from './Components/OwnerInfo';
import OwnerInfoDetails from './Components/OwnerInfoDetails';
import RegistrationStepper from './Components/RegistrationStepper';
import RestaurantInfoForm from './Components/RestaurantInfoForm';
import OwnerInfoForm from './Components/OwnerInfoForm';
import Confirmation from './Components/Confirmation';
import LoginUser from './Components/LoginUser';
import RegisterForm from './Components/RegisterForm';
import UserDrawer from './Components/UserDrawer';
import Reservas from './Components/Reservas';
import Favoritos from './Components/UserDrawer/Favoritos';
import DinePointsDialog from './Components/UserDrawer/DinePointsDialog';
import RecommendFriendDialog from './Components/UserDrawer/RecommendFriendDialog';
import OpinionesDialog from './Components/UserDrawer/OpinionesDialog';
import DatosPersonalesDialog from './Components/UserDrawer/DatosPersonalesDialog';
import PasswordResetForm from './Components/PasswordResetForm';
import SettingsDialog from './Components/UserDrawer/SettingsDialog';
import { UserProvider } from './Context/UserContext';
import CompletedReservation from './Components/CompletedReservation';
import Reviews from './Components/Reviews';
import GiftCardDialog from './Components/UserDrawer/GiftCardDialog';
import LoginOwner from './Components/LoginOwner';
import ReservationsDialog from './Components/OwnerDrawer/ReservationsDialog';
import RestaurantsDialog from './Components/OwnerDrawer/RestaurantsDialog';
import ReviewsDialog from './Components/OwnerDrawer/ReviewsDialog';
import RestaurantDetailsDialog from './Components/OwnerDrawer/RestaurantDetailsDialog';
import QRCodeDialog from './Components/UserDrawer/QRCodeDialog';



const AppContainer = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  overflow-x: hidden;
`;


function App() {
    
    return (
        <UserProvider>
        <AppProvider>
        <OwnerProvider>
        <AppContainer>
        <FavoriteProvider>
            <GlobalStyle />
            <Router>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/popularbarcelona" element={<PopularBarcelona/>} />
                    <Route path="/popularMadrid" element={<PopularMadrid/>} />
                    <Route path="/restaurant/:id" element={<RestaurantDetails/>} />
                    <Route path="/GiftCard" element={<GiftCard/>} />
                    <Route path="/Owner" element={<Owner/>} />
                    <Route path="/About" element={<About/>} />
                    <Route path="/Usage" element={<Usage/>} />
                    <Route path="/restaurantdetails/:id" element={<RestaurantDetails />} />
                    <Route path="DinePoints" element={<DinePoints/>} />
                    <Route path="DinePointsInfo" element={<DinePointsInfo/>} />
                    <Route path="DinePointsInfo2" element={<DinePointsInfo2/>} />
                    <Route path="DownloadApp" element={<DownloadApp/>} />
                    <Route path="ReferralFriend" element={<ReferralFriend/>} />
                    <Route path="ReferralFriendInfo" element={<ReferralFriendinfo/>} />
                    <Route path= "GiftCardInfo" element={<GiftCardInfo/>} />
                    <Route path="GiftCardPurchaseOptions" element={<GiftCardPurchaseOptions/>} />
                    <Route path="GiftCardInstructions" element={<GiftCardInstructions/>} />
                    <Route path="GiftCardPurchase" element={<GiftCardPurchase/>} />
                    <Route path="StepZero" element={<StepZero/>} />
                    <Route path="StepOne" element={<StepOne/>} />
                    <Route path="StepTwo" element={<StepTwo/>} />
                    <Route path="StepThree" element={<StepThree/>} />
                    <Route path= "PaymentComponent" element={<PaymentComponent/>} />
                    <Route path="CartComponent" element={<CartComponent/>} />
                    <Route path="Contact" element={<Contact/>} />
                    <Route path="AboutDineBooker" element={<AboutDineBooker/>} />
                    <Route path="OwnerInfo" element={<OwnerInfo/>} />
                    <Route path="OwnerInfoDetails" element={<OwnerInfoDetails/>} />
                    <Route path="RegistrationStepper" element={<RegistrationStepper/>} />
                    <Route path="OwnerInfoForm" element={<OwnerInfoForm/>} />
                    <Route path="RestaurantInfoForm" element={<RestaurantInfoForm/>} /> 
                    <Route path="Confirmation" element={<Confirmation/>} />
                    <Route path="LoginUser" element={<LoginUser/>} />
                    <Route path="RegisterForm" element={<RegisterForm/>} />
                    <Route path="UserDrawer" element={<UserDrawer/>} />
                    <Route path="Reservas" element={<Reservas/>} />
                    <Route path="Favoritos" element={<Favoritos/>} />
                    <Route path="DinePointsDialog" element={<DinePointsDialog/>} />
                    <Route path="GiftCardDialog" element={<GiftCardDialog/>} />
                    <Route path="RecommendFriendDialog" element={<RecommendFriendDialog/>} />
                    <Route path="OpinionesDialog" element={<OpinionesDialog/>} />
                    <Route path="DatosPersonalesDialog" element={<DatosPersonalesDialog/>} />
                    <Route path="PasswordResetForm" element={<PasswordResetForm/>} />
                    <Route path="SettingsDialog" element={<SettingsDialog/>} />
                    <Route path="CompletedReservation" element={<CompletedReservation/>} />
                    <Route path="Reviews" element={<Reviews/>} />
                    <Route path="LoginOwner" element={<LoginOwner/>} />
                    <Route path="ReservationsDialog" element={<ReservationsDialog/>} />
                    <Route path="RestaurantsDialog" element={<RestaurantsDialog/>} />
                    <Route path="ReviewsDialog" element={<ReviewsDialog/>} />
                    <Route path="RestaurantDetailsDialog" element={<RestaurantDetailsDialog/>} />
                    <Route path="QRCodeDialog" element={<QRCodeDialog/>} />
                </Routes>
                <Footer />
            </Router>
        </FavoriteProvider>
        </AppContainer>
        </OwnerProvider>
        </AppProvider>
        </UserProvider>
    );
}
    

export default App;
