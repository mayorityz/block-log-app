import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import HttpServices from '../utilities/Httpservice'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const submit = async () => {
    let http = new HttpServices('/login')
    let response = await http.post({ username, password })
    console.log(response)
    if (response.response != 'invalid credentials') {
      setStatus('Verify Your Account!')
      await AsyncStorage.setItem('uniqueid', response.response)
      navigation.navigate('Landing')
    } else {
      setStatus('Invalid Credentials!')
    }
  }

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <View>
        <TextInput
          placeholder="Username"
          style={styles.textField}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          placeholder="Password"
          style={styles.textField}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        {status ? (
          <Text style={{ textAlign: 'center', fontSize: 18 }}>{status}</Text>
        ) : null}
        <TouchableOpacity style={styles.btn} onPress={submit}>
          <Text style={{ color: '#fff' }}>LOGIN</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Don't have an account?{' '}
          <Text
            style={styles.action}
            onPress={() => navigation.navigate('Register')}
          >
            Create One
          </Text>
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textField: {
    width: 300,
    height: 50,
    backgroundColor: '#f6f6f6',
    paddingLeft: 17,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: '#000000',
    elevation: 2,
  },

  btn: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000C66',
    height: 50,
    borderRadius: 5,
    marginTop: 10,
  },
  action: {
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
})
