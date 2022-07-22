import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";

// экспорт константы TodoScreen принимающей свойства и возвращающей JSX
export const TodoScreen = ({ goBack, todo }) => { 
    return (
      <View>
        <Text>{todo.title}</Text>
        <Button title='Назад' onPress={goBack}/>
      </View>
    )
}

const styles = StyleSheet.create({})