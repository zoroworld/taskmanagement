// navigation/RootNavigator.tsx
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LandingPage from '../screens/LandingPage';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignUpPage';
import TaskScreen from '../screens/TaskScreen';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  SignUp: undefined;
  Tasks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Stack for users not logged in
function UnauthenticatedStack({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingPage} />
      
      <Stack.Screen name="Login">
        {props => (
          <LoginPage
            {...props}
            onLoginSuccess={() => setIsAuthenticated(true)}
          />
        )}
      </Stack.Screen>
     
      <Stack.Screen name="SignUp" component={SignUpPage} />
    </Stack.Navigator>
  );
}

// Stack for users already logged in
function AuthenticatedStack({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (value: boolean) => void;
}) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Tasks">
        {(props) => (
          <TaskScreen
            {...props}
            onLogout={() => setIsAuthenticated(false)}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // No <View> or extra container here; just return the appropriate navigator
  return isAuthenticated ? (
    <AuthenticatedStack setIsAuthenticated={setIsAuthenticated}/>
  ) : (
    <UnauthenticatedStack setIsAuthenticated={setIsAuthenticated} />
  );
}
