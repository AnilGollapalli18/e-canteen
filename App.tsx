import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import AdminScreen from './Screens/AdminScreen';
import StudentScreen from './Screens/StudentScreen';

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null); // Start with null

  useEffect(() => {
    const loadInitialRoute = async () => {
      try {
        const lastScreen = await AsyncStorage.getItem('lastScreen');
        if (lastScreen) {
          setInitialRoute(lastScreen);
        } else {
          setInitialRoute('Student'); // Default to Student if no last screen is found
        }
      } catch (error) {
        console.log('Error fetching last screen', error);
        setInitialRoute('Student'); // Fallback to Student on error
      }
    };

    loadInitialRoute();
  }, []);

  // Handle screen change and store the last screen in AsyncStorage
  const handleScreenChange = async (screen: string) => {
    try {
      await AsyncStorage.setItem('lastScreen', screen);
    } catch (error) {
      console.log('Error saving screen', error);
    }
  };

  // Render only after initialRoute is set
  if (initialRoute === null) {
    return null; // Wait until AsyncStorage loads
  }

  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute}>
          <Stack.Screen
            name="Admin"
            component={AdminScreen}
            listeners={{
              focus: () => handleScreenChange('Admin'),
            }}
          />
          <Stack.Screen
            name="Student"
            component={StudentScreen}
            listeners={{
              focus: () => handleScreenChange('Student'),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
