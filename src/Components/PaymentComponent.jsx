import styled from 'styled-components';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../Context/AppContext";
import TextField from '@mui/material/TextField';
import { styled as muiStyled } from '@mui/system';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FaShoppingCart, FaTrash, FaEdit } from 'react-icons/fa';
import { Delete as TrashIcon, Edit as EditIcon } from '@mui/icons-material';
import { faCcVisa, faCcMastercard,faCcPaypal,faCcApplePay } from '@fortawesome/free-brands-svg-icons';
import CartComponent from './CartComponent';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Swal from 'sweetalert2';



const StyledImage = styled.img`
  display: block;
  max-width: 30%;
  height: auto;
  border-radius: 20px;
  border: 3px solid #8585f2;
  margin: 25px auto;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 200px;
  margin-bottom: 300px;
  padding: 20px;
 gap: 10px;
`;

const StyledTrashIcon = styled(TrashIcon)`
  color: grey;
  font-size: 80px; // Ajusta esto a tu gusto
  margin-right: 10px; // Ajusta esto a tu gusto
  margin-left: 300px; // Ajusta esto a tu gusto
  cursor: pointer;

  &:hover {
    color: #7575f5; // Ajusta esto a tu gusto
  }
`;

const StyledEditIcon = styled(EditIcon)`
  color: grey;
  font-size: 80px; // Ajusta esto a tu gusto
  margin-right: 10px; // Ajusta esto a tu gusto
  margin-left: 5px; // Ajusta esto a tu gusto
  cursor: pointer;

  &:hover {
    color: #7575f5; // Ajusta esto a tu gusto
  }
`;
const AppContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;


const OrderDetails = styled.div`
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative; // Add this to position the cart icon
  width: 100%;
  height: calc(100% - 70px); // Subtract the height of the footer and any desired space
  overflow: auto; // Add scroll when the content is too large
  margin-bottom: 50px; // Add a margin at the bottom
  margin-top: -5px; // Add a margin at the top
  box-shadow: 
  0px 4px 20px rgba(255, 105, 180, 0.5),  // Rosa
  0px 4px 20px rgba(152, 224, 152, 0.5),  // Verde
  0px 4px 20px rgba(153, 170, 255, 0.5);  // Azul
border-radius: 20px;`;

const PaymentDetails = styled.div`
  flex: 1;
  padding: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
    margin-right: 50px; // Añade un margen a la derecha
  margin-top: -200px; // Añade un margen en la parte superior
  position: relative; // Añade esto para posicionar el ícono de carrito
/* background-color: #BFE0F0 ; */
border: 3px solid #a7a7f5;
border-radius: 20px;
box-shadow: 5px 5px 5px #A6A6FF;

/* overflow: auto; // Agrega scroll cuando el contenido es demasiado grande */

`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
`;

const CartIcon = styled.div`
  position: absolute;
  top: -50px;

  right: 70px;
  color: #757575; // Cambia esto a un color más oscuro

  &:hover {
    color: #7575f5;
  }

`;

const IconContainer = styled.div`
  margin-left: 200px; // Ajusta este valor para mover los íconos a la derecha
`;
const Title = styled.h1`
  width: 100%;
  margin-top: 150px;
  text-align: center;
  color: #757575;
  font-size: 3.2em;
  text-shadow: 2px 2px 2px #A2D2FF;
  font-weight: bold; // Hace el texto más grueso
  letter-spacing: 2px; // Aumenta el espacio entre las letras
  text-transform: uppercase; // Convierte el texto a mayúsculas
  border-bottom: 2px solid #A2D2FF; // Agrega una línea debajo del título
  padding-bottom: 10px; // Agrega espacio debajo del texto
`;

const StyledButton = styled(Button)`
  background-color: #7198E0 !important;
  &:hover {
    background-color: #6868d2 !important;
  }
`;

const modalStyle = {
    position: 'fixed', // Cambiado de 'absolute' a 'fixed'
    right: '10%', // Ajusta esto según tus necesidades
    top: '10%', // Ajusta esto según tus necesidades
    width: '30%', // Ajusta esto según tus necesidades
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const CustomTextField = muiStyled(TextField)({
    '& label.Mui-focused': {
      color: '#00796b', // Dark green when focused
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00796b', // Dark green underline after focus
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#7575f5', // Blue border
      },
      '&:hover fieldset': {
        borderColor: '#4a4af5', // Darker blue on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#a7a7f5', // Lighter blue when focused
      },
      '& input': {
        fontSize: '1.2rem', // Increase font size
      },
    },
    backgroundColor: '', // Light green background    
});

const PaymentComponent = () => {
  const { order,setOrder,setActiveStep,cart,setCart } = useContext(AppContext);
  console.log('Initial order:', order);
  console.log('Initial cart:', cart);
  console.log(order);
  console.log('Cart:', cart);
  console.log('Total amount:', (cart || []).reduce((total, order) => total + Number(order.amount || 0), 0));
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);


    
    // Calcula el total del carrito
    const totalAmount = cart.reduce((total, item) => total + Number(item.amount || 0), 0);
    const handleExpiryDateChange = (event) => {
      setExpiryDate(event.target.value);
    };


    const handlePayment = (event) => {
      event.preventDefault();
    
      const regex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
      if (!regex.test(expiryDate)) {
        alert('Por favor, ingresa la fecha de vencimiento en el formato MM/YY');
        return;
      }
    
      // Obtiene el token del localStorage
      const token = localStorage.getItem('token');
      console.log("Token:", token); // Imprime el token para verificar que se está obteniendo correctamente
      console.log("Order:", order); // Imprime el pedido para verificar que se está obteniendo correctamente
    
      // Decodifica el token para obtener el userId
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const decodedToken = JSON.parse(window.atob(base64));
      const decodedUserId = decodedToken.user_id; // Cambiado a 'user_id'
      console.log("decodedUserId:", decodedUserId); // Imprime el decodedUserId para verificar que se está obteniendo correctamente
    
      if (!decodedUserId || !token) {
        return;
      }
        
      // Crea una copia del pedido actual
      const currentOrder = { ...order, userId: decodedUserId };
    
      // Verifica si 'toLastName' y 'userId' están definidos
      if (!currentOrder.toLastName || !currentOrder.userId) {
        console.error('Error: recipientLastName or user is undefined or empty');
        return;
      }
        
      // Datos de pago
      const paymentData = {
        cardHolderName,
        cardNumber,
        expiryDate,
        cvc,
      };
        
      // Envía la orden al servidor
      fetch('http://localhost:8000/accounts/giftcardpurchase/', {  // Reemplaza esta URL con la URL de tu API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Asegúrate de que estás pasando el token en el encabezado de autorización
        },
        body: JSON.stringify({
          ...paymentData,  // Agrega los datos de pago a la solicitud
          selectedImage: currentOrder.image,
          amount: currentOrder.amount,
          senderName: currentOrder.from,
          recipientName: currentOrder.to,
          recipientLastName: currentOrder.toLastName,
          email: currentOrder.email,
          deliveryTime: currentOrder.deliveryTime,
          selectedDate: currentOrder.selectedDate,
          selectedTime: currentOrder.selectedTime,
          message: currentOrder.message,
          user: currentOrder.userId,  // Asegúrate de que 'userId' es el nombre correcto del campo
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      
        // Aquí puedes obtener el order_number del objeto data
        const orderNumber = data.order_number;
        console.log('Order Number:', orderNumber);
      
        // Limpia el pedido actual
        setOrder({}); // Asegúrate de que este objeto vacío tenga la misma estructura que un objeto de pedido normal, pero con todos los campos vacíos
      
        Swal.fire({
          title: 'Pago exitoso!',
          text: 'Puedes revisar tu pedido en el perfil de usuario.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/');
            completePurchase(); // Limpia las cookies y el estado del carrito después de un pago exitoso
          }
        });
      })      
      .catch((error) => {
        console.error('Error:', error);
      });

    };
    
    const handleDelete = (index) => {
      // Elimina el pedido del carrito basado en su índice
      setCart(prevCart => {
        const newCart = prevCart.filter((item, i) => i !== index);
    
        // Si el carrito está vacío, resetea el paso a 0
        if (newCart.length === 0) {
          setStep(0);
        }
    
        return newCart;
      });
    };


  const handleEdit = () => {
    // Redirige al usuario al componente del paso 0
    navigate('/GiftCardPurchase');
  };

  const navigateToStep0 = () => {
    navigate('/giftcardpurchase');
  };


  const handleContinueShopping = () => {
      console.log('Setting active step to 0');
              setActiveStep(0);
              navigate('/GiftCardPurchase');
            };
            const theme = createTheme({
              palette: {
                primary: {
                  main: '#7575f5',
                },
              },
            });

            return (
              <>
            <StyledButton 
  variant="contained" 
  style={{ display: 'flex', flexDirection: 'column', marginTop: '160px', marginLeft: '40px', marginBottom: '-150px'}} 
  onClick={handleContinueShopping} // Cambia navigateToStep0() a handleContinueShopping
>
  Atrás
</StyledButton>
               <Title>Resumen de la Cesta</Title>
                <AppContainer>
                    <ThemeProvider theme={theme}>
                    <CartIcon>
                        <Badge badgeContent={cart.length} color="primary">
                          <FaShoppingCart size={30} onClick={() => setOpen(true)} />
                        </Badge>
                    </CartIcon>
                      <Modal
                      open={open}
                      onClose={() => setOpen(false)}
                    >
                      <Box sx={modalStyle}>
                        <CartComponent /> {/* No pasas 'order' como prop a 'CartComponent' */}
                      </Box>
                    </Modal>
                    <Container>
                    <OrderDetails>
                    {cart.map((order, index) => (
                      <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems:'center',marginBottom: '20px' }}>
                      <Typography variant="h5"style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '40px',marginTop:'20px' }}>Detalles del pedido {index + 1}:</Typography>                        <IconContainer>
                      <StyledTrashIcon onClick={() => handleDelete(index)} /> {/* Ícono de basura */}
                      <StyledEditIcon onClick={() => handleEdit(index)} /> {/* Ícono de edición */}
                        </IconContainer>
                        <StyledImage src={order.image} alt="Product" />       
                        <CustomTextField size="small" style={{ width: 400,fontFamily: "'Belleza', sans-serif" }} label="Producto" value={order.product} InputProps={{readOnly: true,}}/>
                        <CustomTextField size="small" style={{ width: 400,fontFamily: "'Belleza', sans-serif" }}label="Cantidad" value={order.amount} InputProps={{readOnly: true,}}/>
                        <CustomTextField size="small" style={{ width: 400,fontFamily: "'Belleza', sans-serif" }} label="De" value={order.from} InputProps={{readOnly: true,}}/>
                        <CustomTextField size="small" style={{ width: 400,fontFamily: "'Belleza', sans-serif" }}label="Para" value={`${order.to} ${order.toLastName}`} InputProps={{readOnly: true,}}/>
                        <CustomTextField size="small" style={{ width: 400,fontFamily: "'Belleza', sans-serif" }}label="Email" value={order.email} InputProps={{readOnly: true,}}/>
                        <CustomTextField size="small" style={{ width: 400,fontFamily: "'Belleza', sans-serif" }} label="Mensaje" value={order.message} InputProps={{readOnly: true,}}/>
                        <CustomTextField 
                          size="small"
                          style={{ width: 400 }}
                          label="Hora de entrega" 
                          value={
                            order.deliveryTime === 'now' 
                              ? 'Ahora' 
                              : `Fecha: ${order.selectedDate ? new Date(order.selectedDate).toISOString().substr(0, 10) : 'N/A'}, Hora: ${order.selectedTime ? new Date(order.selectedTime).toTimeString().substr(0, 5) : 'N/A'}`
                          } 
                          InputProps={{readOnly: true,}}
                        />                          
                        </div>
                        ))}
                      </OrderDetails>
      
                    <PaymentDetails>
                {/* Formulario de pago */}
                <Typography variant="h4"style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '20px',marginTop:'10px' }}>Facturación</Typography>
                <form onSubmit={handlePayment}>
                <Typography variant="body1"style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '10px',marginTop:'20px' }}>
                  Al continuar acepto las <a href="/terms">Términos y Condiciones de Venta</a> y <a href="/privacy">Política de privacidad</a>.
                </Typography>
                <Typography variant="h6"style={{ fontFamily: "'Belleza', sans-serif", marginBottom: '15px',marginTop:'10px' }}>Total a pagar: {totalAmount}€</Typography>
                <CustomTextField 
                    label="Nombre del titular" 
                    type="text" 
                    required 
                    value={cardHolderName} 
                    onChange={(event) => setCardHolderName(event.target.value)} 
                  />
                  <CustomTextField 
                    label="Número de tarjeta" 
                    type="text" 
                    required 
                    value={cardNumber} 
                    onChange={(event) => setCardNumber(event.target.value)} 
                  />
                    <CustomTextField 
                        label="Fecha de vencimiento (MM/YY)" 
                        type="text" 
                        required 
                        value={expiryDate} 
                        onChange={handleExpiryDateChange} 
                      />
                      <CustomTextField 
                        label="CVC" 
                        type="text" 
                        required 
                        value={cvc} 
                        onChange={(event) => setCvc(event.target.value)} 
                      />
                    <div>
                <Button type="submit" variant="contained" color="primary" style={{marginTop: '20px',marginLeft:'80px'}}>Pagar</Button>
                <Button 
                    onClick={() => {
                        if (cart && cart.length > 0) {
                        handleContinueShopping();
                        } else {
                        alert('No hay nada en el carrito');
                        }
                    }} 
                    variant="contained" 
                    color="primary" 
                    style={{marginTop: '20px',marginLeft:'20px'}}
                    >
                    Seguir comprando
                    </Button>
                
                    </div>
                    <div>
                    <FontAwesomeIcon icon={faCcPaypal} size="3x" style={{ marginTop: '10px' }} /> 
                    <FontAwesomeIcon icon={faCcApplePay} size="3x" style={{ marginTop: '10px' }} />
                    <FontAwesomeIcon icon={faCcVisa} size="3x"  style={{ marginTop: '20px' }} />
                    <FontAwesomeIcon icon={faCcMastercard} size="3x" style={{ marginTop: '20px' }} />          
                     </div>
                  </form>
                </PaymentDetails>
        </Container>
     </ThemeProvider>
 </AppContainer>
    </>
    );
};

export default PaymentComponent;