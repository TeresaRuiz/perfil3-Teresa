import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image,} from "react-native";
import {
  TextInput,
  Button,
  PaperProvider,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from '../config/firebase'; // Ajusta el path según tu estructura de proyecto
import { createUserWithEmailAndPassword } from "firebase/auth";

// Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const SignUp = () => {
  // Constantes para el manejo de datos
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");

  // Constante de navegación entre pantallas
  const navigation = useNavigation();

  // Método para manejar el registro de usuarios
  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;
      console.log("User registered: ", user);
      // Puedes redirigir al usuario a otra pantalla después del registro
      navigation.navigate("Home"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert("Error de red. Por favor, verifica tu conexión a Internet.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  // Limpiar campos al montar el componente
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCorreo('');
      setClave('');
    });

    return unsubscribe;
  }, [navigation]);
  
  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Registrarse</Text>
            <View style={styles.inputContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Correo electrónico:</Text>
                <View style={styles.rowContent}>
                  <AntDesign name="mail" size={24} color="#000" />
                  <TextInput
                    style={styles.infoText}
                    value={correo}
                    onChangeText={setCorreo}
                    keyboardType="email-address"
                    underlineColor="transparent"
                    theme={{ colors: { text: '#000', primary: '#000' }}}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Clave del cliente:</Text>
                <View style={styles.rowContent}>
                  <Entypo name="lock" size={24} color="#000" />
                  <TextInput
                    style={styles.infoText}
                    value={clave}
                    onChangeText={setClave}
                    secureTextEntry={true}
                    underlineColor="transparent"
                    theme={{ colors: { text: '#000', primary: '#000' }}}
                  />
                </View>
              </View>
            </View>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleRegister}
              labelStyle={{ color: '#fff' }}
            >
              Registrarse
            </Button>
            <TouchableOpacity
              onPress={() => navigation.navigate("LogIn")} // Ajusta el nombre de la pantalla de inicio de sesión
            >
              <Text style={styles.loginText}>
                ¿Ya tienes cuenta? Inicia sesión aquí
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 60,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.15,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: "#000",
    marginBottom: 5,
  },
  infoRow: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#fff",
    width: "100%",
    borderWidth: 1,
    borderColor: '#000',
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 0,
    flex: 1,
    color: "#000",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 20,
    backgroundColor: "#000",
    borderRadius: 25,
  },
  loginText: {
    marginTop: 20,
    color: "#000",
    textAlign: 'center',
  },
})