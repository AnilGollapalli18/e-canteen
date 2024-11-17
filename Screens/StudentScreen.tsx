import React from 'react';
import { View, Text, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
import MenuView from '../Components/Student/MenuView';
import OrderPlacement from '../Components/Student/OrderPlacement';

// Get screen width
const { width } = Dimensions.get('window');
// const { height } = Dimensions.get('window');


const StudentScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Admin navigation button */}
      <View style={styles.buttonContainer}>
        <Button title="Go to Admin Dashboard" onPress={() => navigation.navigate('Admin')} />
      </View>

      <Text style={styles.header}>Student Dashboard</Text>

      <View style={styles.row}>
        <MenuView />
        <View style={styles.sidePanel}>
          <OrderPlacement />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 5,
    height: 'auto'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '180%', // Adjust width to 180%
    alignItems: 'center',
  },
  row: {
    flexDirection: width <= 768 ? 'column' : 'row',
    justifyContent: 'space-between', // Space components evenly
    width: width > 768 ? '50%' : '100%', // For mobile, use 100% width, else 50%
    height: '60%',
  },
  sidePanel: {
    flex: 1,
    marginLeft: 10,
  },
  // Mobile responsiveness
  mobile: {
    flexDirection: 'column', // Stack components vertically in mobile view
    width: '100%', // Full width for mobile view
    height: 'auto', // Let content determine height
  },
  mobileSidePanel: {
    marginLeft: 0, // Remove margin on smaller screens
    marginTop: 20, // Add top margin for spacing
  },
  mobileButtonContainer: {
    width: '100%', // Adjust button container width to 100% on mobile
  },
});

export default StudentScreen;
