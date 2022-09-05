import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { AppText } from '../components/ui/AppText'

// В данный компонент мы заходим если срабатывает событие onPress.
// Параметр onOpen - 'это функция вызываемая при срабатывании onPress.
export const Todo = ({ todo, onRemove, onOpen }) => { // компонент Todo для отображения элемента списка задач
  return (
    <TouchableOpacity                                 // TouchableOpacity - создает эффект - при нажатии содержимое затухает
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)}
      onLongPress={onRemove.bind(null, todo.id)}      // при долгом нажатии удаляется элемент. С помощью bind методу onRemove передаются заранее определенные нами параметры. null - поскольку нам не важен здесь контекст
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  }
})
