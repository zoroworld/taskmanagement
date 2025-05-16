// screens/TaskScreen.tsx
import { Button } from '@react-navigation/elements';
import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItemInfo,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Task {
  id: string;
  name: string;
  description: string;
}

export default function TaskScreen({onLogout}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task>({ id: '', name: '', description: '' });

  const openCreateModal = () => {
    setCurrentTask({ id: '', name: '', description: '' });
    setModalVisible(true);
  };

  const openEditModal = (task: Task) => {
    setCurrentTask(task);
    setModalVisible(true);
  };

  const saveTask = () => {
    if (!currentTask.name.trim()) {
      Alert.alert('Validation', 'Please enter a task name.');
      return;
    }

    if (!currentTask.id) {
      // CREATE
      const newTask: Task = {
        ...currentTask,
        id: Date.now().toString(),
      };
      setTasks(prev => [...prev, newTask]);
    } else {
      // UPDATE
      setTasks(prev => prev.map(t => (t.id === currentTask.id ? currentTask : t)));
    }

    setModalVisible(false);
  };

  const deleteTask = (id: string) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTasks(prev => prev.filter(t => t.id !== id)),
      },
    ]);
  };

  const renderItem = ({ item }: ListRenderItemInfo<Task>) => (
    <View style={styles.taskItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.taskName}>{item.name}</Text>
        <Text style={styles.taskDesc}>{item.description}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.actionBtn}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.actionBtn}>
          <Text style={[styles.actionText, { color: 'red' }]}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );



  const handleLogout = () => {
    onLogout();
  };

  return (
    <View style={styles.container}>
      <Text>Task Management</Text>
     
      <FlatList
        data={tasks}
        keyExtractor={t => t.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No tasks. Tap + to add one.</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={openCreateModal}>
        <Text style={styles.addButtonText}>＋</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {currentTask.id ? 'Edit Task' : 'New Task'}
            </Text>
            <TextInput
              placeholder="Task Name"
              value={currentTask.name}
              onChangeText={name => setCurrentTask(prev => ({ ...prev, name }))}
              style={styles.input}
            />
            <TextInput
              placeholder="Task Description"
              value={currentTask.description}
              onChangeText={description => setCurrentTask(prev => ({ ...prev, description }))}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.modalBtn, { backgroundColor: '#ccc' }]}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={saveTask}
                style={[styles.modalBtn, { backgroundColor: '#4a90e2' }]}
              >
                <Text style={{ color: '#fff' }}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
       <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  taskItem: {
    flexDirection: 'row',
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  taskName: { fontWeight: '600', fontSize: 16 },
  taskDesc: { color: '#555', marginTop: 4 },
  actions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { marginLeft: 12 },
  actionText: { color: '#4a90e2' },

  addButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#4a90e2',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: { fontSize: 32, color: '#fff', lineHeight: 32 },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  modalBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginLeft: 12,
  },
  logoutButton: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});
