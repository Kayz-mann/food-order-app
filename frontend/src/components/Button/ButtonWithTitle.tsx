import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import { ImageSourcePropType } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
    onTap: Function;
    width: number;
    height: number;
    icon?: ImageSourcePropType;
    title: string;
    isNoBg?: boolean;
    disable?: boolean;
}


const ButtonWithTitle: React.FC<ButtonProps> = ({ onTap, width, height, title, isNoBg, disable= false }) => {

    if (isNoBg) {
        return (
            <TouchableOpacity disabled={disable} style={[styles.btn, { width, height , backgroundColor: 'transparent'}]}
                onPress={() => onTap()}
            >
                <Text style={{ fontSize: 20, color: disable? '#6f6f6f' : '#fff' }}>{title}</Text>
          </TouchableOpacity>
      );  
    } else {
        return (
            <TouchableOpacity style={[styles.btn, { width, height }]}
            onPress={() => onTap()}
        >
            <Text style={{ fontSize: 20, color: '#fff' }}>{title}</Text>
      </TouchableOpacity>
        )
    }
   
}

export default ButtonWithTitle;

const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f14b5d',
        width: 40,
        height: 50,
        marginTop: 20,
        borderRadius: 30,
        alignSelf: 'center'
    }
})

