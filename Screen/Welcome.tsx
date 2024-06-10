import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, createUserWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useAuthentication } from '../Utils/UseAuth';
const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })
  if (value.error) {
    setTimeout(() => {
      setValue({
        email: '',
        password: '',
        error: '',
      })
    }, 5000);

  }

  const { user } = useAuthentication();

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Welcome');
    } catch (error: any) {
      setValue({
        ...value,
        error: error.message
      })
    }
  }

  async function SignOut() {
    await signOut(auth)
    navigation.navigate("Welcome")

  }
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />
      {user ?
        < View style={styles.contain}>


          <View style={styles.controls}>
            < View style={{ flex: 1, alignItems: 'center' }}>
              <Button title="Sign Out" onPress={SignOut}></Button>
              <Text style={{ fontWeight: 'bold', fontSize: 17, top: 20, color: '#736AFF' }}>Welcome Back {user.email}</Text>
            </View>
          </View>



        </View> :
        <View style={styles.contain}>
          <>
            {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

            <View style={styles.controls}>
              <>

                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={{ color: 'green', fontSize: 22, fontWeight: 'bold', bottom: 15 }}>Feel Free To Sign Up</Text>
                </View>

                <View style={styles.form}>
                  <>
                    <Input
                      placeholder='Email'
                      containerStyle={styles.control}
                      value={value.email}
                      onChangeText={(text) => setValue({ ...value, email: text })}
                      leftIcon={<Icon
                        name='envelope'
                        size={16}
                      />}
                    />

                    <Input
                      placeholder='Password'
                      containerStyle={styles.control}
                      value={value.password}
                      onChangeText={(text) => setValue({ ...value, password: text })}
                      secureTextEntry={true}
                      leftIcon={<Icon
                        name='key'
                        size={16}
                      />}
                    />
                    <View style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}>
                      <>
                        <Button title="Sign up" onPress={signUp} />
                      </>
                    </View>
                  </>
                </View>
              </>

              <View style={styles.container}>

                <Pressable onPress={() => {
                  navigation.navigate("Sign In")
                }}>
                  <Text style={{ fontSize: 17, fontWeight: 'bold', color: 'blue' }}>Already Have An Account? Click Here </Text>
                </Pressable>


              </View>

            </View>
          </>
        </View>}
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  contain: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',

    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 50,
  },
  form: {
    flex: 1,
    minHeight: 130,
    height: 60


  },
  controls: {
    flex: 1,

  },

  control: {
    marginTop: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignUpScreen;
