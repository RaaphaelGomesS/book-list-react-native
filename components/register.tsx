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
        userRegisterValidation(username, password);
        const userData = { username, password };
        await AsyncStorage.setItem(username, JSON.stringify(userData));
        Alert.alert("Conta criada com sucesso!");
        navigation.replace("Login");
      }
    } catch (error) {
      Alert.alert("Erro ao criar conta.");
    }
  }

  function userRegisterValidation(newUsername:String, newPassword:String) {
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registre sua conta: </Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} keyboardType="email-address"/>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry/>
      <TouchableOpacity style={styles.button} onPress={registerAccount}>
        <Text style={styles.buttonText}> Registrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("Login") }}>
        <Text style={styles.buttonText}> Entrar</Text>
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
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    width: "80%",
    padding: 12,
    marginBottom: 12,
    backgroundColor: "white",
    borderRadius: 8,
  },

  button: {
    width: "80%",
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

  link: {
    marginTop: 10,
  },

  linkText: {
    color: "#007BFF",
  },
});
