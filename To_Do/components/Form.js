import React, { useState } from 'react'
import {StyleSheet, TextInput, Text, Button, View} from 'react-native' //TouchableHighlight - эффект нажатия


export default function Form( { addHandler }) {
    const [text, setValue] = useState('');

    const onChange = (text) => {
      setValue(text);
    };

    return (
      <View>
        <TextInput style={styles.input} onChangeText={onChange} placeholder='Create a task...' /> {/*При изменении текста срабатывает функция onChange  */}
        <Button onPress={() => addHandler(text)} title='Добавить задачу'/>
      </View>  
    );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 10,
    marginVertical: 30,
    marginHorizontal: '20%',
    width: '60%'
  }
  
});