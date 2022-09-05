import React from 'react'
import { StyleSheet, View } from 'react-native'

export const AppCard = props => (                      // это стилевая оболочка в которую мы будем оборачивать другие элементы
  <View style={{ ...styles.default, ...props.style }}>{props.children}</View> // сначала мы используем дефолтные стили ...styles.default а затем стили из вне ...props.style которые, при необходимости, перетрут дефолтные з а счет последовательности добавления. 
)

const styles = StyleSheet.create({
  default: {                           // базовыйй стиль
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 8,                           // свойство тени для ios
    backgroundColor: '#fff',
    borderRadius: 10
  }
})
