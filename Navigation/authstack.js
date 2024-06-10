import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerItemList, DrawerItem
} from '@react-navigation/drawer';
const Stack = createStackNavigator();
import HomeScreen from '../Screen/Home';
import Welcome from '../Screen/Welcome';
import ForgetPassword from '../Screen/ForgetPassword';
import MyList from '../Screen/MyList';
import SignInScreen from '../Screen/SignIn';
import CoinScreen from '../Screen/Coin';
import Crypto from '../Screen/Crypto';
const Tab = createBottomTabNavigator()
import News from '../Screen/News';
import { createDrawerNavigator } from '@react-navigation/drawer'
import * as Linking from 'expo-linking'
const DrawerStack = createDrawerNavigator()


function CryptoCurrency() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false, headerTintColor: "blue",
      headerBackTitle: "Back",
    }} >
      <Stack.Screen name="Crypto" component={Crypto} />
      <Stack.Screen name="Coin" component={CoinScreen} />

    </Stack.Navigator >
  )
}


const CustomDrawerContent = (props) => {

  return (

    < DrawerContentScrollView  {...props}>

      <DrawerItemList {...props} />
      <DrawerItem

        label={() => (
          <Text style={styles.drawerLabelFocused}>
            Gold Price WorldWide
          </Text>
        )}
        onPress={() => Linking.openURL('https://goldprice.org/')}
        style={[styles.drawerItem]}
        icon={({ focused, color, size }) => <Ionicons color={color} size={size} name={focused ? 'analytics' : 'analytics-outline'} />}
      />
      <DrawerItem

        label={() => (
          <Text style={styles.drawerLabelFocused}>
            Gold Price In IR
          </Text>
        )}
        onPress={() => Linking.openURL('https://www.tgju.org/profile/geram18')}
        style={[styles.drawerItem]}
        icon={({ focused, color, size }) => <Ionicons color={color} size={size} name={focused ? 'balloon' : 'balloon-outline'} />}
      />
      <DrawerItem
        label={() => (
          <Text style={styles.drawerLabelFocused}>
            BTC In TradingView
          </Text>
        )} onPress={() => Linking.openURL('https://www.tradingview.com/chart/?symbol=BITSTAMP%3ABTCUSD')}
        style={[styles.drawerItem]}

        icon={({ focused, color, size }) => <Ionicons color={color} size={size} name={focused ? 'diamond' : 'diamond-outline'} />}
      />
      <DrawerItem
        label={() => (
          <Text style={styles.drawerLabelFocused}>
            BTC CoinDesk
          </Text>
        )} onPress={() => Linking.openURL('https://www.coindesk.com/price/bitcoin/')}
        style={[styles.drawerItem]}

        icon={({ focused, color, size }) => <Ionicons color={color} size={size} name={focused ? 'chevron-collapse' : 'chevron-collapse-outline'} />}
      />
      <DrawerItem
        label={() => (
          <Text style={styles.drawerLabelFocused}>
            USD In IR
          </Text>
        )} onPress={() => Linking.openURL('https://fa.navasan.net/dayRates.php?item=usd')}
        style={[styles.drawerItem]}

        icon={({ focused, color, size }) => <Ionicons color={color} size={size} name={focused ? 'bar-chart' : 'bar-chart-outline'} />}
      />

    </DrawerContentScrollView >

  )
}


function Profile() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Forget Password" component={ForgetPassword} />


    </Stack.Navigator >
  )
}


function AppDrawerStack() {
  return (
    <DrawerStack.Navigator screenOptions={{ headerTintColor: 'blue', drawerActiveTintColor: 'blue' }} drawerContent={props => < CustomDrawerContent {...props} />}>
      <DrawerStack.Screen name='Demo ' component={Authstack} options={{
        headerTitle: "", drawerIcon: ({ focused, color, size }) => { <Ionicons color={color} size={size} name={focused ? 'apps' : 'apps-outline'} /> }, headerStyle: {
          backgroundColor: '#14A3C7',
        },
      }} />


    </DrawerStack.Navigator >
  )


}
function Authstack() {
  return (

    <Tab.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold' }, tabBarItemStyle: { width: 100 }, tabBarStyle: { backgroundColor: 'powderblue', },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Fiat') {
          iconName = focused
            ? 'logo-usd'
            : 'logo-usd';
        }
        if (route.name === 'Cryptocurrency') {
          iconName = focused ? 'logo-bitcoin' : 'logo-bitcoin'
        }
        if (route.name === 'News') {
          iconName = focused ? 'newspaper' : 'newspaper';

        }
        if (route.name === 'MyList') {
          iconName = focused ? 'list' : 'list-circle';
        }
        if (route.name === 'Profile') {
          iconName = focused ? 'person-add' : 'person-add-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    >
      <Tab.Screen name="Profile" component={Profile} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Fiat" component={HomeScreen} />
      <Tab.Screen name="Cryptocurrency" component={CryptoCurrency} />
      <Tab.Screen name="MyList" component={MyList} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="News" component={News} />
    </Tab.Navigator>

  );
}
export default function AuthStack() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="AppDrawerStack" component={AppDrawerStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({

  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center'
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
})
