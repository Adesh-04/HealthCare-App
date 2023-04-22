import React, { cloneElement, useState } from 'react'
import { View, ScrollView, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert, StatusBar } from 'react-native'

import { db } from './../firebase/firebase'
import { doc, getDocs, collection, setDoc } from 'firebase/firestore'
import { useRouter } from 'expo-router'

export default function Signin() {

    const router = useRouter()

    const [inputDisabled, setDisable] = useState(true)
    const [DeviceId, setDeviceId] = useState('2dc9c05f84e446d1a8e1')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [VPassword, setVPassword] = useState('')

    ids = []

    async function getData() {
        const loginRef = collection(db, "patient_login")
        const logindataCollection = await getDocs(loginRef)
        allEntries = logindataCollection.docs.map((doc) => ({
            ...doc.data()
        }))
        for (let i in allEntries) {
            ids.push(allEntries[i].id)
        }
    }

    const verify = async () => {
        let id = DeviceId
        await getData()
        if (ids.includes(id)) {
            setDisable(false)
        }
    }

    const handleSignin = async () => {
        if (Password === VPassword) {
            await setDoc(doc(db, "patient_login", DeviceId), {
                id: DeviceId.toLowerCase().trim(),
                email: Email.toLowerCase().trim(),
                password: Password
            });
            router.back()
        }
        else {
            Alert.alert('Password Does Not Match')
        }
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Sign In</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Device Id</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='Enter DeviceId' placeholderTextColor="#999" color='orange' value={DeviceId} onChangeText={(e) => { setDeviceId(e) }} />
                </View>

                <TouchableOpacity>
                    <View style={styles.verify}>
                        <Button color={'orange'} onPress={() => verify()} title={"  Verify "} />
                    </View>
                </TouchableOpacity>

                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='Enter Email' placeholderTextColor="#999" color='orange' value={Email} onChangeText={(e) => { setEmail(e) }} />
                </View>

                <Text style={styles.inputLabel}>Password</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='Enter Password' placeholderTextColor="#999" color='orange' secureTextEntry={true} value={Password} onChangeText={(e) => { setPassword(e) }} />
                </View>

                <Text style={styles.inputLabel}>Confirm Password</Text>
                <View style={styles.inputField}>
                    <TextInput style={styles.inputText} placeholder='ReEnter Password' placeholderTextColor="#999" color='orange' secureTextEntry={true} value={VPassword} onChangeText={(e) => { setVPassword(e) }} />
                </View>

                <TouchableOpacity>
                    <View style={styles.signin}>
                        <Button disabled={inputDisabled} color={'orange'} onPress={() => handleSignin()} title={"       Sign Up   -->     "} />
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
    verify: {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '5%'
    },
    signin: {
        marginLeft: 'auto',
        marginRight: '20%'
    },
})