import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
const auth = getAuth();
import AsyncStorage from '@react-native-async-storage/async-storage';
export function useAuthentication() {
  const [user, setUser] = React.useState<User>();

  // const saveData = async (key: string, value: any) => {
    
  //     await AsyncStorage.setItem(key, value)
      
    
  // }
  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      if (user) {

        setUser(user);
   //     saveData("NewUserID", user.uid)
      } else {
        // User is signed out
        setUser(undefined);
        //saveData("NewUserID", undefined)
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user
  };
}