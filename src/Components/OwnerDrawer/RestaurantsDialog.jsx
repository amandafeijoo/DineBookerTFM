import { Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import RestaurantDetailsDialog from './RestaurantDetailsDialog';

const RestaurantsDialog = ({ open, onClose }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    if (open) {
      const fetchRestaurants = async () => {
        try {
          const accessToken = localStorage.getItem('access');

          const response = await fetch('http://localhost:8000/owner-restaurants/', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            setRestaurants(data);
            console.log('Restaurants:', data);
          } else {
            const text = await response.text();
            console.log('Response text:', text);
            throw new Error('The server response is not JSON.');
          }
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      };

      fetchRestaurants();
    }
  }, [open]);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    onClose(); 
  };

  const handleUpdateRestaurant = (updatedRestaurant) => {
    setRestaurants(restaurants.map(r => r.id === updatedRestaurant.id ? updatedRestaurant : r));
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <Typography 
          variant="h2"  
          style={{ 
            fontFamily: "'Belleza', sans-serif", 
            marginBottom: '30px', 
            marginTop: '20px', 
            color: '#000000', 
            fontWeight: 'bold',
            fontSize: '2.7rem', 
            textDecoration: 'underline',
            textDecorationColor: 'transparent', 
            backgroundImage: 'linear-gradient(to right, #ff69b4, #98e098, #99aaff)', 
            backgroundSize: '70% 4px', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center 100%', 
            textAlign: 'center'
          }}
        >
          Tus Restaurantes
        </Typography>
        <DialogContent>
          <List>
            {restaurants.map(restaurant => (
              <ListItem key={restaurant.id} button onClick={() => handleRestaurantClick(restaurant)}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: '#99aaff' }}>
                    <RestaurantIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={restaurant.name}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      {selectedRestaurant && (
        <RestaurantDetailsDialog
          open={Boolean(selectedRestaurant)}
          onClose={() => setSelectedRestaurant(null)}
          restaurant={selectedRestaurant}
          onUpdate={handleUpdateRestaurant}
        />
      )}
    </>
  );
};

export default RestaurantsDialog;