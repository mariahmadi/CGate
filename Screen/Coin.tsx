import { View, Text, Pressable, StatusBar, SafeAreaView } from 'react-native'
import React from 'react'
import { useRoute, } from '@react-navigation/native'
import { StackScreenProps } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import { Link } from '@react-navigation/native';
const CoinScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const route = useRoute()



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />

            <View style={{ flex: 1, paddingHorizontal: 10, justifyContent: 'center', backgroundColor: 'white' }} >
                <>
                    <View style={{ flex: 1, justifyContent: 'center', height: 40 }}>
                        <>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 50 }}>
                                <Link to={{ screen: 'Crypto' }} style={{ fontSize: 18, color: 'blue', paddingBottom: 8 }}>
                                    Cryptocurrency Page
                                </Link>
                                <Link to={{ screen: 'MyList' }} style={{ fontSize: 18, color: 'blue', paddingBottom: 8 }}>
                                    My List Page
                                </Link>

                            </View>
                            <View style={{ flex: 1, bottom: 30, paddingLeft: 10 }}>
                                <Text style={{ fontSize: 18, paddingBottom: 12, color: 'red', fontWeight: 'bold' }}>Name: {route.params.data.name}</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold', color: 'green' }}>Rank: {route.params.data.cmc_rank}</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Symbol: {route.params.data.symbol}</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Price : {route.params.data.quote.USD.price.toFixed(8)} USD</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Volume/Market cap (24h) : {route.params.data.quote.volume_24h}</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Circulating Supply : {route.params.data.circulating_supply.toFixed(2)}</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Maximum Supply : {route.params.data.max_supply}</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Market Cap : {route.params.data.quote.USD.market_cap.toFixed(2)} USD</Text>
                                <Text style={{ fontSize: 18, paddingBottom: 12, fontWeight: 'bold' }}>Percent Change(24h) : {route.params.data.quote.USD.percent_change_24h.toFixed(4)}</Text>
                            </View>
                            <Pressable onPress={() => Linking.openURL(`https://coinmarketcap.com/currencies/${route.params.data.name}`)}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10, bottom: 20, color: 'blue' }}>More Info </Text>
                            </Pressable>
                        </>
                    </View>

                </>
            </View>
        </SafeAreaView>
    );
};

export default CoinScreen