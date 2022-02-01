// import { StatusBar } from 'expo-status-bar';
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




const switchNavigator = createStackNavigator({
  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
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
        FoodDetailPage: FoodDetailScreen
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
        Offerpage: HomeScreen
      }),
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
        Accountpage: HomeScreen,
        Loginpage: LoginScreen
      
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor }) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png');
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
  })
})

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <View style={styles.container}>
       <AppNavigation />
    </View>
  );
}

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

// 6:51
