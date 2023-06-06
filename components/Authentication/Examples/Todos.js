import { StatusBar } from 'expo-status-bar';
import { FlatList, Image, ScrollView, StyleSheet, View } from 'react-native';
import { Post } from './components/Post';
import { Text, Button, TextInput, Checkbox } from 'react-native-paper';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Gone through during MC1


function TodoItem({ todo, toggleTodo }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10, backgroundColor: 'green', justifyContent: 'center' }}>
      <Text>{todo.title}</Text>
      <Checkbox.Android
        status={todo.completed ? 'checked' : 'unchecked'}
        onPress={() => toggleTodo(todo.id)} />
    </View>
  );
}

function TodoInputs({ addTodo }) {
  const [text, setText] = useState('');
  const onSubmit = () => {
    addTodo(text);
  }
  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'yellow', alignItems: 'center' }}>
      <TextInput value={text} onChangeText={(value) => setText(value)} />
      <Button onPress={onSubmit}>Submit</Button>
    </View>
  );
}

function Todos() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "buy milk",
      completed: false,
    },
    {
      id: 2,
      title: "buy eggs",
      completed: true,
    }
  ]);
  const addTodo = (title) => {
    const index = todos[todos.length - 1].id + 1;
    setTodos([
      ...todos,
      {
        id: index,
        title: title,
        completed: false,
      }
    ]);
  }
  const toggleTodo = (id) => {
    const index = todos.findIndex(item => item.id === id);
    setTodos([
      ...todos.slice(0, index),
      {
        ...todos[index],
        completed: !todos[index].completed
      },
      ...todos.slice(index + 1),
    ])
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ backgroundColor: 'red', width: 300, height: 500, }}
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} toggleTodo={toggleTodo} />} />
      <TodoInputs addTodo={addTodo} />
    </View>

  );
}
export default function App() {


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Todos />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
