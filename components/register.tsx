import React, { useState } from "react";
import { Button, Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  async function registerAccount() {
    try {
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser) {
        Alert.alert("Este email já está cadastrado!");
      } else {
        if (userRegisterValidation(username, password)) {
          const userData = { username, password };
          await AsyncStorage.setItem(username, JSON.stringify(userData));
          Alert.alert("Conta criada com sucesso!");
          navigation.replace("Login");
        } else {
          Alert.alert("Usuário ou senha são inválidos! A senha e o usuário deve ter pelo menos 6 dígitos.");
        }
      }
    } catch (error) {
      Alert.alert("Erro ao criar conta.");
    }
  }

  function userRegisterValidation(newUsername: String, newPassword: String) {
    if (username != null && password != null) {
      if(username.length >= 6 && password.length >= 6) {
        return true;
      }
    }
    return false;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registre sua conta: </Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={registerAccount}>
        <Text style={styles.buttonText}> Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.link}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.linkText}> Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    padding: 10,
    width: 250,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: "white",
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
  },

  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    width: 250,
    marginBottom: 10,
    borderRadius: 5,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "bold"
  },

  link: {
    marginTop: 10,
  },

  linkText: {
    color: "#007BFF",
  }
});
