import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import LoginScreen from '../screens/LoginScreen';
import LoanListScreen from '../screens/LoanListScreen';
import AddLoan from '../components/AddLoan';
import LoanScreen from "../screens/LoanScreen"
import RegisterScreen from '../screens/RegisterScreen';


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (<>
      <Stack.Screen name="LoanList" component={LoanListScreen} />
      <Stack.Screen name="AddLoan" component={AddLoan} /> 
      <Stack.Screen name="LoanScreen" component={LoanScreen} />
      
        </>
        ) : (
          <>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
