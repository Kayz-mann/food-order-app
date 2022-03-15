import React, { createRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { connect } from 'react-redux';

import ButtonWithTitle from '../components/Button/ButtonWithTitle';
import TextField from '../components/TextField';
import { onUserLogin, onUserSignup, onOTPRequest, onVerifyOTP } from '../redux/actions';
import { UserState } from '../redux/model';
import { ApplicationState } from '../redux/reducers';
import { useNavigation } from '../utils';


interface LoginProps {
  onUserLogin: Function,
  onUserSignup: Function,
  userReducer: UserState,
  onOTPRequest: Function,
  onVerifyOTP: Function,

}

const _LoginScreen: React.FC<LoginProps> = ({ onUserLogin, onUserSignup, userReducer, onOTPRequest, onVerifyOTP }) => {
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const [otp, setOtp ] = useState('');
  const [verified, setVerified] = useState(true);
  const [requestOtpTitle, setRequestOtpTitle] = useState('Requesst a New OTP in');
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  const onTapOptions = () => {
    setIsSignup(!isSignup)
    setTitle(!isSignup ? 'Signup' : 'Login')
  }

  const onTapAuthenticate = () => {
    if (isSignup) {
      onUserSignup(email, phone, password)
    } else {
      onUserLogin(email, password)
    }
  }

  let countDown: number;

  const { user } = userReducer;

  const { navigate } = useNavigation();




  useEffect(() => {
    if (user.token !== undefined) {
      if (user.verfied === true) {
        // navigate to cart page
        navigate('CartPage');
      } else {
        setVerified(user.verfied);
          // check for start timer
          onEnableOtpRequest();
      }
    }

    return () => {
      clearInterval(countDown)
    }
  })

  const onEnableOtpRequest = () => {
    // wait after 2 minutes to generate another OTP
    const otpDate = new Date();
    otpDate.setTime(new Date().getTime() + (2 * 60 * 1000))
    const otpTime = otpDate.getTime()

    countDown = window.setInterval(function () {
      const currentTime = new Date().getTime();
      const totalTime = otpTime - currentTime;

      let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((totalTime % (1000 * 60)) / (1000))
      
      setRequestOtpTitle(`Request a new OTP in ${minutes}: ${seconds}`)

      if (minutes < 1 && seconds < 1) {
        setRequestOtpTitle(`Request a new OTP`)
        setCanRequestOtp(true)
        clearInterval(countDown);
      }
    }, 1000);
  }

  const onTapVerify = () => {
    onVerifyOTP(otp, user)
  }

  const onTapRequestNewOTP = () => {
    setCanRequestOtp(false)
    onOTPRequest(user)
  }

 

  if(!verified){
    // show OTP page
    return(
      <View style={styles.container}>
          <View style={styles.body}>
              <Image source={require('../images/verify_otp.png')} 
                  style={{ width: 120, height: 120, margin: 20 }}
              />
              <Text style={{ fontSize: 22, fontWeight: '500', margin: 10}}>Verification</Text>
              <Text style={{ fontSize: 16, padding: 10, marginBottom: 20, color: '#716f6f'}}>
                    Enter your OTP
              </Text>
              <TextField isOTP={true} placeholder="OTP" onTextChange={() => {}} />
              <ButtonWithTitle title="Verify OTP" onTap={onTapVerify} width={340} height={50} />
              <ButtonWithTitle onTap={onTapRequestNewOTP} disable={!canRequestOtp} title={requestOtpTitle} isNoBg={true} width={430} height={50} />
           </View>
          <View style={styles.footer}></View>
      </View>
    )
    
  } else{
       return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Text style={{ fontSize: 30 }}>Login</Text>
        <View style={styles.body}>
          <TextField placeholder='Email' onTextChange={setEmail} />
          {isSignup && 
            <TextField placeholder='Phone' onTextChange={setPhone} />
          }
          <TextField placeholder='Password' onTextChange={setPassword} />
          <ButtonWithTitle title={title} onTap={onTapAuthenticate} width={340} height={50} />
          <ButtonWithTitle title={!isSignup ? "No Account? Signup Here" : "Have an Account? Login Here"} onTap={() => onTapOptions()} width={340} height={50} isNoBg={true} />
        </View>
        <View style={styles.footer}></View>
      </View>
    </View>
  );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  navigation: {
    flex: 1,
    paddingLeft: 50,
    paddingTop: 50
  },
  body: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    flex: 1
  }
})

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer
})

const LoginScreen = connect(mapStateToProps, {onUserLogin, onUserSignup, onVerifyOTP, onOTPRequest })(_LoginScreen)

export { LoginScreen };

