// Importación de bibliotecas y componentes necesarios
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database } from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import CardProductos from '../components/CardProductos'; // Importa el componente de tarjeta de producto

// Definición del componente principal Home
const Home = ({ navigation }) => {
    // Definición del estado local para almacenar los productos
    const [productos, setProductos] = useState([]);

    // useEffect se ejecuta cuando el componente se monta
    useEffect(() => {
        // Define una consulta a la colección 'productos' en Firestore, ordenada por el campo 'creado' en orden descendente
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        
        // Escucha cambios en la consulta de Firestore en tiempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                // Empuja cada documento con su ID a la lista de docs
                docs.push({ id: doc.id, ...doc.data() });
            });
            // Actualiza el estado de productos con los datos recibidos
            setProductos(docs);
        });

        // Limpieza de la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    // Función para navegar a la pantalla 'Add'
    const goToAdd = () => { 
        navigation.navigate('Add');
    }

    // Función para navegar a la pantalla 'Login'
    const goLogin = () => { 
        navigation.navigate('LogIn');
    }

    // Función que renderiza cada item de la lista
    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
            imagen={item.imagen}
        />
    );

    // Renderiza la interfaz del componente Home
    return (
        <View style={styles.container}>
             <Text style={styles.title}></Text>
            <Text style={styles.title}>Productos disponibles</Text>

            {/* Muestra la lista de productos si hay elementos, de lo contrario muestra un mensaje */}
            {
                productos.length !== 0 ?
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
                : 
                <Text style={styles.Subtitle}>No hay productos disponibles</Text>
            }

            {/* Botón para navegar a la pantalla de agregar productos */}
            <TouchableOpacity
                style={styles.Button}
                onPress={goToAdd}>
                <Text style={styles.ButtonText}>Agregar producto</Text>
            </TouchableOpacity>
            {/* Botón para cerrar sesión */}
            <TouchableOpacity
                style={[styles.Button, styles.LogoutButton]}
                onPress={goLogin}>
                <Text style={[styles.ButtonText, styles.LogoutButtonText]}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

// Exporta el componente Home como predeterminado
export default Home;

// Estilos para el componente Home
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    Subtitle: {
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 10,
        color: '#888',
    },
    Button: {
        backgroundColor: '#333',
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
        marginHorizontal: 50,
        paddingVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 3,
    },
    ButtonText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
    LogoutButton: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#333',
    },
    LogoutButtonText: {
        color: '#333',
    },
    list: {
        flexGrow: 1,
    },
});
