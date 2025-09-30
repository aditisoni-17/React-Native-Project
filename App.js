
import {Text, View } from 'react-native';
import LoginScreen from './src/LoginSignupScreen/LoginScreen';
import SignupScreen from './src/LoginSignupScreen/SignupScreen';
import SignupNextScreen from './src/LoginSignupScreen/SignupNextScreen';
import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </View>
  );
}