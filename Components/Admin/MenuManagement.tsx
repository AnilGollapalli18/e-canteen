import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList } from 'react-native';
import { useAppContext } from '../../Context/AppContext';

const MenuManagement = () => {
  const { menu, setMenu } = useAppContext();
  const [newItem, setNewItem] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const addMenuItem = () => {
    if (newItem.trim()) {
      if (editIndex !== null) {
        // Update the item if in edit mode
        const updatedMenu = [...menu];
        updatedMenu[editIndex] = newItem.trim();
        setMenu(updatedMenu);
        setEditIndex(null);
      } else {
        // Add a new item if not in edit mode
        setMenu([...menu, newItem.trim()]);
      }
      setNewItem('');
    }
  };

  const deleteMenuItem = (index: number) => {
    setMenu(menu.filter((_, i) => i !== index));
  };

  const editMenuItem = (index: number) => {
    setNewItem(menu[index]);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu Management</Text>
      <FlatList
        data={menu}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <Text>{item}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Edit" onPress={() => editMenuItem(index)} />
              <Button title="Delete" onPress={() => deleteMenuItem(index)} />
            </View>
          </View>
        )}
      />
      <TextInput
        placeholder="Add or edit a menu item"
        style={styles.input}
        value={newItem}
        onChangeText={setNewItem}
      />
      <Button
        title={editIndex !== null ? 'Update Item' : 'Add Item'}
        onPress={addMenuItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  title: { fontSize: 25, fontWeight: 'bold', marginBottom: 10 },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, width: 230 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: 120 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
});

export default MenuManagement;
