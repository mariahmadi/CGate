import { View, Text, StyleSheet, Pressable, SafeAreaView, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { getAuth } from 'firebase/auth'
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackScreenProps } from '@react-navigation/stack';
import { passwordReset } from '../Utils/PasswordResetLogic';

const ForgetPassword: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const auth = getAuth()
    const [email, setemail] = useState('')
    const SendingEmail = async () => {
        await passwordReset(email)
        alert("We Sent a Link To Your Email ! Check Your Inbox")
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />

            <View style={styles.contain}>
                <>
                    <Text style={{ fontSize: 20, color: 'blue', top: 50, fontWeight: 'bold', flex: 1, alignItems: 'center' }}>Enter Your Email Address Here</Text>
                    <Input
                        placeholder='Email'
                        containerStyle={styles.control}
                        value={email}
                        onChangeText={(text) => setemail(text)}
                        leftIcon={<Icon
                            name='envelope'
                            size={16}
                        />}
                    />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <>
                            <Button title="Send" onPress={SendingEmail} />
                        </>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <>
                                    <Pressable onPress={() => navigation.navigate("Welcome")}>
                                        < Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }} > Go To Home Page</Text>
                                    </Pressable>
                                </>
                            </View>

                        </>
                    </View>
                </>
            </View >
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    contain: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 40,

    },
    control: {
        marginTop: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 100,


    }
})
export default ForgetPassword