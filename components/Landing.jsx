import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HttpServices from '../utilities/Httpservice'

export default function Landing({ navigation }) {
  const [bankDetails, setDetails] = useState({})
  const [isLoading, setLoading] = useState(true)
  const newAccountRoute = () => navigation.navigate('Bank')

  const check = async () => {
    let idOnContract = await AsyncStorage.getItem('uniqueid')
    console.log(idOnContract)
    let Http = new HttpServices('/fetchBankDetails')
    let response = await Http.post({ uid: idOnContract })
    console.log(response)
    if (response['0']) {
      setDetails({
        bankname: response['0'],
        accountname: response['1'],
        accountnum: response['2'],
      })
    }
    setLoading(false)
  }

  useEffect(() => {
    check()
  }, [bankDetails])

  if (isLoading) {
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
    <View>
      <View style={Style.banner}>
        <Text style={Style.bannerText}>Welcome Back!</Text>
        <Text style={Style.bannerText}>My Wallet!</Text>
      </View>
      {!bankDetails.accountname ? (
        <View style={Style.block1}>
          <Image
            source={require('./../assets/images/wallet.png')}
            style={{ resizeMode: 'stretch', width: '100%', height: 245 }}
          />
          <Text>You haven't Added Your Account Details yet!</Text>
          <TouchableOpacity style={Style.button} onPress={newAccountRoute}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>
              Create Account!
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={Style.card}>
          <Text style={Style.cardText}>{bankDetails.accountnum}</Text>
          <Text style={Style.cardText}>{bankDetails.bankname}</Text>
          <Text style={Style.cardText}>{bankDetails.accountname}</Text>
        </View>
      )}
    </View>
  )
}

const Style = StyleSheet.create({
  banner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000C66',
    height: 230,
  },

  bannerText: {
    color: '#fff',
    fontSize: 23,
    marginBottom: 12,
  },

  block1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  button: {
    height: 65,
    backgroundColor: '#000C66',
    width: 250,
    marginVertical: 30,
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    height: 270,
    width: '100%',
    backgroundColor: '#067766',
    marginTop: 40,
    borderRadius: 10,
    padding: 23,
    display: 'flex',
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 27,
    color: '#fff',
    fontWeight: 'bold',
  },
})
