import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

export default function CounterScreen() {
  const { name } = useLocalSearchParams();
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Busca o contador inicial do backend
    const fetchCounter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/counter?name=${name}`
        );
        setCount(response.data.count);
      } catch (error) {
        console.error("Erro ao buscar contador:", error);
      }
    };

    fetchCounter();
  }, [name]);

  const incrementCounter = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/counter", {
        name,
        count: count + 1,
      });
      setCount(response.data.count);
    } catch (error) {
      console.error("Erro ao incrementar contador:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bem-vindo, {name}!</Text>
      <Text style={styles.counter}>Contador: {count}</Text>
      <Button title="Incrementar" onPress={incrementCounter} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  greeting: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  counter: { fontSize: 24, marginBottom: 20 },
});
