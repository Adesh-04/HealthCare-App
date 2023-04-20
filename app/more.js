import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';
import ProfileText from "./components/profileText";

import { db } from './../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useRouter } from 'expo-router'


export default function More() {

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const profileRef = doc(db, "patient_data", "11e92eb80f6e4ba48e16")
        const patientDataCollection = await getDoc(profileRef)
        if (patientDataCollection.exists()) {
            const tmp = patientDataCollection.data()
            console.log(tmp)
            setProfileItems(tmp)
            setAllergy(Object.values(tmp['Allergy']))
            setCurr_Med(Object.values(tmp['Curr_Med']))
            setPast_Med(Object.values(tmp['Past_Med']))
            setSymptoms(Object.values(tmp['Symptoms']))

        } else { console.log('No data found') }
    }

    const [profileItems, setProfileItems] = useState({})

    const [Allergy, setAllergy] = useState([])
    const [Curr_Med, setCurr_Med] = useState([])
    const [Past_Med, setPast_Med] = useState([])
    const [Symptoms, setSymptoms] = useState([])


    const router = useRouter();

    return (
        <ScrollView style={styles.container}>
            <ScrollView>
                <View style={styles.fancy}>
                    <Text style={styles.head_name}>
                        More Information
                    </Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.details}>
                        <ProfileText text={'Allergy'} Value={Allergy} />
                        <ProfileText text={'Symptoms'} Value={Symptoms} />
                        <ProfileText text={'Current Medication'} Value={Curr_Med} />
                        <ProfileText text={'Past Medication'} Value={Past_Med} />
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 5,
        backgroundColor: 'rgb(252, 186, 3)'
    },
    fancy: {
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
})