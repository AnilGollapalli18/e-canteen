import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to store data in AsyncStorage
export const storeData = async (key: string, value: any): Promise<void> => {
  try {
    // Check if the value is a valid object
    if (value === undefined || value === null) {
      console.error('Attempting to store invalid data:', value);
      return;
    }
    
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error storing data:', error);
  }
};

// Function to get data from AsyncStorage
export const getData = async (key: string): Promise<any | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    
    // If no data found, return null
    if (value === null) {
      console.error(`No data found for key: ${key}`);
      return null;
    }
    
    return JSON.parse(value); // Safely parse the stringified data
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};

// Function to remove data from AsyncStorage
export const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
  }
};

// Function to clear all data from AsyncStorage
export const clearAllData = async (): Promise<void> => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};
