import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { TextInput, Button, PaperProvider, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";
 
const LogIn = () => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const navigation = useNavigation();
 
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;
      console.log("User logged in: ", user);
      navigation.navigate("Home");
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert("Error de red. Por favor, verifica tu conexión a Internet.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };
 
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Iniciar Sesión</Text>
              <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                  <AntDesign name="mail" size={24} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    placeholder="Dirección de correo electronico"
                  />
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.inputRow}>
                  <Entypo name="lock" size={24} style={styles.icon} />
                  <TextInput
                    style={styles.input}
                    value={clave}
                    onChangeText={setClave}
                    secureTextEntry={true}
                    placeholder="Contraseña del usuario"
                  />
                </View>
              </View>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleLogin}
              >
                Iniciar Sesión
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.loginText}>
                  ¿No tienes cuenta? Regístrate aquí
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};
 
export default LogIn;
 
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.15,
    paddingTop: 50,
  },
  card: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  icon: {
        marginRight: 12,
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'transparent',
    height: 40,
    borderWidth: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    marginTop: 20,
    backgroundColor: '#000',
  },
  loginText: {
    marginTop: 20,
    color: '#888',
    textAlign: 'center',
  },
});