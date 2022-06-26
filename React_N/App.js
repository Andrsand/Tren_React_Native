import React, { useState } from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import Header from './components/Header'


export default function App() {
  const [listOfItems, setListOfItems] = useState([
    {text: 'Купить молоко', index: 1},
    {text: 'Помыть машину', index: 2},
    {text: 'Купить картошку', index: 3},
    {text: 'Стать миллионером', index: 4}
  ])

    return (
        <View>
          <Header />
          <View>
            <FlatList data={listOfItems} renderItem={({ item }) => (
              <Text>{item.text}</Text>
            )} />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
