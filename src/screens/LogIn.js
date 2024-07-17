import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image,} from "react-native";
import { TextInput, Button, PaperProvider, Card,} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { auth } from '../config/firebase'; // Ajusta el path según tu estructura de proyecto
import { signInWithEmailAndPassword } from "firebase/auth";

//Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  //Constantes para el manejo de datos
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  //Constante de navegación entre pantallas
  const navigation = useNavigation();

  //Metodo para manejar el inicio de sesión de usuarios
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, correo, clave);
      const user = userCredential.user;
      console.log("User logged in: ", user);
      // Navegar a la pantalla principal o la que desees después del inicio de sesión
      navigation.navigate("Home"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
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
          <Card style={styles.profileCard}>
            <Card.Content>
              <Text style={styles.title}>Inicio de sesión </Text>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Correo electrónico:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="mail" size={24} color="#000" />
                    <TextInput
                      style={[styles.infoText, { color: '#000' }]}
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
                      style={[styles.infoText, { color: '#000' }]}
                      value={clave}
                      onChangeText={setClave}
                      secureTextEntry={true}
                      underlineColor="transparent"
                      theme={{ colors: { text: '#000', primary: '#000' }}}
                    />
                  </View>
                </View>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Button
                style={[styles.button, { backgroundColor: '#000' }]}
                mode="contained"
                onPress={handleLogin}
                labelStyle={{ color: '#fff' }}
              >
                Iniciar Sesión
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={[styles.loginText, { color: '#000' }]}>
                  ¿No tienes cuenta? Registrate aquí
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
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
  profileCard: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    padding: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: '#000',
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
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 20,
    borderRadius: 25,
  },
  loginText: {
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});