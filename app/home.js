import { StyleSheet, Text, View, SafeAreaView, Button, StatusBar } from "react-native";
import { useRouter } from "expo-router";

export default function Page() {

    const router = useRouter();

    const handlePress = () => {
        router.push('profile');
    }

    return (
        <SafeAreaView style={styles.container} >
            <View style={styles.profile}>
                <Button onPress={handlePress} title="Profile" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight + 10,
    },
    profile: {

    }

});
