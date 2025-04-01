import React, { useState, useEffect } from "react";
import {View,Text,TextInput,Button,FlatList,StyleSheet,TouchableOpacity} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BookList = () => {
  const [book, setBook] = useState("");
  const [books, setBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const savedBooks = await AsyncStorage.getItem("books");
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    }
  }

  async function saveBook() {
    if (book.trim() === "") return;

    if (editIndex !== null) {
      const newBookList = [...books];
      newBookList[editIndex] = book;
      setBooks(newBookList);
      await AsyncStorage.setItem("books", JSON.stringify(newBookList));
      setEditIndex(null);
    } else {
      const newBookList = [...books, book];
      setBooks(newBookList);
      await AsyncStorage.setItem("books", JSON.stringify(newBookList));
    }

    setBook("");
  }

  async function removeBook(index) {
    const newBookList = books.filter((_, i) => i !== index);
    setBooks(newBookList);
    await AsyncStorage.setItem("books", JSON.stringify(newBookList));
  }

  function editBook(index) {
    setBook(books[index]);
    setEditIndex(index);
  }

  async function clearList() {
    await AsyncStorage.removeItem("books");
    setBooks([]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Digite o nome do seu livro</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do seu livro"
        value={book}
        onChangeText={setBook}
      />
      <Button
        title={editIndex !== null ? "Salvar Edição" : "Adicionar"}
        onPress={saveBook}
      />

      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.item}>{item}</Text>

            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={() => editBook(index)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => removeBook(index)}
                style={[styles.button, styles.deleteButton]}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Button title="Limpar Lista" onPress={clearList} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    width: 250,
    marginBottom: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 5,
  },
  item: {
    fontSize: 18,
    marginVertical: 5,
    width: "70%",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#3498db",
    padding: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default BookList;