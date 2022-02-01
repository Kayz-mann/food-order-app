import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface TextFieldProps {
    placeholder: string;
    isSecure?: boolean;
    onTextChange: Function;
    isOTP?: boolean;
}


const TextField: React.FC<TextFieldProps> = ({ placeholder, isSecure = true, onTextChange, isOTP = false }) => {
    
    if (isOTP) {
        return (
            <View style={styles.container}>
                <TextInput
                    maxLength={6}
                    placeholder={placeholder}
                    autoCapitalize='none'
                    secureTextEntry={isSecure}
                    onChangeText={(text) => onTextChange(text)}
                    style={styles.otpTextField}
                />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder={placeholder}
                    autoCapitalize='none'
                    secureTextEntry={isSecure}
                    onChangeText={(text) => onTextChange(text)}
                    style={styles.textField}
                />
          </View>
      );
    }
   
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#080808',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingRight: 10,
        paddingLeft: 20
    },
    
    textField: {
        flex: 1,
        width: '100%',
        height: 50,
        fontSize: 20,
        color: '#000'
    },
    otpTextField: {
        flex: 1,
        width: 320,
        height: 50,
        fontSize: 30,
        color: '#000',
        textAlign: 'center'
    }
})

export default TextField;