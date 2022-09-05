import React, { useState } from 'react'
import { StyleSheet, View, Alert, Text } from 'react-native'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import { Navbar } from './src/components/Navbar' // импорт компонента Navbar
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'
import { THEME } from './src/theme'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}
// функция App - по сути представляет собой все наше плиложение.
export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)      // стейт отвечающий за отображение какого либо экрана. При клике на элемент мы меняем в стейте id и если он != null то отображаем другой экран.
  const [todos, setTodos] = useState([   /* todos - стейт, setTodos - функция меняющая стейт todos. Это стейт для переключения MainScreen.js и TodoScreen.js*/
    { id: '1', title: 'Доучить React Native' }
  ])

  // if (!isReady) {
  //   return (
  //     <AppLoading
  //       startAsync={loadApplication}
  //       onError={err => console.log(err)}
  //       onFinish={() => setIsReady(true)}
  //     />
  //   )
  // }
  // создание нового элемента задач и добавление в стейт todos.
  const addTodo = title => {
    setTodos(prev => [                  // prev - предыдущее состояние
      ...prev,
      {
        id: Date.now().toString(),  // Новое состояние. Date.now() возвращает число поэтому лучше через toString перевести в строку.
        title
      }
    ])
  }

  const removeTodo = id => {         // Функция удаления передаваемая для каждого элемента todo
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
            setTodos(prev => prev.filter(todo => todo.id !== id)) // метод массива - filter - удаляет элемент из массива. Оставить элемент если todо.id не равно id
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateTodo = (id, title) => {
    setTodos(old =>
      old.map(todo => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }
  // Переменная content - по умолчанию = главному экрану. 
  // В MainScreen.js передаем следующие функции из данного файла App.js
  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}                        // референс до метода removeTodo
      openTodo={setTodoId}                           // из стейта setTodoId получаем тот id который нам нужно открыть
    />
  )

  if (todoId) {                  // Если todoId != null т.е изменяется стейт setTodoId, тогда в переменную content передаем компонент TodoScreen.
    const selectedTodo = todos.find(todo => todo.id === todoId) //метод find ищет todo который находится в массиве todos и затем сравниваем id найденного todo со значением todoId. И тогда в selectedTodo попадает тот todo у которого id === выбранному.
    content = (
      <TodoScreen
        onRemove={removeTodo}           // так передаются свойства в компонент. Параметры могут содержать различные типы данных.
        goBack={() => setTodoId(null)}  // передача функции goBack в компонент TodoScreen.js и задаем стейту todoId значение null, что бы рендерился MainScreen.
        todo={selectedTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <Navbar title='Todo App!' /> {/* компонент Navbar */}
      <View style={styles.container}>{content}</View>
    </View>
  )
}
// const styles - содержит стили для <View style={styles.container}>{content}</View>
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20 // свойства стилей в React Nayive пишут толлько в Сamel Case
  }
})
