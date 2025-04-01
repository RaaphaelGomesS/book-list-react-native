import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  async function login() {
    try {
      const storedUser = await AsyncStorage.getItem(username);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.password === password) {
          Alert.alert('Login bem-sucedido!');
          navigation.replace('BookList');
        } else {
          Alert.alert('Senha incorreta!');
        }
      } else {
        Alert.alert('Usuário não encontrado!');
      }
    } catch (error) {
      Alert.alert('Erro ao efetuar login.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Logar: </Text>
      <TextInput style={styles.input} value={username} onChangeText={setUsername} keyboardType="email-address"/>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry/>
      
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}> Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate('Register')}}>
        <Text style={styles.buttonText}> Registrar</Text>
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