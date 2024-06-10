import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View, FlatList, Platform, StatusBar, SafeAreaView, TouchableOpacity, ActivityIndicator, Pressable, Dimensions } from 'react-native';
import axios from 'axios';
import * as Cheerio from 'cheerio'
import { Ionicons } from '@expo/vector-icons';


export default function HomeScreen() {

  const init = {
    Name: [],
    Price: [],
    Api: [],
    load: true,
    firstloading: false
  }
  const [state, dispatch] = useReducer(reducer, init)


  interface Currency {
    id?: number
    name?: string,
    price?: string,

  }


  useEffect(() => {

    GetUsdPrice()

  }, [state.firstloading])

  function reducer(state: any, action: any) {


    if (action.type === 'Reset') {

      return {
        Name: [],
        Price: [],
        Api: [],
        load: true,


      }
    }
    else if (action.type === 'FinishLoading') {

      return {
        ...state,
        load: false
      }
    }
    else if (action.type === 'FirstLoading') {

      return {
        ...state,
        firstloading: true
      }
    }


    else if (action.type === 'UpdateName') {

      return {
        ...state,
        Name: [
          ...state.Name,
          action.NextName
        ],


      }
    }
    else if (action.type === 'UpdatePrice') {

      return {
        ...state,
        Price: [
          ...state.Price,
          action.NextPrice
        ]


      }
    }
    else if (action.type === 'setapi') {

      return {
        ...state,
        Api: [
          ...state.Api, {
            id: action.id,
            name: action.name,
            price: action.price
          }

        ]
      }
    }
    else if (action.type === 'ResetApi') {

      return {
        ...state,
        Api: [],
        load: true
      }
    }
  }


  const Item = ({ data }: { data: Currency }) => (


    <View style={styles.item}>
      <>
        <Text style={styles.text}>
          <>
            <View style={{ backgroundColor: '#93FFE8', flex: 2, paddingTop: 10, borderRadius: 8, height: 40, width: 180, alignItems: 'center' }}>
              <Text style={styles.text}> {data.name}</Text>
            </View>
            <View style={{ flex: 3, height: 50, width: 160, alignItems: 'center', justifyContent: 'flex-end' }}>
              <Text style={styles.price}>{data.price} </Text>
            </View>
          </>
        </Text>
      </>
    </View>


  )

  const GetUsdPrice = async () => {

    if (state.Name.length > 37) {

      dispatch({ type: 'Reset' })
    }

    if (state.Name.length < 30) {



      await axios.get('https://www.tgju.org/currency').then((res) => {
        const $ = Cheerio.load(res.data)

        for (let i = 7; i < 50;) {

          const nename = $(`tr > th:nth(${i})`).text()
          dispatch({ type: 'UpdateName', NextName: nename as string })
          i++
          if (i == 25) {
            i += 7
          }

        }
      })
      await axios.get('https://alanchand.com/currencies-price/usd/').then((res) => {
        const $ = Cheerio.load(res.data)
        const usdprice = $('div.col-lg-5  tr :nth(1) ').text().split(" ")[0] as string
        dispatch({ type: 'UpdatePrice', NextPrice: usdprice as string })
      })
      await axios.get('https://www.tgju.org').then((res) => {
        const $ = Cheerio.load(res.data)


        for (let i = 1; i < 36;) {


          const newprice = $(` tr > td.market-price:nth(${i})`).text()
          dispatch({ type: 'UpdatePrice', NextPrice: newprice as string })
          i++
        }





      })


    }
    if (state.load) {
      dispatch({ type: 'FinishLoading' })
    }
    if (!state.firstloading) {
      dispatch({ type: 'FirstLoading' })
    }


    if (state.Name.length === 36 && state.Api.length === 0) {

      for (let i = 0; i < 36; i++) {

        dispatch({ type: 'setapi', id: i, name: state.Name[i], price: state.Price[i] })

      }
    }


  }
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar hidden={false} backgroundColor="#14A3C7" translucent={true} />

      <View style={styles.container}>
        <>

          {!state.load &&
            <View style={{ paddingTop: 2 }}>
              <TouchableOpacity onPress={() => {
                dispatch({ type: 'Reset' })
                console.log("refresh")
                GetUsdPrice()
              }}>
                <Ionicons name="refresh-circle" size={48} color="black" />
              </TouchableOpacity>
            </View>
          }

          <View style={{ flex: 1 }}>
            <>
              {state.load ?
                <View>
                  <Text style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 10, color: '#583759' }}>Getting Latest Fiat Money Value</Text>
                  <ActivityIndicator style={{ top: 10 }} size={'large'} />
                </View>
                :

                <View style={{ flex: 1, paddingLeft: 10, width: Dimensions.get('window').width * 0.9, top: 5 }}>
                  {
                    (<FlatList

                      data={state.Api}
                      renderItem={({ item }) => <Item data={item} />}
                      keyExtractor={(item) => item.id}
                      onRefresh={() => {
                        console.log("refresh")
                      }}
                      refreshing={false} />
                    )}
                  <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'red', }}>           ** قیمت بر حسب ریال می باشد **    </Text>
                </View>
              }
            </>
          </View>
        </>
      </View >
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 10,
    width: '100%',
    height: '100%',
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center',

  },
  price: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#5865F2',
    paddingLeft: 50

  },

  item: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',

  }

})