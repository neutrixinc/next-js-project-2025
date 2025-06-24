import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

const ProductDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;

  // TODO: Fetch product details by id

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image
          source={{ uri: 'https://via.placeholder.com/400' }}
          style={styles.productImage}
          resizeMode="contain"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.productTitle}>Product Title</Text>
          <Text style={styles.productPrice}>$99.99</Text>
          <Text style={styles.productDescription}>
            This is a detailed description of the product. It highlights features, specifications, and other relevant information.
          </Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={() => {/* Add to cart logic */}}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  productPrice: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;
