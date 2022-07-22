import React, {useState} from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'


export default function App() {
  const [todos, setTodos] = useState([]) // стейт

  const addTodo = (title) => {
    
// prevTodos - предыдущее состояние массива дополняется новыми id и title
// так создается новый элемент Todo и добавляется в стейт.
    
  setTodos(prev => [ 
    ...prev, 
    { 
      id: Date.now().toString(),
      title
    }
  ]) 
}

  const removeTodo = id => { // удаление элемента списка
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <View >
      <Navbar title='Todo App'/>
      <View style = {styles.container}>
       <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo}/>
    </View> 
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
})