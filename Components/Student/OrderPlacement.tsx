import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Dimensions } from 'react-native';
import { useAppContext } from '../../Context/AppContext';
import { storeData, getData } from '../../Utils/Storage';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const OrderPlacement = () => {
  const { cart, setCart, orders, setOrders } = useAppContext();

  useEffect(() => {
    const fetchCartData = async () => {
      const savedCart = await getData('cart');
      if (savedCart) {
        setCart(savedCart);
      }
    };

    fetchCartData();
  }, [setCart]);

  const removeFromCart = (item: string) => {
    const updatedCart = cart.filter((cartItem) => cartItem !== item);
    setCart(updatedCart);
    storeData('cart', updatedCart);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Error', 'Your cart is empty!');
      return;
    }

    const newOrder = {
      id: Date.now(),
      items: [...cart],
      status: 'Pending',
    };

    const updatedOrders = [...orders, newOrder];
    setOrders(updatedOrders);
    setCart([]);
    storeData('cart', []);
    Alert.alert('Success', 'Order placed successfully!');
  };

  const renderOrder = ({ item }: { item: any }) => (
    <View style={styles.orderItemContainer}>
      <Text>Order ID: {item.id}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Items: {item.items.join(', ')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cartAndOrdersContainer}>
        {/* Cart Section */}
        <View style={styles.cartContainer}>
          <Text style={styles.title}>Your Cart</Text>
          {cart.length > 0 ? (
            <FlatList
              data={cart}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.cartItemContainer}>
                  <Text style={styles.cartItem}>{item}</Text>
                  <Button title="Remove" onPress={() => removeFromCart(item)} color="red" />
                </View>
              )}
            />
          ) : (
            <Text>Your cart is empty</Text>
          )}
          <Button title="Place Order" onPress={placeOrder} disabled={cart.length === 0} />
        </View>

        {/* Orders Section */}
        <View style={styles.ordersContainer}>
          <Text style={styles.title}>Your Orders</Text>
          {orders.length > 0 ? (
            <FlatList
              data={orders}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderOrder}
              numColumns={width <= 768 ? 1 : 4} // Display orders in a column for mobile view
              columnWrapperStyle={styles.ordersRow}
            />
          ) : (
            <Text>No orders placed yet.</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  cartAndOrdersContainer: {
    flexDirection: width <= 768 ? 'column' : 'row', // Stack cart and orders for mobile view
    justifyContent: 'space-between',
  },
  cartContainer: {
    width: width <= 768 ? '100%' : '68%', // Adjust width for mobile view
    marginRight: width <= 768 ? 0 : 50, // Remove margin for mobile view
    height: height <= 768 ? 440 : 50, // Fixed height as 50% of the parent container
    overflow: 'hidden', // Ensures no content spills outside the container
    borderColor: '#ccc', // Optional: Border color
  },
  ordersContainer: {
    width: width <= 768 ? '100%' : '250%', // Full width for mobile view
    height: height <= 768 ? 440 : 50 , // Fixed height as 50% of the parent container
    overflow: 'hidden', // Ensures no content spills outside the container
    borderWidth: 1, // Optional: For visualization
    borderColor: '#eb9c34', // Optional: Border color
    padding: 10,
    borderRadius:5
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  cartItemContainer: {
    flexDirection: width <= 768 ? 'column' : 'row', // Stack items in column for mobile
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  cartItem: { fontSize: 16 },
  ordersRow: {
    justifyContent: 'space-between', // Spread out orders in a row
    marginBottom: 10,
  },
  orderItemContainer: {
    width: width <= 768 ? '100%' : '23%', // Adjust for 1 order per row on mobile
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
  },
});

export default OrderPlacement;
