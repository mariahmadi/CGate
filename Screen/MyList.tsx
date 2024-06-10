import { View, Text, StyleSheet, StatusBar, Pressable, SafeAreaView, Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect, useReducer } from 'react'
import axios from 'axios'
import { Button } from 'react-native-elements'
import Constants from 'expo-constants'
import { StackScreenProps } from '@react-navigation/stack';
import { getDatabase, ref, child, get, onValue } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const MyList: React.FC<StackScreenProps<any>> = ({ navigation }) => {



    const auth = getAuth();
    const user = auth.currentUser;
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
    const [coins, setCoins] = useState<CoinData[]>([])
    const [selected, setSelected] = useState<string[]>([])
    const init = {
        id: [],
        coin: [] as CoinData[],
        load: true

    }
    const [state, dispatch] = useReducer(reducer, init)

    const [filtered, setfiltered] = useState([])


    const CoinClicked = (data: CoinData) => {

        navigation.navigate("Coin",
            {
                data: data
            })
    }
    function reducer(state: any, action: any) {
        if (action.type === 'Reset') {
            return {
                id: [],
                coin: [],
                load: true

            }
        }

        else if (action.type === 'Loading') {
            return {
                ...state,
                load: false
            }
        }


    }
    const Item = ({ data }: { data: CoinData }) => (


        < Pressable onPress={() => CoinClicked(data)
        }>

            <View style={{ flex: 1, width: '100%', height: 35, }}>
                <>
                    <Text style={styles.item}>
                        <>

                            <View style={{ flex: 2, width: 25 }} >
                                <Text style={styles.item}>
                                    {data.cmc_rank}
                                </Text>
                            </View>

                            <View style={{ flex: 3, width: 85 }} >
                                <Text style={styles.name}>
                                    {data.name}
                                </Text>
                            </View>

                            <View style={{ flex: 4, width: 100 }} >
                                <Text style={styles.item}>
                                    $ {data.quote.USD.price > 1 ? data.quote.USD.price.toFixed(2) : data.quote.USD.price < 0.01 ? data.quote.USD.price.toFixed(7) : data.quote.USD.price.toFixed(4)}
                                </Text>
                            </View>

                            {
                                data.quote.USD.percent_change_1h >= 0 ?
                                    <View style={{ flex: 5, width: 55, }} >
                                        <Text style={styles.Up}>
                                            {data.quote.USD.percent_change_1h.toFixed(2)}%
                                        </Text>
                                    </View> :
                                    <View style={{ flex: 5, width: 55 }} >
                                        <Text style={styles.Down}>
                                            {data.quote.USD.percent_change_1h.toFixed(2)}%
                                        </Text>
                                    </View>
                            }
                            {
                                data.quote.USD.percent_change_24h >= 0 ?
                                    <View style={{ flex: 6, width: 60, }} >
                                        <Text style={styles.Up}>
                                            {data.quote.USD.percent_change_24h.toFixed(2)}%
                                        </Text>
                                    </View> :
                                    <View style={{ flex: 6, width: 60 }} >
                                        <Text style={styles.Down}>
                                            {data.quote.USD.percent_change_24h.toFixed(2)}%
                                        </Text>
                                    </View>

                            }
                            {
                                data.quote.USD.percent_change_7d >= 0 ?
                                    <View style={{ flex: 6, width: 60, }} >
                                        <Text style={styles.Up}>
                                            {data.quote.USD.percent_change_7d.toFixed(1)}%
                                        </Text>
                                    </View> :
                                    <View style={{ flex: 6, width: 60 }} >
                                        <Text style={styles.Down}>
                                            {data.quote.USD.percent_change_7d.toFixed(2)}%
                                        </Text>
                                    </View>

                            }


                        </>

                    </Text>

                </>
            </View>
        </Pressable >

    );


    useEffect(() => {


        getdata()


    }, [state.load])

    const getdata = async () => {
        const Uid = user?.uid

        if (filtered.length > 0) {
            setSelected([])
            setCoins([])
            setfiltered([])
            dispatch({ type: 'Reset' })
        }

        const SelectedCoin = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { headers: { 'X-CMC_PRO_API_KEY': `${Constants?.expoConfig?.extra?.CMC_API}` } })
        setCoins(SelectedCoin.data.data)

        const dbRef = ref(getDatabase());
        get(child(dbRef, 'SelectedCoin/' + Uid + '/id')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val()
                setSelected(data)

            }
            coins.filter((coin) => {
                if (coin && selected.includes(coin.id as never)) {
                    if (filtered.indexOf(coin.id as never) === -1) {

                        filtered.push(coin as never)

                    }
                }
            })

            dispatch({ type: 'Loading' })
        })


    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />
            <View style={styles.main}>
                {!user &&
                    <>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, paddingTop: 18, fontWeight: 'bold', color: 'green' }}> Sign In to Enjoy This Feature</Text>
                            <Text style={{ fontSize: 18, paddingTop: 18, fontWeight: 'bold', color: 'blue' }}> You Can Follow Your Favorite Coin In This Tab</Text>

                        </View>
                    </>}
                {!filtered && user &&
                    <Text style={{ fontSize: 18, paddingTop: 18, fontWeight: 'bold', color: 'green' }}> Please Select a coin for Analize</Text>

                }
                {filtered && user && <Button title="Reload" onPress={getdata}></Button>}

                <View style={{ flex: 1, justifyContent: 'center', paddingTop: 10 }}>

                    {filtered && user &&

                        (<>
                            {!state.load && <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#00BFFF' }}>Rank Coin              Price                1h %    24h %     7d %</Text>}
                            <FlatList

                                data={filtered}
                                extraData={filtered}
                                renderItem={({ item }) => <Item data={item} />}
                                keyExtractor={(item) => item.id}
                                onRefresh={() => {
                                    getdata()
                                    console.log("refresh")
                                }}
                                refreshing={false}
                            />
                        </>)}
                </View>
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 20,
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',

    },

    item: {
        backgroundColor: "#F5F5F5",
        width: '100%',
        borderRadius: 15,
        color: "black",
        padding: 2,
        margin: 2,
        fontWeight: 'bold'


    },
    name: {
        backgroundColor: "#F5F5F5",
        width: '100%',
        borderRadius: 5,
        color: "#357EC7",
        padding: 2,
        margin: 2,
        fontWeight: 'bold'
    },
    Up: {
        backgroundColor: "#F5F5F5",
        width: '100%',
        borderRadius: 5,
        color: "green",
        padding: 2,
        margin: 2,
        fontWeight: 'bold',
        paddingLeft: 8
    },
    Down: {
        backgroundColor: "#F5F5F5",
        width: '100%',
        borderRadius: 5,
        color: "red",
        padding: 2,
        margin: 2,
        fontWeight: 'bold'
    }
})

export default MyList;