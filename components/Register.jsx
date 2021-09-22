import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import HttpServices from '../utilities/Httpservice'

export default function Register({ navigation }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [msg, setMsg] = useState('')

  const register = async () => {
    setMsg('Creating Account')

    if (password !== password2) return setMsg('Password Mismatch')

    let Http = new HttpServices('/createAccount')
    let response = await Http.post({ username, password })
    if (response.status) {
      setMsg('Account Created Successfully.')
      navigation.navigate('Login')
    } else {
      setMsg(response.response)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Create An Account.</Text>
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
        <TextInput
          placeholder="Repeat Password"
          style={styles.textField}
          onChangeText={(text) => setPassword2(text)}
          value={password2}
        />
        {msg ? <Text style={{ textAlign: 'center' }}>{msg}</Text> : null}
        <TouchableOpacity style={styles.btn} onPress={register}>
          <Text style={{ color: '#fff' }}>REGISTER</Text>
        </TouchableOpacity>
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          Already Own An Account?{' '}
          <Text
            style={styles.action}
            onPress={() => navigation.navigate('Login')}
          >
            Login
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
    marginTop: 30,
  },
  action: {
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
})
