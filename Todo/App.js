import React, {useState} from 'react'
import {StyleSheet, View, Text, FlatList, Alert} from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'


export default function App() {
  const [todoId, setTodoId] = useState('2') // стейт отображения экранов
  const [todos, setTodos] = useState([       // стейт
    { id: '1', title: 'Выучить React'},
    { id:'2', title: 'Написать приложение'}
  ]) 
  

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
    const todo = todos.find(t => t.id === id)
    Alert.alert(
      'Удаление элемента',
      `Вы уверены, что хотите удалить "${todo.title}"?`,
      [
        {
          text: 'Отмена',
          style: 'cancel'
        },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      { cancelable: false }
    )
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
    content = (                                                  // проверка по id
    <TodoScreen 
      onRemove={removeTodo} 
      goBack={() => setTodoId(null)} 
      todo={selectedTodo}
    /> 
    )
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