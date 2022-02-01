"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const screenWidth = react_native_1.Dimensions.get('screen').width;
const RestaurantCard = ({ item, onTap }) => {
    return (<react_native_1.TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <react_native_1.Image style={{
            width: screenWidth - 20,
            height: 220,
            borderRadius: 20,
            backgroundColor: '#eaeaea'
        }} source={{ uri: `${item.images[0]}` }}/>
            
      </react_native_1.TouchableOpacity>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: screenWidth - 26,
        height: 230,
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 30
    }
});
exports.default = RestaurantCard;
//# sourceMappingURL=RestaurantCard.js.map