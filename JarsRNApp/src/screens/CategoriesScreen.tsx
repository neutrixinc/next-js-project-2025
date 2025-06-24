import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../navigation/types';

type Props = BottomTabScreenProps<MainTabParamList, 'Categories'>;

interface Category {
  id: string;
  name: string;
  itemCount: number;
}

const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', itemCount: 150 },
  { id: '2', name: 'Clothing', itemCount: 300 },
  { id: '3', name: 'Home & Garden', itemCount: 200 },
  { id: '4', name: 'Sports', itemCount: 100 },
  { id: '5', name: 'Books', itemCount: 250 },
  { id: '6', name: 'Beauty', itemCount: 180 },
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
  <TouchableOpacity style={styles.categoryCard}>
    <View style={styles.categoryContent}>
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.itemCount}>{category.itemCount} items</Text>
    </View>
  </TouchableOpacity>
);

const CategoriesScreen: React.FC<Props> = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.categoriesGrid}>
          {mockCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
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
  header: {
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollContent: {
    padding: 16,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryContent: {
    padding: 16,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
});

export default CategoriesScreen;
