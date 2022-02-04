import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';

import { FoodModel } from '../redux/model';
import AddRemove from '../components/Button/AddRemove';


interface FoodCardProps{
    item: FoodModel;
    onTap: Function;
    onUpdateCart: Function;
    unit?: number | undefined;
}


const FoodCard: React.FC<FoodCardProps> = ({ item, onTap, onUpdateCart, unit }) => {

    const didUpdateCart = (unit: number) => {
        item.unit = unit;
        onUpdateCart(item)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => onTap(item)}
                style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'row'
                }}>
                <View style={{ display: 'flex', flex: 4, padding: 10, justifyContent: 'space-around', alignItems: 'center' }}>
                    <Text>{item.name}</Text>
                    <Text>{item.category}</Text>
                </View>
                <View style={{
                    display: 'flex',
                    flex: 4,
                    padding: 10,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginRight: 10
                }}>
                    <Text style={{ fontSize: 18, fontWeight: '600', color: '#7c7c7c' }}>
                        ${item.price}
                    </Text>
                    {unit !== undefined ? 
                        <Text style={{ fontSize: 18, fontWeight: '700' }}>
                            Qty: {unit}
                        </Text>
                        :

                        <AddRemove onAdd={() => {
                            let unit = isNaN(item.unit) ? 0 : item.unit
                            didUpdateCart(unit + 1);
                        }}
                            onRemove={() => {
                                let unit = isNaN(item.unit) ? 0 : item.unit
                                didUpdateCart(unit > 0 ? unit - 1 : unit);
                            }}
                            unit={item.unit} />
                    }
                  
                </View>
            </TouchableOpacity>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: '#e5e5e5',
        width: Dimensions.get('screen').width - 20,
        margin: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        height: 100,
        justifyContent: 'flex-start',
        borderWidth: 1,
        flexDirection: 'row'
    },
    navigation: {
        flex: 2,
        backgroundColor: 'red'
    },
    body: {
        flex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    footer: {
        flex: 1,
        backgroundColor: 'cyan'
    }
})

export default FoodCard;