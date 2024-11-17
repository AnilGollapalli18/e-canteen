import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Order {
  id: number;
  items: string[];
  status: string;
}

interface AppContextType {
  menu: string[];
  setMenu: (menu: string[]) => void;
  cart: string[];
  setCart: (cart: string[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedMenu = await AsyncStorage.getItem('menu');
        const storedCart = await AsyncStorage.getItem('cart');
        const storedOrders = await AsyncStorage.getItem('orders');

        if (storedMenu) setMenu(JSON.parse(storedMenu));
        if (storedCart) setCart(JSON.parse(storedCart));
        if (storedOrders) setOrders(JSON.parse(storedOrders));
      } catch (error) {
        console.error('Error loading storage data:', error);
      }
    };

    loadStorageData();
  }, []); // Runs once on mount to load data

  useEffect(() => {
    // Save to AsyncStorage whenever menu, cart, or orders change
    const saveToStorage = async () => {
      try {
        await AsyncStorage.setItem('menu', JSON.stringify(menu));
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
        await AsyncStorage.setItem('orders', JSON.stringify(orders));
      } catch (error) {
        console.error('Error saving to AsyncStorage:', error);
      }
    };

    saveToStorage();
  }, [menu, cart, orders]);

  return (
    <AppContext.Provider value={{ menu, setMenu, cart, setCart, orders, setOrders }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

