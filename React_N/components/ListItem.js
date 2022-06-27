import React from 'react'
import {StyleSheet, TouchableHighlight, Text} from 'react-native' //TouchableHighlight - эффект нажатия

export default function ListItem({ el }) {
    return (
      <TouchableHighlight>
        <Text style={styles.text}>{el.text}</Text>
      </TouchableHighlight>
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