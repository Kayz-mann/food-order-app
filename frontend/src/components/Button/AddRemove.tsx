import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface ButtonProps{
    onAdd: Function;
    unit: number;
    onRemove: Function
}


const AddRemove: React.FC<ButtonProps> = ({ onAdd, unit, onRemove }) => {
    
    if (unit > 0) {
        return (
            <View style={styles.optionView}>
                <TouchableOpacity style={styles.btnPlusMinus} onPress={() => onAdd()}>
                    <Text style={{ fontSize: 18, color: '#f14b5d'  }}>
                       +
                    </Text>
                </TouchableOpacity>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40 }}>
                    <Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', color: '#f14b5d' }}>
                        {unit}
                    </Text>
                </View>
                <TouchableOpacity style={styles.btnPlusMinus} onPress={() => onRemove()}>
                    <Text style={{ fontSize: 18, color: '#f14b5d' }}>
                       -
                    </Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <TouchableOpacity style={styles.btn}>
            <Text style={{ fontSize: 18, color: '#fff' }}>
                Add
            </Text>
        </TouchableOpacity>
       )
    }
    
    

}

const styles = StyleSheet.create({
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#f15b5b'
    },
    optionView: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 80,
        height: 40,
        alignSelf: 'center',
        borderRadius: 30,
    },
    btnPlusMinus: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f15b5b',
        borderRadius: 10,
        borderWidth: 0.3,
        height: 50,
        width: 30
    }
})

export default AddRemove;