import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../../Context/AppContext';

const OrderManagement = () => {
  const { orders, setOrders } = useAppContext();

  const updateOrderStatus = (orderId: number, status: string) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status } : order
    );
    setOrders(updatedOrders);
  };

  const renderOrder = ({ item }: { item: any }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Items: {item.items.join(', ')}</Text>
      <Text style={styles.orderText}>Status: {item.status}</Text>
      <View style={styles.button}>
      <Button
        title="Mark as Received"
        onPress={() => updateOrderStatus(item.id, 'Received')}
        color="#d0ed77"
      />
      <Button
        title="Mark as Picked"
        onPress={() => updateOrderStatus(item.id, 'Picked')}
        color="#FF9800"
      />
      <Button
        title="Mark as Prepared"
        onPress={() => updateOrderStatus(item.id, 'Prepared')}
        color="#4CAF50" 
      />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order Management</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        numColumns={4} // Adjust the number of orders per row
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 0, 
    width: '340%', // Use full width of the screen
    marginLeft:80,
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20, 
  },
  columnWrapper: {
    justifyContent: 'space-between', // Spread items evenly across the row
    marginBottom: 10, // Add spacing between rows
  },
  orderItem: {
    flex: 1, // Allow items to expand as needed
    minWidth: '25%', // Use at least 22% of the row width
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  orderText: { 
    marginBottom: 5, 
    fontSize: 16,
  },
  button:{
    padding:10,
  }
});

export default OrderManagement;
