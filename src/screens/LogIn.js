import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from "react-native";
import { TextInput, Button, PaperProvider, Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { authentication } from '../config/firebase';
import { signInWithEmailAndPassword } from "firebase/auth";

const windowHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, correo, clave);
      const user = userCredential.user;
      console.log("User logged in: ", user);
      // Navegar a la pantalla principal o la que desees después del inicio de sesión
      navigation.navigate("Home"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

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
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Inicio de sesión</Text>
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
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleLogin}
              >
                Iniciar sesión
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.registerText}>
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
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
  registerText: {
    marginTop: 20,
    color: '#888',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});