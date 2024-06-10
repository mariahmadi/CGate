import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, StatusBar, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { StackScreenProps } from '@react-navigation/stack';



const SignInScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const auth = getAuth();
  const user = auth.currentUser
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })


  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password)
      navigation.navigate("Welcome")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />

      <View style={styles.contain}>
        <>
          {value.error && <View style={styles.error}><Text>{value.error}</Text></View>}

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
              <View style={{ flex: 1, alignItems: 'center', top: 20 }}>
                <>
                  <Button title="Log In" onPress={signIn} />
                </>
                <View style={{ flex: 1, alignItems: 'center', top: 20 }}>
                  <>
                    <Pressable onPress={() => navigation.navigate("Forget Password")}>
                      < Text style={{ fontSize: 20, fontWeight: 'bold', color: 'blue' }} >Forget Password</Text>
                    </Pressable>
                  </>
                </View>
              </View>
            </>
          </View>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <>
              <Pressable onPress={() => navigation.navigate("Welcome")}>
                < Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green', }} > Go To Home Page</Text>
              </Pressable>
            </>
          </View>
        </>
      </View >
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({

  contain: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 8,

  },
  form: {
    flex: 1,
    justifyContent: 'center',
    height: 100,
    padding: 50,
    minHeight: 400
  },

  control: {
    marginTop: 10
  },

  error: {
    marginTop: 10,
    padding: 10,
    color: '#fff',
    backgroundColor: '#D54826FF',
  }
});

export default SignInScreen;

