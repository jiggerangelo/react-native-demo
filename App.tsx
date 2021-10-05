import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Platform } from 'react-native';
import Task from './components/Task';

const defaultTasks = ['Learn React Native', 'Build Demo App'];

export default function App() {
  const [task, setTask] = useState<string>();
  const [taskItems, setTaskItems] = useState<string[]>(defaultTasks);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task !== undefined) {
      setTaskItems([...taskItems, task!]);
    }
    setTask(undefined);
  }

  const completeTask = (index: number) => {
    let newItems = [...taskItems];
    newItems.splice(index, 1);
    setTaskItems(newItems);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's tasks</Text>
        <View style={styles.items}>
          {taskItems.length !== 0 ?
            taskItems.map((item, index) => {
              return (
                <Task key={index} text={item} index={index} completeTask={completeTask} />
              )
            })
            :
            <Text style={styles.empty}>Yay! You have no tasks left!</Text>
          }
        </View>
      </View>
        
      </ScrollView>

      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Add a task'} value={task} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Add</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  empty: {
    textAlign: 'center'
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '70%'
  },
  addWrapper: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
