import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, StyleSheet, StatusBar, ScrollView, Alert } from "react-native";

import { db } from './../../firebase/firebase'
import { getDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore'
import { useRouter, useSearchParams } from 'expo-router'

export default function Profile() {

    useEffect(() => {
        getData();
    }, [])

    const router = useRouter();
    const param = useSearchParams();
    const Key = JSON.stringify(param.id).replaceAll("\"", '').replaceAll("\\", '')


    async function getData() {
        const profileRef = doc(db, "patient_data", Key)
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
            setDisabled(false)
        } else { console.log('No data found') }
    }

    const [Name, setName] = useState('')
    const [Age, setAge] = useState('')
    const [Height, setHeight] = useState('')
    const [Weight, setWeight] = useState('')
    const [Gender, setGender] = useState('')
    const [Address, setAddress] = useState('')
    const [BloodGroup, setBloodGroup] = useState('')

    const [U_Age, setUAge] = useState('')
    const [U_Height, setUHeight] = useState('')
    const [U_Weight, setUWeight] = useState('')

    const [isDisabled, setDisabled] = useState(true)
    const [UpdateFunc, setUpdateFunc] = useState(false)

    const handleUpdate = () => {
        setUAge(Age)
        setUHeight(Height)
        setUWeight(Weight)
        setUpdateFunc(true)
    }

    const validateUpdate = () => {
        U_Age >= Age ?
            U_Height >= Height ?
                U_Height >= 70 && U_Height <= 300 ?
                    U_Weight >= 20 && U_Weight <= 300 ?
                        setUpdate()
                        : Alert.alert('Enter Correct Weight in kgs')
                    : Alert.alert("Enter Correct Height in cms")
                : Alert.alert('Height Should only increase')
            : Alert.alert('Age should be incremental')


    }

    const setUpdate = async () => {
        setAge(U_Age)
        setHeight(U_Height)
        setWeight(U_Weight)
        setUpdateFunc(false)

        const profileRef = doc(db, "patient_data", Key)
        await updateDoc(profileRef, {
            Age: U_Age,
            Height: U_Height,
            Weight: U_Weight,
            timestamp: serverTimestamp()
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.fancy}>
                    <Text style={styles.head_name}>
                        {Name}
                    </Text>
                </View>
                <View style={styles.main}>
                    <View style={styles.details}>{

                        UpdateFunc ?
                            <View>
                                <View>
                                    <Text style={styles.detailsText}>Age</Text>
                                    <TextInput style={styles.detailsVal} value={U_Age} color='orange' onChangeText={(e) => setUAge(e)} />
                                </View>
                                <View>
                                    <Text style={styles.detailsText}>Address</Text>
                                    <TextInput style={styles.detailsVal} editable={false} value={Address} />
                                </View>
                                <View>
                                    <Text style={styles.detailsText}>Height</Text>
                                    <TextInput style={styles.detailsVal} value={U_Height} color='orange' onChangeText={(e) => setUHeight(e)} />
                                </View>
                                <View>
                                    <Text style={styles.detailsText}>Weight</Text>
                                    <TextInput style={styles.detailsVal} value={U_Weight} color='orange' onChangeText={(e) => setUWeight(e)} />
                                </View>
                                <View>
                                    <Text style={styles.detailsText}>Gender</Text>
                                    <TextInput style={styles.detailsVal} editable={false} value={Gender} />
                                </View>
                                <View>
                                    <Text style={styles.detailsText}>BloodGroup</Text>
                                    <TextInput style={styles.detailsVal} editable={false} value={BloodGroup} />
                                </View>
                            </View>
                            : <ProfileText props={[Age, Address, Height, Weight, Gender, BloodGroup]} />
                    }
                        <Text style={styles.details_more} onPress={() => router.push('/more/' + JSON.stringify(param.id))}> More ... </Text>
                    </View>
                </View>
                <View style={styles.update}>
                    {
                        isDisabled ?
                            <Text style={styles.update_button_disabled} disabled={isDisabled} onPress={handleUpdate}>
                                Update Profile
                            </Text>
                            : UpdateFunc ?
                                <Text style={styles.update_button} onPress={validateUpdate}>
                                    Confirm
                                </Text>
                                :
                                <Text style={styles.update_button} onPress={handleUpdate}>
                                    Update Profile
                                </Text>
                    }

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}


const ProfileText = ({ props }) => {
    var text = ['Age', 'Address', 'Height', 'Weight', 'Gender', 'Blood Group']
    var pad = ['', '', 'cm', 'kg', '', '']
    return (
        <View>
            {
                text.map((item, i) => {
                    return (
                        <View key={i}>
                            <Text style={styles.detailsText}>{item}</Text>
                            <Text style={styles.detailsVal}>{props[i]}  {pad[i]}</Text>
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
        marginBottom: '15%'
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
    },
    update_button_disabled: {
        borderColor: 'white',
        borderWidth: 1,
        padding: 15,
        marginTop: '10%',
        color: 'white',
        backgroundColor: 'grey',
        borderRadius: 15
    }
})
