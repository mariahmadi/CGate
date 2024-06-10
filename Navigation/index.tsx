import React, { useEffect } from 'react';
import { useAuthentication } from '../Utils/UseAuth';



import UserStack from './Userstack';
import AuthStack from './authstack';

export default function RootNavigation() {


  const { user } = useAuthentication();

  return user ? <AuthStack /> : <UserStack />;


}