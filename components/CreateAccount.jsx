import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HttpServices from '../utilities/Httpservice'

export default function CreateAccount({ navigation }) {
  const [uid, setUid] = useState('')
  const [accountname, setAccName] = useState('')
  const [accountnumber, setAccNum] = useState('')
  const [bankname, setBankName] = useState('')
  const [status, setStatus] = useState('')

  useEffect(() => {
    ;(async () => {
      let idOnContract = await AsyncStorage.getItem('uniqueid')
      setUid(idOnContract)
    })()
  }, [])

  const createAccount = async () => {
    setStatus('Processing Account Detail')
    let Http = new HttpServices('/createBankAccount')
    let response = await Http.post({
      uid,
      accountnumber,
      accountname,
      bankname,
    })
    console.log(response)
    if (response.status) {
      setStatus('Details Saved Successfully!')
      navigation.navigate('Landing')
    } else {
      setStatus('An Error Has Occured on The Blockchain!')
    }
  }

  return (
    <View style={Style.form}>
      <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 34 }}>
        Enter Your Account Details.
      </Text>
      <View>
        <View>
          <Text style={Style.label}>Account Name</Text>
          <TextInput
            placeholder="Enter Your Account Name"
            style={Style.input}
            onChangeText={(text) => setAccName(text)}
            value={accountname}
          />
        </View>
        <View>
          <Text style={Style.label}>Account Number:</Text>
          <TextInput
            placeholder="Enter Your Account No."
            style={Style.input}
            onChangeText={(text) => setAccNum(text)}
            value={accountnumber}
          />
        </View>
        <View>
          <Text style={Style.label}>Bank Name:</Text>
          <TextInput
            placeholder="Enter Your Bank Name"
            style={Style.input}
            onChangeText={(text) => setBankName(text)}
            value={bankname}
          />

          {status ? (
            <Text style={{ textAlign: 'center', fontSize: 18 }}>{status}</Text>
          ) : null}
          <TouchableOpacity style={Style.btn} onPress={createAccount}>
            <Text style={{ color: '#fff' }}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

let Style = StyleSheet.create({
  form: {
    marginTop: 60,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#067766',
    height: 50,
    width: 320,
    marginBottom: 20,
    elevation: 3,
    paddingLeft: 23,
  },
  label: {
    fontSize: 16,
    color: '#067766',
  },
  btn: {
    backgroundColor: '#067766',
    width: 320,
    height: 50,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
})
