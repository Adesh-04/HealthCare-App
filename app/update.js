import React from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar } from "react-native";

export default function Update() {
    return (
        <ScrollView style={styles.container} >
            <Text>
                Update Form
            </Text>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: StatusBar.currentHeight + 5
    }
})
