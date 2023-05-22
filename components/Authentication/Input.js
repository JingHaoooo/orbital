import { View, Text, TextInput, StyleSheet } from 'react-native';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
}) {
  return ( 
    <View>
      <Text style={[styles.label, isInvalid && styles.labelInvalid]}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, isInvalid && styles.inputInvalid]}
          keyboardType={keyboardType}
          secureTextEntry={secure}
          onChangeText={onUpdateValue}
          value={value}
          autoCapitalize='none'
        />
      </View>
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
    backgroundColor: 'orange',
    borderRadius: 10

  },
  label: {
    color: 'black',
    marginBottom: 0,
    marginTop: 16,
    fontWeight: 'bold',
  },
  labelInvalid: {
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 4,
    fontSize: 16,
  },
  inputInvalid: {
  },
});
