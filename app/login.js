import React, { useState } from 'react'
import { View, ScrollView, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'

import { db } from './../firebase/firebase'
import { getDocs, collection } from 'firebase/firestore'
import { useRouter } from 'expo-router'

export default function Login() {

    const router = useRouter();

    const [DeviceId, setDeviceId] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, SetPassword] = useState('')
    // later make it disabled unless all entries are validated
    const [buttonDisable, setButton] = useState(false)

    let allEntries = []
    let usrs = []

    async function handleLogin() {
        await getData()
        if (usrs.includes(Email)) {
            if (Password == allEntries[usrs.indexOf(Email)].password) {
                if (DeviceId === allEntries[usrs.indexOf(Email)].id) {
                    Alert.alert("Successfully logged in.")
                    console.log("Successfully logged in.")
                    router.back()
                    router.replace('/home')
                } else { Alert.alert("Invalid Id") }
            } else { Alert.alert("Invalid password") }
        } else { Alert.alert("User Not Found") }
    }

    async function getData() {
        const loginRef = collection(db, "patient_login")
        const logindataCollection = await getDocs(loginRef)
        allEntries = logindataCollection.docs.map((doc) => ({
            ...doc.data()
        }))
        for (let i in allEntries) {
            usrs.push(allEntries[i].email)
        }
    }

    return (
        <ScrollView style={styles.container} >
            <Text style={styles.header}>Login</Text>
            <Text style={styles.smallText}>Please Sign in to continue</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Device Id</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='Enter DeviceId' placeholderTextColor="#999" color='orange' value={DeviceId} onChangeText={(e) => { setDeviceId(e) }} />
                </View>

                <Text style={styles.inputLabel}>Userid</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='Enter Email' placeholderTextColor="#999" color='orange' value={Email} onChangeText={(e) => { setEmail(e) }} />
                </View>

                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='Enter Password' placeholderTextColor="#999" color='orange' secureTextEntry={true} value={Password} onChangeText={(e) => { SetPassword(e) }} />
                </View>

                <TouchableOpacity>
                    <View style={styles.login}>
                        <Button disabled={buttonDisable} color={'orange'} onPress={() => handleLogin()} title={"       Login   -->     "} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.signin}>
                        <Button color={'orange'} onPress={() => router.push('/signin')} title={"       Sign In   -->     "} />
                    </View>
                </TouchableOpacity>

            </View>



        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '30%',
        padding: '10%'
    },
    inputContainer: {
        marginTop: '20%'
    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'orange'
    },
    smallText: {
        color: 'gray',
        fontSize: 12,
        fontWeight: 500
    },
    inputLabel: {
        marginLeft: 10,
        color: 'orange',
        fontWeight: 'bold',
        fontSize: 17
    },
    inputText: {
        marginLeft: 20
    },
    inputField: {
        marginTop: '3%',
        marginBottom: '10%',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '90%',
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 30,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    login: {
        marginLeft: 'auto',
        marginRight: '20%'
    },
    signin: {
        marginTop: '20%',
        marginLeft: 'auto',
        marginRight: '20%'
    },
})