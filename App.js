import React from 'react';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AuthScreen from './screens/AuthScreen';
import TasksScreen from './screens/TasksScreen';

// مفتاح Clerk العام - هتحطه هنا (من لوحة تحكم Clerk)
const CLERK_PUBLISHABLE_KEY = 'ضع_مفتاحك_هنا_من_Clerk';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <NavigationContainer>
        <SignedIn>
          <Stack.Navigator>
            <Stack.Screen
              name="Tasks"
              component={TasksScreen}
              options={{ title: 'مهامي' }}
            />
          </Stack.Navigator>
        </SignedIn>
        <SignedOut>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Auth" component={AuthScreen} />
          </Stack.Navigator>
        </SignedOut>
      </NavigationContainer>
    </ClerkProvider>
  );
    }
