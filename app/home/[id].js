import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, Image, ImageBackground } from "react-native";
import { useRouter, useSearchParams } from "expo-router";
import React, { useEffect, useState } from 'react'

import { getDoc, doc } from 'firebase/firestore'
import { db, real } from './../../firebase/firebase'
import { ref, onValue } from 'firebase/database'


export default function Page() {

    useEffect(() => {
        var d = new Date().getDate()
        var m = new Date().getMonth()
        var y = new Date().getFullYear()
        setDate(d + '/' + m + '/' + y)
        getData()
    }, [])

    const router = useRouter();
    const params = useSearchParams();
    const Key = JSON.stringify(params.id).replaceAll("\"", '').replaceAll("\\", '')

    const [date, setDate] = useState('')
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')

    const [BP, setBP] = useState('??')
    const [Pulse, setPulse] = useState('??')

    const getData = async () => {
        const profileRef = doc(db, "patient_data", Key)
        const patientDataCollection = await getDoc(profileRef)
        if (patientDataCollection.exists()) {
            tmp = patientDataCollection.data()
            setName(tmp["Name"])
            setGender(tmp["Gender"])
        } else { console.log('No data found') }

        const starCountRef = ref(real, 'users/' + 'Key');
        onValue(starCountRef, (snapshot) => {
            if (snapshot.exists()) {
                setBP(snapshot.val().bp)
                setPulse(snapshot.val().pulse)
            }

        });
    }


    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.profile}>
                <TouchableOpacity onPress={() => router.push('profile/' + Key)} style={styles.profileButton}>
                    {
                        gender === 'female' ? <Image source={require('./../../assets/female.png')} style={styles.profileImg} />
                            : <Image source={require('./../../assets/male.png')} style={styles.profileImg} />
                    }

                </TouchableOpacity>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.name}>Hello, {name}!</Text>
            </View>
            <View style={styles.main}>
                <Text style={styles.mainText}>How are you feeling ?</Text>
                <View style={styles.card}>
                    <TouchableOpacity style={styles.BPcard}>
                        <Text style={styles.cardText}>Blood Pressure</Text>
                        <Image style={styles.bpImg2} source={require('./../../assets/bp.png')} />
                        <Text style={styles.result}> {BP} mmHg </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.Pcard}>
                        <Text style={styles.cardText}>Pulse</Text>
                        <Image style={styles.bpImg2} source={require('./../../assets/pulse.png')} />
                        <Text style={styles.result}> {Pulse} bpm </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.questions}>
                    <Text>Question</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 10,
        backgroundColor: 'orange',
    },
    profile: {
        color: 'black',
        height: '25%',
        paddingHorizontal: '5%',
        paddingTop: '5%'
    },
    profileButton: {
        marginBottom: '10%',
        width: '20%'
    },
    profileImg: {
        width: 70,
        height: 70,
        borderRadius: 70,
        borderColor: 'lightblue',
        borderWidth: 3
    },
    date: {
        color: 'black',
        fontSize: 13,
        fontWeight: 'bold'
    },
    name: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: '2%'
    },
    main: {
        flex: 1,
        backgroundColor: 'white',
        color: 'rgb(10,10,10)',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        paddingVertical: '10%',
        paddingHorizontal: '7%'
    },
    mainText: {
        fontSize: 25,
        marginVertical: '5%'
    },
    card: {
        marginVertical: '7%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    cardText: {
        color: 'white',
        fontWeight: 'bold'
    },
    BPcard: {
        flex: 1,
        backgroundColor: 'red',
        borderRadius: 40,
        paddingTop: '5%',
        paddingHorizontal: '7%',
    },
    bpImg2: {
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    Pcard: {
        flex: 1,
        backgroundColor: 'blue',
        borderRadius: 40,
        paddingTop: '5%',
        paddingHorizontal: '7%',
    },
    result: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: '20%',
        textAlign: 'center'
    },
    questions: {
        height: '30%',
        borderWidth: 4,
        borderColor: 'black'
    }

});
