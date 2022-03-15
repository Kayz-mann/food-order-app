import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Category } from "../redux/model";

interface CategoryProps{
    item: Category;
    onTap: Function;
}

const CategoryCard: React.FC<CategoryProps> = ({ item, onTap}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <Image source={{ uri: `${item.icon}`}} style={{ width: 120, height: 120, borderRadius: 20, backgroundColor: 'e5e5e5' }} />
            <Text style={{ fontSize: 14, marginTop: 10, color: '#858585' }}>
                {item.title}
            </Text>
        </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 140,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5
    }
})

export default CategoryCard;