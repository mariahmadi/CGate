import { View, Text, StyleSheet, FlatList, StatusBar, Pressable, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState, useEffect, useMemo, useReducer, memo } from 'react'
import axios from 'axios'
import { Button, Image } from 'react-native-elements';

import * as Linking from 'expo-linking'

function News() {


    const [api, setapi] = useState<NewsModel[]>([])
    const [state, dispatch] = useReducer(reducer, { page: 1 })
    const [isloading, setisloading] = useState(false)
    const [isFirstPagerecived, setisFirstPagerecived] = useState(false)


    useEffect(() => {


        fetch(state.page)

    }, [state.page])


    interface NewsModel {
        id?: number,
        title?: string,
        image?: string,
        link?: string
    }
    function reducer(state: any, action: any) {
        if (action.type === 'incremented') {
            if (api.length >= (state.page) * 19) {

                return {

                    page: state.page + 1,

                };
            }
        }

        if (action.type === 'Reset') {
            return {
                page: state.page == 1
            };
        }
        throw Error('Unknown action.');
    }

    const Item = ({ data }: { data: NewsModel }) => (
        <>
            <View style={{ flexDirection: 'row', right: 15 }}>

                <View style={{ paddingLeft: 14, paddingTop: 8, }}>
                    <Pressable onPress={() => Linking.openURL(`${data.link}`)}>
                        <Image style={{
                            width: 100,
                            height: 100,
                            flex: 1,
                            borderRadius: 10

                        }} source={{ uri: `${data.image}` }}></Image>

                    </Pressable>

                </View>

                <View style={styles.item}>

                    <View style={{ top: 15 }}>
                        <Pressable onPress={() => Linking.openURL(`${data.link}`)}>
                            <Text style={{ flex: 1, textTransform: 'capitalize', justifyContent: 'center', fontSize: 16, fontWeight: 'bold', paddingRight: 20 }}>{data.title}  </Text>
                        </Pressable>
                    </View>

                </View>

            </View>

        </>
    )


    const fetch = (page: number) => {
        (async () => {
            if (isloading == false) {
                setisloading(true)
            }


            await axios.post("https://api.coinmarketcap.com/aggr/v4/content/user", { "mode": "LATEST", "page": ` ${page}`, "size": 20, "language": "en", "newsTypes": ["NEWS", "ALEXANDRIA"] }).then((res) => {


                const ress = res.data.data
                let apiL = api.length    /// The Length Of content in page
                let resL = ress.length  //// Always 20 for any request
                let ContentLength = resL * (state.page)  // Number Of Content in Whole Page
                if (apiL < ContentLength) {

                    for (let i = 0; i < resL; i++) {


                        const image = ress[i].cover
                        const rawtitle = ress[i].slug
                        const title = rawtitle.replaceAll("-", " ")
                        const link = ress[i].meta.sourceUrl


                        setapi(prev => [...prev, { id: apiL, title: title, link: link, image: image }])
                        apiL++


                    }
                }
                if (isloading == true) {
                    setisloading(false)
                }
                if (isFirstPagerecived == false) {

                    setisFirstPagerecived(true)
                }

            })


        })()

    }
    const footerLoading = () => {
        if (isloading && isFirstPagerecived) {

            return <ActivityIndicator size={'large'} /> as any;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />

            <View style={styles.container}>
                <>
                    <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#F433FF' }}>News Of Crypto Industry</Text>
                    <View style={{ paddingBottom: 30, top: 15 }}>
                        {api && !isloading &&
                            <Button title="Update News" onPress={() => {
                                setapi([])
                                setisloading(false)
                                dispatch({ type: 'Reset' })

                            }}>
                            </Button>}

                    </View>
                    {isloading && !isFirstPagerecived ?

                        <ActivityIndicator size={'large'} /> :
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            {api &&
                                (<FlatList

                                    data={api}
                                    extraData={state.page}
                                    renderItem={({ item }) => <Item data={item} />}
                                    keyExtractor={(item) => item.id}
                                    onRefresh={() => {
                                        console.log("refresh")
                                    }}

                                    refreshing={false}
                                    onEndReachedThreshold={1.4}
                                    onEndReached={() => {

                                        dispatch({ type: 'incremented' })

                                    }}
                                    ListFooterComponent={footerLoading}
                                />
                                )
                            }

                        </View>
                    }
                </>
            </View>
        </SafeAreaView>
    )
}
export default News
const styles = StyleSheet.create({
    container: {

        flex: 1,
        paddingTop: 25,
        paddingLeft: 5,
        paddingRight: 8,
        height: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',


    }, item: {

        backgroundColor: "white",
        borderRadius: 20,
        color: "white",
        width: 305,
        padding: 4,
        margin: 3,
        fontSize: 30,
        fontWeight: "bold"


    },
})

