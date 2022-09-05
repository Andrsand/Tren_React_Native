import React, { useState } from 'react'
import { StyleSheet, View, Button, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { THEME } from '../theme'                                       // экспорт константы цветов темы из theme.js
import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'
import { AppButton } from '../components/ui/AppButton'

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false)

  const saveHandler = title => {
    onSave(todo.id, title)
    setModal(false)
  }

  return (
    <View>                                  {/* корневой элемент view*/}
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>                                 {/* это стилевая оболочка из файла AppCard.js в которую мы обернули наши элементы */}
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={goBack} color={THEME.GREY_COLOR}>   {/* импорт цвета из константы THEME theme.js */}
            <AntDesign name='back' size={20} color='#fff' />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}                             /* импорт цвета из константы THEME theme.js */
            onPress={() => onRemove(todo.id)}
          >
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',                       // кнопки расположены по горизонтали а не одна под другой
    justifyContent: 'space-between'             // задает пространство между кнопками
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  button: {
    //width: Dimensions.get('window').width / 3
    width: Dimensions.get('window').width > 400 ? 150 : 100
  },
  title: {
    fontSize: 20
  }
})
