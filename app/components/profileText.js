import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function ProfileText({ text, Value }) {
    return (
        <View>
            <Text style={styles.detailsText}>{text}</Text>
            <Text style={styles.detailsVal}>{Value}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
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