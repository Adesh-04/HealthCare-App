import React from "react";
import { StyleSheet, View, Text, Button } from 'react-native';
import { useRouter } from "expo-router";

export default function Welcome() {

  const router = useRouter()

  return (
    <View style={styles.welcome}>
      <Text style={styles.header}>Monitor Me </Text>

      <Text style={styles.text} >Welcome !!</Text>

      <View style={styles.login}>
        <Button title={'Login'} onPress={() => { router.push('login') }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  welcome: {
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    color: 'red',
    fontWeight: '700',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 50
  },
  text: {
    textAlign: 'center',
    fontSize: 20
  },
  login: {
    marginTop: 80
  }


})

