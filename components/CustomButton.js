import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function CustomButton({ label, onPress, color = '#4a90e2' }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
