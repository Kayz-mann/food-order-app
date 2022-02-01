import React from 'react';
import { StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import { FoodModel, Restaurant } from '../redux/model';

const screenWidth = Dimensions.get('screen').width;

interface RestaurantProps{
    item: Restaurant | FoodModel;
    onTap: Function;
}

const RestaurantCard: React.FC<RestaurantProps> = ({ item, onTap }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <Image 
                style={{
                    width: screenWidth - 20,
                    height: 220,
                    borderRadius: 20,
                    backgroundColor: '#eaeaea'
                }}
                source={{ uri: `${item.images[0]}`}}
            />
            
      </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    container: {
        width: screenWidth - 26, 
        height: 230,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30
    }
})

export default RestaurantCard;