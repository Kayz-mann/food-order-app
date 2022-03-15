"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { StatusBar } from 'expo-status-bar';
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const react_navigation_stack_1 = require("react-navigation-stack");
const react_navigation_tabs_1 = require("react-navigation-tabs");
const HomeScreen_1 = require("./src/screens/HomeScreen");
const LandingScreen_1 = __importDefault(require("./src/screens/LandingScreen"));
const RestaurantScreen_1 = require("./src/screens/RestaurantScreen");
const FoodDetailScreen_1 = require("./src/screens/FoodDetailScreen");
const SearchScreen_1 = require("./src/screens/SearchScreen");
const CartScreen_1 = require("./src/screens/CartScreen");
const LoginScreen_1 = require("./src/screens/LoginScreen");
const OrderScreen_1 = require("./src/screens/OrderScreen");
const OrderDetailScreen_1 = require("./src/screens/OrderDetailScreen");
const AccountScreen_1 = require("./src/screens/AccountScreen");
const OfferScreen_1 = require("./src/screens/OfferScreen");
const LocationScreen_1 = require("./src/screens/LocationScreen");
const switchNavigator = (0, react_navigation_stack_1.createStackNavigator)({
    landingStack: {
        screen: (0, react_navigation_stack_1.createStackNavigator)({
            Landing: LandingScreen_1.default,
            LocationPage: LocationScreen_1.LocationScreen
        }, {
            defaultNavigationOptions: {
                headerShown: false
            }
        })
    },
    homeStack: (0, react_navigation_tabs_1.createBottomTabNavigator)({
        Home: {
            screen: (0, react_navigation_stack_1.createStackNavigator)({
                Homepage: HomeScreen_1.HomeScreen,
                SearchPage: SearchScreen_1.SearchScreen,
                RestaurantPage: RestaurantScreen_1.RestaurantScreen,
                FoodDetailPage: FoodDetailScreen_1.FoodDetailScreen,
                LocationPage: LocationScreen_1.LocationScreen
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png');
                    return <react_native_1.Image source={icon} style={styles.tabIcon}/>;
                }
            }
        },
        // offer Icon
        Offer: {
            screen: (0, react_navigation_stack_1.createStackNavigator)({
                Offerpage: OfferScreen_1.OfferScreen
            }, {
                defaultNavigationOptions: {
                    headerShown: false
                }
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png');
                    return <react_native_1.Image source={icon} style={styles.tabIcon}/>;
                }
            }
        },
        Cart: {
            screen: (0, react_navigation_stack_1.createStackNavigator)({
                Cartpage: CartScreen_1.CartScreen,
                Loginpage: LoginScreen_1.LoginScreen,
                OrderPage: OrderScreen_1.OrderScreen,
                OrderDetailsPage: OrderDetailScreen_1.OrderDetailScreen,
                CartOfferPage: OfferScreen_1.OfferScreen
            }, {
                defaultNavigationOptions: {
                    headerShown: false
                }
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png');
                    return <react_native_1.Image source={icon} style={styles.tabIcon}/>;
                }
            }
        },
        Account: {
            screen: (0, react_navigation_stack_1.createStackNavigator)({
                Accountpage: AccountScreen_1.AccountScreen,
                Loginpage: LoginScreen_1.LoginScreen,
                AccountOrderPage: OrderScreen_1.OrderScreen,
                OrderDetailPage: OrderDetailScreen_1.OrderDetailScreen
            }, {
                defaultNavigationOptions: {
                    headerShown: false
                }
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png');
                    return <react_native_1.Image source={icon} style={styles.tabIcon}/>;
                }
            }
        },
    })
});
const AppNavigation = (0, react_navigation_1.createAppContainer)(switchNavigator);
function App() {
    return (<react_native_1.View style={styles.container}>
       <AppNavigation />
    </react_native_1.View>);
}
exports.default = App;
const styles = react_native_1.StyleSheet.create({
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
//# sourceMappingURL=App.js.map