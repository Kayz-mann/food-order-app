// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';



import { HomeScreen } from './src/screens/HomeScreen';
import LandingScreen from './src/screens/LandingScreen';
import {RestaurantScreen} from './src/screens/RestaurantScreen';
import {FoodDetailScreen} from './src/screens/FoodDetailScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { CartScreen } from './src/screens/CartScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { OrderScreen } from './src/screens/OrderScreen';
import { OrderDetailScreen } from './src/screens/OrderDetailScreen';
import { AccountScreen } from './src/screens/AccountScreen';
import { OfferScreen } from './src/screens/OfferScreen';
import {LocationScreen} from './src/screens/LocationScreen';
import { PUBLISHABLE_KEY } from './config';
// import {StripeProvider}  from '@stripe/stripe-react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store' 

import { StripeProvider as _StripeProvider } from '@stripe/stripe-react-native';
import type { Props as StripeProviderProps } from '@stripe/stripe-react-native/lib/typescript/src/components/StripeProvider'
const StripeProvider = _StripeProvider as React.FC<StripeProviderProps>;









const switchNavigator = createStackNavigator({
  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
      LocationPage: LocationScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },

  homeStack: createBottomTabNavigator({
    Home: {
      screen: createStackNavigator({
        Homepage: HomeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailPage: FoodDetailScreen,
        LocationPage: LocationScreen
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    // offer Icon
    Offer: {
      screen: createStackNavigator({
        Offerpage: OfferScreen
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Cart: {
      screen: createStackNavigator({
        Cartpage: CartScreen,
        Loginpage: LoginScreen,
        OrderPage: OrderScreen,
        OrderDetailsPage: OrderDetailScreen,
        CartOfferPage: OfferScreen
      },
        {
          defaultNavigationOptions: {
            headerShown: false
          }
        }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    Account: {
      screen: createStackNavigator({
        Accountpage: AccountScreen,
        Loginpage: LoginScreen,
        AccountOrderPage: OrderScreen,
        OrderDetailPage: OrderDetailScreen
      
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }
      ),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
  })
});

interface AppProps {
  props: any
}

const AppNavigation = createAppContainer(switchNavigator);

export default function App(): JSX.Element | any {
  return (
 <>
      <Provider store={store}>
      <StripeProvider
        publishableKey= {PUBLISHABLE_KEY}
        merchantIdentifier='com.kayzmann.online_store_app'
        threeDSecureParams={{
        backgroundColor: '#FFF',
          timeout: 3,

        }}
      >
        {/* <AppNavigation /> */}
        </StripeProvider>
      </Provider>
   </>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    height: 20,
    width: 20
  }
});


