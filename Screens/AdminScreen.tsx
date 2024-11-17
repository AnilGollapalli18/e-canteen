import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import MenuManagement from '../Components/Admin/MenuManagement';
import OrderManagement from '../Components/Admin/OrderManagement';

const AdminScreen = ({ navigation }: { navigation: any }) => {
  // Get screen width to detect mobile view
  const { width } = Dimensions.get('window');
  const isMobile = width < 768; // Consider screens smaller than 768px as mobile

  return (
    <View style={styles.container}>
      {/* Student navigation button */}
      <View style={styles.buttonContainer}>
        <Button title="Go to Student Dashboard" onPress={() => navigation.navigate('Student')} />
      </View>

      <Text style={styles.header}>Admin Panel</Text>

      <View style={[styles.row, isMobile && styles.mobileRow]}>
        <MenuManagement />
        <View style={[styles.sidePanel, isMobile && styles.mobileSidePanel]}>
          <OrderManagement />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 0,
    marginLeft: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '180%', // Adjust width to 180% to give some more space
    marginBottom: 10,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row', // Display components side by side for larger screens
    justifyContent: 'space-between', // Space components evenly
    marginBottom: 20,
    width: '40%', // Adjust width to 40% of screen width for larger screens
    height: 450, // Adjust height to 60% of screen height for larger screens
  },
  mobileRow: {
    flexDirection: 'column', // Stack components vertically on mobile
    width: '100%', // Full width for mobile
    height: 'auto', // Let height adjust for mobile
  },
  sidePanel: {
    flex: 1,
    marginLeft: 20,
  },
  mobileSidePanel: {
    marginLeft: 0, // No margin on mobile
    marginTop: 20, // Add space between MenuManagement and OrderManagement for mobile
  },
});

export default AdminScreen;
