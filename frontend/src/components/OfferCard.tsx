import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';

import { OfferModel } from '../redux/model';



interface OfferCardProps{
    item: OfferModel;
    onTapApply: Function;
    onTapRemove: Function;
    isApplied: boolean;

}


const OfferCard: React.FC<OfferCardProps> = ({ item, onTapApply, onTapRemove, isApplied }) => {


    return (
        <View style={styles.container}>
            <Image source={{ uri: `${item.images[0]}` }} style={{ width: Dimensions.get('screen').width - 20, height: 200, borderRadius: 20, backgroundColor: '#eaeaea' }} />
            <View style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={{ display: 'flex', flex: 7.5, padding: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700' }}>{item.title}</Text>
                    <Text style={{ fontSize: 12 }}>{item.description}</Text>
                </View>
                <View style={{ flexDirection: 'row', flex: 4.5, padding: 10 }}>
                    {isApplied ? 
                        <TouchableOpacity
                            onPress={() => onTapRemove(item)}
                            style={[styles.applyPromo, { backgroundColor: '#ff4673' }]}>
                           <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff'}}>Remove</Text>       
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={() => onTapApply(item)}
                            style={styles.applyPromo}>
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>Apply</Text>  
                            <Text style={{ fontSize: 13, fontWeight: '600', color: '#fff' }}>{item.promoCode}</Text> 
                        </TouchableOpacity>
                    }
                </View>
            </View>

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
        height: 270,
        justifyContent: 'flex-start',
        borderWidth: 1,
        // flexDirection: 'row'
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
    },
    applyPromo: {
        flexDirection: 'row',
        backgroundColor: '#8fc777',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    }
})

export default OfferCard;