import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './components/Login'
import Register from './components/Register'
import Landing from './components/Landing'
import CreateAccount from './components/CreateAccount'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator, View } from 'react-native'

export default function App() {
  const Stack = createNativeStackNavigator()
  const [isLoggedin, setLoggedStatus] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getData()
  }, [isLoggedin])

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uniqueid')
      if (value !== null) {
        setLoggedStatus(true)
      } else setLoggedStatus(false)

      setLoading(false)
    } catch (e) {
      // error reading value
    }
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Landing"
          component={Landing}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Bank"
          component={CreateAccount}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
