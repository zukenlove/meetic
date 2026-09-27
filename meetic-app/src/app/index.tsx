import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';

export default function App() {
  const [isLoggin, setIsloggin] = useState(true)
  const showScreen = ()=>{
    setIsloggin((prev) => !prev)
  }

  const router = useRouter()
  return (
    <View style={styles.container}>
      {isLoggin ? (<LoginPage  showScreen = {showScreen}/>) : (<RegisterPage  showScreen = {showScreen}/>)}
      <Text style={{ marginTop: 30}}> @ 2001 All rights reserved</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
