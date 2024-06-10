import React from 'react';
import './firebase'
import { ThemeProvider } from 'react-native-elements';
import RootNavigation from './Navigation';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
function App() {
  return (

    <GestureHandlerRootView style={{ flex: 1 }}>
      <RootNavigation />
    </GestureHandlerRootView >
  );
}
export default App
