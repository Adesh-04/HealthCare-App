import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import ProfileText from "./components/profileText";

import { db } from './../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useRouter } from 'expo-router'

export default function Profile() {

    useEffect(() => {
        getData();
    }, [])


    async function getData() {
        const profileRef = doc(db, "patient_data", "2dc9c05f84e446d1a8e1")
        const patientDataCollection = await getDoc(profileRef)
        if (patientDataCollection.exists()) {
            const tmp = patientDataCollection.data()
            setName(tmp["Name"])
            setAge(tmp["Age"])
            setHeight(tmp["Height"])
            setWeight(tmp["Weight"])
            setGender(tmp["Gender"])
            setAddress(tmp["Address"])
            setBloodGroup(tmp["BloodGroup"])
        } else { console.log('No data found') }
    }

    const [Name, setName] = useState('')
    const [Age, setAge] = useState('')
    const [Height, setHeight] = useState('')
    const [Weight, setWeight] = useState('')
    const [Gender, setGender] = useState('')
    const [Address, setAddress] = useState('')
    const [BloodGroup, setBloodGroup] = useState('')

    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.fancy}>
                    <Text style={styles.head_name}>
                        {Name}
                    </Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.details}>
                        <ProfileText text={'Age'} Value={Age} />
                        <ProfileText text={'Address'} Value={Address} />
                        <ProfileText text={'Height'} Value={Height} />
                        <ProfileText text={'Weight'} Value={Weight} />
                        <ProfileText text={'Gender'} Value={Gender} />
                        <ProfileText text={'Blood Group'} Value={BloodGroup} />
                        <Text style={styles.details_more} onPress={() => router.push('/more')}> More ... </Text>
                    </View>
                </View>
                <View style={styles.update}>
                    <Text style={styles.update_button} onPress={() => router.push('/update')}>
                        Update Profile
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(252, 186, 3)'
    },
    fancy: {
        marginTop: StatusBar.currentHeight + 5,
        alignItems: 'center',
        paddingTop: '10%'
    },
    head_name: {
        fontSize: 40,
        color: 'rgb(10, 10, 10)',
        marginBottom: '20%'
    },
    main: {
        backgroundColor: 'white',
        marginHorizontal: '5%',
        borderRadius: 20
    },
    details: {
        marginLeft: '10%',
        paddingVertical: '5%'
    },
    details_more: {
        marginRight: '10%',
        marginLeft: 'auto',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'rgb(10, 10, 10)'
    },
    update: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    update_button: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        marginTop: '10%',
        color: 'white',
        backgroundColor: 'black',
        borderRadius: 15
    }
})
