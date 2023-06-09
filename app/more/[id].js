import React, { useEffect, useState } from "react";
import { View, ScrollView, Text, StyleSheet, StatusBar } from 'react-native';

import { db } from './../../firebase/firebase'
import { getDoc, doc } from 'firebase/firestore'
import { useRouter, useSearchParams } from 'expo-router'


export default function More() {

    useEffect(() => {
        getData();
    }, [])

    const params = useSearchParams();
    const Key = JSON.stringify(params.id).replaceAll("\"", '').replaceAll("\\", '')

    async function getData() {
        const profileRef = doc(db, "patient_data", Key)
        const patientDataCollection = await getDoc(profileRef)
        if (patientDataCollection.exists()) {
            const tmp = patientDataCollection.data()
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
                        <ProfileText props={[Allergy, Symptoms, Curr_Med, Past_Med]} />
                    </View>
                </View>
            </ScrollView>
        </ScrollView>
    )
}

const ProfileText = ({ props }) => {
    var text = ['Allergy', 'Symptoms', 'Current Medication', 'Past Medication']
    return (
        <View>
            {
                text.map((val, i) => {
                    return (
                        <View key={i}>
                            <Text style={styles.detailsText}>{val}</Text>
                            <Text style={styles.detailsVal}>{props[i]}</Text>
                        </View>
                    )
                })
            }
        </View>
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
    detailsText: {
        color: 'lightgray',
        fontWeight: 'bold'
    },
    detailsVal: {
        color: 'rgb(10, 10, 10)',
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: '1%',
        marginLeft: '2%',
        marginBottom: '10%'
    },
})