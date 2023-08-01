import { View, Text, StyleSheet } from 'react-native';

export default function Bubble({ moduleCode }) {
  return (
    <View key={moduleCode} style={styles.moduleBubble}>
      <Text style={styles.moduleBubbleText}>{moduleCode}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  moduleBubble: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
    marginRight: 10,
    marginVertical: 4,
  },
  moduleBubbleText: {
    color: 'grey',
    fontSize: 18,
  },
});