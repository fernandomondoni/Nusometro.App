import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import axios from "axios";

export default function NameScreen() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleNext = async () => {
    if (name.trim()) {
      try {
        await axios.post("http://localhost:5000/api/user", { name });
        router.push({ pathname: "/counter", params: { name } });
      } catch (error) {
        if (error instanceof Error) {
          alert("Erro ao enviar dados para o backend: " + error.message);
        } else {
          alert("Ocorreu um erro desconhecido.");
        }
      }
    } else {
      alert("Por favor, insira um nome válido.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Continuar" onPress={handleNext} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 20,
  },
});
