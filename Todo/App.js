import React, {useState} from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import { Navbar } from './src/Navbar'
import { AddTodo } from './src/AddTodo'
import { Todo } from './src/Todo'

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
        <AddTodo onSubmit={addTodo}/>
     

      <FlatList 
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo}/>}
      />
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