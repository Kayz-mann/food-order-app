import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { ImageSourcePropType } from "react-native";
import { TouchableOpacity } from 'react-native-gesture-handler';

interface ButtonProps {
    onTap: Function;
    width: number;
    height: number;
    icon: ImageSourcePropType
}


const ButtonWithIcon: React.FC<ButtonProps> = ({ onTap, icon, width, height }) => {
    return (
        <TouchableOpacity style={[styles.btn, { width, height }]}
            onPress={() => onTap()}
        >
           <Image style={{ width: (width - 2), height: (height - 2)}}  source={icon} />
      </TouchableOpacity>
  );
}

export default ButtonWithIcon;

const styles = StyleSheet.create({
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        borderRadius: 30,
        alignSelf: 'center'
    }
})

