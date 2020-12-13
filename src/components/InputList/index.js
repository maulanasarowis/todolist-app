import React from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

const InputList = ({
  label,
  placeholder,
  keyboardType,
  onChangeText,
  isiListState,
  value,
}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput}
        keyboardType={keyboardType}
        value={value}
        onChangeText={(text) => onChangeText(isiListState, text)}
      />
    </>
  );
};

export default InputList;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
