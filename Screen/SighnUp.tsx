import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import Constants from 'expo-constants';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();


const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
  })




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

  //  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />

      <View style={styles.contain}>
        <>
          {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

          <View style={styles.controls}>
            <>
              <View style={styles.form1}>
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
                </>
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />

                <Pressable onPress={() => navigation.navigate('Welcome')}>

                  <Text style={{ fontSize: 20, paddingTop: 30, fontWeight: 'bold', color: 'blue' }}>Go To Home</Text>

                </Pressable>
              </View>
            </>
          </View>
        </>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contain: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#93FFE8',
    padding: 50,
  },
  form1: {
    flex: 1,
    border: '4px solid red',

  },
  controls: {
    flex: 1,
    border: '2px solid rgb(134, 133, 133)'


  },

  control: {
    marginTop: 10,
    Flex: 1,
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