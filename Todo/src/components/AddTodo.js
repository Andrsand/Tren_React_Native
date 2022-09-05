import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { THEME } from '../theme'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const pressHandler = () => { // функция срабатывающая при нажатии кнопки "Добавить".
    if (value.trim()) {        // если TextInput не пустой ( и не содержит пробелы которые очищаются trim) тогда выполняем логику далее 
      onSubmit(value)          // при нажатии конопки "добавить" отправляется значение value
      setValue('')             // и setValue очищает TextImput 
      Keyboard.dismiss()
    } else {                   // иначе, если пустая строка - тогда показываем Alert с предупреждением...
      Alert.alert('Название дела не может быть пустым')
    }
  }

  return (                           // возвращаем JSX
    <View style={styles.block}>
      <TextInput                     // TextInput с параметрами:
        style={styles.input}
        onChangeText={setValue}      // При изменении текста в setValue передается текст из TextImput
        value={value}
        placeholder='Введите название дела...'
        autoCorrect={false}          // Автоматическое исправление ошибок
        autoCapitalize='none'        // 'none' - выключает автоматическое начало с большой буквы.
      />
      <AntDesign.Button onPress={pressHandler} name='pluscircleo'>
        Добавить

      </AntDesign.Button>
      {/*<Button title='Добавить' onPress={pressHandler} />*/}
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
})
