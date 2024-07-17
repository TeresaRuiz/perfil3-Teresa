import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert } from 'react-native';
import { database, storage } from '../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import * as ImagePicker from 'expo-image-picker';

// Componente Add para agregar un nuevo producto
const Add = ({ navigation }) => {
    // Estado inicial del producto
    const [producto, setProducto] = useState({
        nombre: '',
        precio: 0,
        vendido: false,
        creado: new Date(),
        imagen: ''
    });

    // Función para navegar a la pantalla de inicio
    const goToHome = () => {
        navigation.navigate('Home');
    };

    // Función para abrir la galería de imágenes del dispositivo
    const openGalery = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [8, 8],
                quality: 1,
            });

            if (!result.canceled && result.assets.length > 0) {
                setProducto({
                    ...producto,
                    imagen: result.assets[0].uri
                });
                console.log('Imagen seleccionada:', result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error al abrir la galería', error);
        }
    };

    // Función para agregar el producto a Firestore
    const agregarProducto = async () => {
        try {
            let imageUrl = null;

            if (producto.imagen) {
                console.log('Subiendo imagen a Firebase Storage...');
                const imageRef = ref(storage, `images/${Date.now()}-${producto.nombre}`);

                const response = await fetch(producto.imagen);
                const blob = await response.blob();

                console.log('Antes del uploadBytes');
                const snapshot = await uploadBytes(imageRef, blob);
                console.log('Snapshot después del uploadBytes:', snapshot);

                imageUrl = await getDownloadURL(snapshot.ref);
                console.log("URL de la imagen:", imageUrl);
            }

            console.log('Datos del producto:', { ...producto, imagen: imageUrl });
            await addDoc(collection(database, 'productos'), { ...producto, imagen: imageUrl });
            console.log('Se guardó la colección');

            Alert.alert('Producto agregado', 'El producto se agregó correctamente', [
                { text: 'Ok', onPress: goToHome },
            ]);

            goToHome();
        } catch (error) {
            console.error('Error al agregar el producto', error);
            Alert.alert('Error', 'Ocurrió un error al agregar el producto. Por favor, intenta nuevamente.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Agregar producto</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Nombre:</Text>
                <TextInput
                    style={[styles.input, { borderRadius: 10 }]}
                    onChangeText={text => setProducto({ ...producto, nombre: text })}
                    value={producto.nombre}
                    placeholderTextColor="#999"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Precio:</Text>
                <TextInput
                    style={[styles.input, { borderRadius: 10 }]}
                    onChangeText={text => setProducto({ ...producto, precio: parseFloat(text) })}
                    value={producto.precio}
                    keyboardType='numeric'
                    placeholderTextColor="#999"
                />
            </View>
            <Text style={styles.label}>Imagen:</Text>
            <TouchableOpacity onPress={openGalery} style={[styles.imagePicker, { borderRadius: 10 }]}>
                <Text style={[styles.imagePickerText, { color: '#fff' }]}>Seleccionar imagen</Text>
            </TouchableOpacity>
            {producto.imagen ? <Image source={{ uri: producto.imagen }} style={styles.imagePreview} /> : null}

            <TouchableOpacity style={[styles.button, { borderRadius: 10 }]} onPress={agregarProducto}>
                <Text style={[styles.buttonText, { color: '#fff' }]}>Agregar producto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { borderRadius: 10 }]} onPress={goToHome}>
                <Text style={[styles.buttonText, { color: '#fff' }]}>Volver a home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Add;

// Estilos del componente
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#000',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000',
    },
    input: {
        height: 50,
        borderColor: '#000',
        borderWidth: 2,
        paddingLeft: 12,
        backgroundColor: '#fff',
        color: '#000',
        width: '100%',
    },
    imagePicker: {
        padding: 12,
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#000',
        width: '100%',
    },
    imagePickerText: {
        fontWeight: 'bold',
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    button: {
        padding: 12,
        backgroundColor: '#000',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontWeight: 'bold',
    },
})