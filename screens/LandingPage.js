import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LandingPage({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/react-logo3x.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.headline}>Welcome to MyApp</Text>

      <View style={[styles.buttonRow, styles.giveMargine]}>
        <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, styles.signupButton]} onPress={() => navigation.navigate('SignUp')}>
           <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  logo: { width: 140, height: 140, marginBottom: 32 },
  headline: { fontSize: 24, fontWeight: '600', marginBottom: 48, color: '#333' },
  buttonRow: { flexDirection: 'row', width: '100%', justifyContent: 'space-between' },
  button: { flex: 1, padding: 14, borderRadius: 8, alignItems: 'center', marginHorizontal: 8 },
  loginButton: { backgroundColor: '#4a90e2' },
  signupButton: { backgroundColor: '#50e3c2' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  giveMargine:{marginBottom: 11},
});
