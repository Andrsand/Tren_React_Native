import React, {useState} from 'react'
import {StyleSheet, View, Text, FlatList} from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'


export default function App() {
  const [todoId, setTodoId] = useState(null) // стейт отображения экранов
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

  let content = (
    <MainScreen 
      todos={todos} 
      addTodo={addTodo} 
      removeTodo={removeTodo} 
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = <TodoScreen goBack={() => setTodoId(null)} todo={selectedTodo}/> // проверка по id
  }


  return (
    <View >
      <Navbar title='Todo App'/>
      <View style = {styles.container}>
        { content }  
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