// Модальное окно позволяет редактировать существующее уже название todo.

import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/AppButton'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value)         // локальный стейт для изменения названия элемента

  const saveHandler = () => {         // валицация. Если title меньше трех символов, возвращаем alert иначе - сохраняем.
    if (title.trim().length < 3) {
      Alert.alert(
        'Ошибка!',
        `Минимальная длинна названия 3 символа. Сейчас ${title.trim().length
        } символов.`
      )
    } else {
      onSave(title) // Принимаем функцию onSave с параметром title
    }
  }

  return (                  // здесь мы регулируем локальный стейт модального окна, чтобы менять значение value в const EditModal ￪
    <Modal visible={visible} animationType='slide' transparent={false}>  {/* параметр visible получен от родительского стейта (вверху), параметры animationType и transparent - из документации React Native*/}
      <View style={styles.wrap}>
        <TextInput                         // input содержащий название элемента по которому мы кликнули для редактирования
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder='Введите название'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}> {/* если нажимаем на кнопку “Сохоранить” то передаем это значение а если на кнопу “отмена” то отменим */}
          <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
            Отменить
          </AppButton>
          <AppButton onPress={saveHandler}>Сохранить</AppButton>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})
