# 📱 Firebase Authentication en React Native Expo

## 👥 Integrantes
- Teresa Yessenia Ruiz González

## 📝 Descripción
Este proyecto implementa autenticación utilizando Firebase en una aplicación de React Native Expo. La autenticación es un componente esencial en muchas aplicaciones móviles, proporcionando una forma segura y confiable para que los usuarios accedan a sus cuentas.

## 🌐 Link de la aplicación
[Expo: Perfil3-Teresa](https://expo.dev/accounts/teresalaq/projects/perfil3-teresa/builds/73b4ce3d-e4f8-4561-8fc9-c740a77e5a60)

## 📄 Rubrica
[Rubrica](https://drive.google.com/file/d/1a7h3nx2e9xXJvK1GhzuKgdHRYBoa6g9z/preview)




import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../estilos/OfertasScreenStyles'; // Asegúrate de que la ruta es correcta

// Importa la imagen de "Promo" desde el directorio de imágenes
import PromoImage from '../img/ofertas.png'; // Ajusta la ruta según donde hayas guardado la imagen

const OfertasScreen = ({ navigation }) => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOfertas = async () => {
    try {
      const response = await fetch('https://example.com/api/getProductosConDescuento'); // Ajusta la URL según sea necesario
      const data = await response.json();
      if (data.status) {
        setOfertas(data.dataset);
      } else {
        setError('No hay ofertas disponibles');
      }
    } catch (error) {
      setError('Ocurrió un error al obtener las ofertas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfertas();
  }, []);

  const renderOfertaItem = ({ item }) => (
    <TouchableOpacity
      style={styles.ofertaCard}
      onPress={() => navigation.navigate('DetallesProducto', { producto: item })}
    >
      <Image source={{ uri: item.imagen }} style={styles.ofertaImage} />
      <View style={styles.ofertaDetails}>
        <Text style={styles.ofertaTitle}>{item.nombre_producto}</Text>
        <Text style={styles.ofertaDescription}>{item.nombre_descuento}</Text>
        <View style={styles.ofertaPriceContainer}>
          <Text style={styles.ofertaPrice}>${item.precio.toFixed(2)}</Text>
          {item.valor > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{item.valor}%</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Imagen de "Promo" */}
      <Image source={PromoImage} style={styles.promoImage} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorMessage}>{error}</Text>
      ) : ofertas.length === 0 ? (
        <Text style={styles.noOffersMessage}>No hay ofertas disponibles</Text>
      ) : (
        <FlatList
          data={ofertas}
          renderItem={renderOfertaItem}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  promoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  ofertaCard: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    elevation: 3,
  },
  ofertaImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  ofertaDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  ofertaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ofertaDescription: {
    fontSize: 14,
    color: '#666',
  },
  ofertaPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  ofertaPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  discountBadge: {
    backgroundColor: '#ff6f61',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 5,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorMessage: {
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  noOffersMessage: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});

export default OfertasScreen;
