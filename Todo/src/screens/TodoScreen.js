import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

// экспорт константы TodoScreen принимающей свойства и возвращающей JSX
export const TodoScreen = ({ goBack, todo }) => { 
    return (
      <View>
        <Text>{todo.title}</Text>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <Button title='Назад' onPress={goBack} color='#757575' />
          </View>
          <View style={styles.button}>
            <Button
              title='Удалить'
              color='#e53935'
              onPress={() => console.log('To Remouve')}
            />
          </View>
        </View>
        
      </View>
    )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: '40%'
  }
})