"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const CategoryCard = ({ item, onTap }) => {
    return (<react_native_1.TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <react_native_1.Image source={{ uri: `${item.icon}` }} style={{ width: 120, height: 120, borderRadius: 20, backgroundColor: 'e5e5e5' }}/>
            <react_native_1.Text style={{ fontSize: 14, marginTop: 10, color: '#858585' }}>
                {item.title}
            </react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
const styles = react_native_1.StyleSheet.create({
    container: {
        width: 120,
        height: 140,
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: 5
    }
});
exports.default = CategoryCard;
//# sourceMappingURL=CategoryCard.js.map