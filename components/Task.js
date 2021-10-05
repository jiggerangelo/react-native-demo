import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Task = (props) => {
  const { index, completeTask } = props;

  return (
    <View style={styles.taskItemWrapper}>
      <View style={styles.taskItem}>
        <TouchableOpacity onPress={() => completeTask(index)}>
          <View style={styles.box}></View>
        </TouchableOpacity>
        <Text style={styles.itemText}>{props.text}</Text>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  taskItemWrapper: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  box: {
    width: 24,
    height: 24,
    backgroundColor: '#c20000',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
  }
});

export default Task;
