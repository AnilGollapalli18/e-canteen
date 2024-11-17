import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useAppContext } from '../../Context/AppContext';

const MenuView = () => {
  const { menu, cart, setCart } = useAppContext();

  const addToCart = (item: string) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Browse Menu</Text>
      <FlatList
        data={menu}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text>{item}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 , height:'90%'},
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
});

export default MenuView;
