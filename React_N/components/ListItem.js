import React from 'react'
import {StyleSheet, TouchableOpacity, Text} from 'react-native' // TouchableOpacity - pressing effect

export default function ListItem({ el, deleteHandler }) {
    return (
      <TouchableOpacity onPress={() => deleteHandler(el.key)}> {/* when clicked, the deleteHandler function is triggered and the element corresponding to the passed key is deleted
    */}
        <Text style={styles.text}>{el.text}</Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  text: {
    padding: 20,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    marginTop: 20,
    width: '60%',
    marginLeft: '20%'
  }
});