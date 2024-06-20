import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, StatusBar, SafeAreaView, TouchableOpacity, Pressable, Dimensions, RefreshControl, Touchable } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import axios from 'axios';
import Constants from 'expo-constants'
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, onValue, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const Crypto: React.FC<StackScreenProps<any>> = ({ navigation }) => {

    const db = getDatabase()
    const auth = getAuth();
    const user = auth.currentUser;
    const Uid = user?.uid

    interface CoinData {
        id?: number,
        name: string,
        symbol?: string,
        circulating_supply: number,
        cmc_rank: number,
        date_added: string,
        infinite_supply: boolean,
        last_updated: string,
        max_supply: number,
        num_market_pairs: number,
        platform: string,
        quote: {
            USD: {
                fully_diluted_market_cap: number,
                price: number,
                volume_24h: number,
                volume_change_24h: number,
                percent_change_1h: number,
                percent_change_24h: number,
                percent_change_7d: number,
                percent_change_30d: number,
                percent_change_60d: number,
                percent_change_90d: number,
                market_cap: number,
                market_cap_dominance: number,
                tvl: null,
                last_updated: string
            },
        },
    }



    const CoinClicked = (data: CoinData) => {

        navigation.navigate("Coin",
            {
                data: data
            })
    }

    const selectCoin = async (data: CoinData) => {
        if (typeof data.id === 'number' && !user) {
            alert("Please Log in To Use This Feature")

        }
        if (typeof data.id === 'number' && user) {

            if (news.indexOf(data.id) > -1) {

                let removeItemIndex = news.indexOf(data.id)
                news.splice(removeItemIndex, 1)
                setnews(news)
            }
            else {
                news.push(data.id as number)


            }
            set(ref(db, "SelectedCoin/" + Uid), {
                id: news
            })
            GetApi()
        }

    }

    const Item = ({ data }: { data: CoinData }) => (


        < Pressable onPress={() => CoinClicked(data)
        }>
            <View style={{ flex: 1, bottom: 5, height: 35, width: '100%' }}>
                <>
                    <Text style={styles.item}>
                        <>

                            <Pressable onPress={() => selectCoin(data)}>
                                <View style={{ paddingBottom: 5, paddingLeft: 5, width: 30 }}>
                                    <AntDesign name="star" size={18} color={news?.indexOf(data.id as number) != -1 ? "black" : "lightblue"} />
                                </View>
                            </Pressable>

                            <View style={{ width: 25 }} >
                                <Text style={styles.item}>
                                    {data.cmc_rank}
                                </Text>
                            </View>

                            <View style={{ flex: 4, width: 165 }} >
                                <Text style={styles.name}>
                                    {data.name}
                                </Text>
                            </View>

                            <View style={{ flex: 5, width: 100, paddingLeft: 2 }} >
                                <Text style={styles.item}>
                                    $ {data.quote.USD.price > 1 ? data.quote.USD.price.toFixed(2) : data.quote.USD.price < 0.01 ? data.quote.USD.price.toFixed(7) : data.quote.USD.price.toFixed(4)}
                                </Text>
                            </View>
                            {
                                data.quote.USD.percent_change_24h > 0 ?

                                    <View style={{ flex: 6, width: 70, alignItems: 'center' }} >
                                        <Text style={styles.Up}>
                                            {data.quote.USD.percent_change_24h.toFixed(2)} %
                                        </Text>
                                    </View> :
                                    <View style={{ flex: 6, width: 70, alignItems: 'center' }} >
                                        <Text style={styles.Down}>
                                            {data.quote.USD.percent_change_24h.toFixed(2)} %
                                        </Text>
                                    </View>

                            }

                        </>

                    </Text>

                </>
            </View>
        </Pressable >

    );
    const [api, setapi] = useState(null)

    const [news, setnews] = useState<number[]>([])



    useEffect(() => {

        const GetInitialValue = async () => {

            const saved = ref(db, 'SelectedCoin/' + Uid + '/id')
            onValue(saved, (snapshot) => {
                let data = snapshot.val()


                if (data !== null) {
                    setnews(data)
                }
            })
        }
        GetInitialValue();
    }, [])

    const GetApi = async () => {

        const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { headers: { 'X-CMC_PRO_API_KEY': `${Constants?.expoConfig?.extra?.CMC_API}` } })
        setapi(response.data.data)

    }

    return (


        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />
            <View style={styles.container}>

                <>
                    {!api && <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#8B008B', bottom: 20 }}>Click To Know About Top 100 Cryptocurrency!</Text>
                    }
                    {!api ?
                        <Button title="Get Price" buttonStyle={styles.button} onPress={() => GetApi()}></Button>
                        :
                        <Button title="Refresh" buttonStyle={styles.button} onPress={() => GetApi()}></Button>

                    }

                    <View style={{ paddingTop: 20, width: '100%' }}>
                        {api && (<>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', bottom: 5, color: '#00BFFF' }}>     Rank  Name                                   Price                   24h %</Text>

                            <FlatList
                                initialNumToRender={5}
                                data={api}
                                renderItem={({ item }) => <Item data={item} />}
                                keyExtractor={(item) => item.id}
                                onRefresh={() => {
                                    GetApi()
                                }}
                                refreshing={false}
                            />
                        </>)}
                    </View>
                </>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        width: '100%',
        height: '100%',

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },

    item: {
        backgroundColor: "#EBF4FA",
        borderRadius: 8,
        color: "black",
        padding: 2,
        margin: 2,
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%'
    },
    name: {
        backgroundColor: "#EBF4FA",
        borderRadius: 8,
        color: "black",
        padding: 2,
        margin: 2,
        fontWeight: 'bold',
        fontSize: 14,
        width: '100%'
    },

    Up: {
        backgroundColor: "#EBF4FA",
        borderRadius: 8,
        color: "green",
        padding: 2,
        margin: 2,
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 8
    },
    Down: {
        backgroundColor: "#EBF4FA",
        borderRadius: 8,
        color: "red",
        padding: 2,
        margin: 2,
        fontWeight: 'bold',
        fontSize: 15
    },
    buttons: {
        flex: 1,
    },

    button: {
        marginTop: 10
    }
});

export default Crypto;