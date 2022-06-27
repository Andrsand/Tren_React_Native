import React, { useState } from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import Header from './components/Header'
import ListItem from './components/ListItem'
import Form from './components/Form'


export default function App() {
  const [listOfItems, setListOfItems] = useState([
    {text: 'Купить молоко', index: 1},
    {text: 'Помыть машину', index: 2},
    {text: 'Купить картошку', index: 3},
    {text: 'Стать миллионером', index: 4}
  ])

  const addHandler = (text) => {
    setListOfItems((list) => {
      return [
        { text: text, index: 5 },
        ...list
      ]
    })
  }

    return (
        <View>
          <Header />
            <Form addHandler={addHandler}/>
          <View>
            <FlatList data={listOfItems} renderItem={({ item }) => (
              <ListItem el={item}/>
            )} />
          </View>
        </View>
    );
}

const styles = StyleSheet.create({

});
