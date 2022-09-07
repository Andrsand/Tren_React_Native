// В этом компоненте мы показываем список наших todo

import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

// MainScreen - компенент отображающий главный экран.
// Переключение экранов происходит, когда мы нажимаем на какой либо компонент todo.
export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {  // В параметрах: функция addTodo, массив todos из App.js и тд.
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
  )

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  }

  )
  let content = (
    <View style={{ width: deviceWidth }}> {/*Dynamically set the width of the View depending on the width of the screen */}
      <FlatList  // по умолчанию мы показываем этот FlatList куда передаем массив todos
        keyExtractor={item => item.id.toString()}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} /> // полученные от родителя параметры записываем в свойства Todo
        )}
      />
    </View>
  )

  if (todos.length === 0) {         // Если в массиве todos ничего нет, то показваем картинку 
    content = (
      <View style={styles.imgWrap}>
        <Image                     // компонент для отображения картинки
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  }
})
