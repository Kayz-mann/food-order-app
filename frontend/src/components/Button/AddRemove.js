"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const AddRemove = ({ onAdd, unit, onRemove }) => {
    if (unit > 0) {
        return (<react_native_1.View style={styles.optionView}>
                <react_native_1.TouchableOpacity style={styles.btnPlusMinus} onPress={() => onAdd()}>
                    <react_native_1.Text style={{ fontSize: 18, color: '#f14b5d' }}>
                       +
                    </react_native_1.Text>
                </react_native_1.TouchableOpacity>
                <react_native_1.View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 40 }}>
                    <react_native_1.Text style={{ fontSize: 25, fontWeight: '600', textAlign: 'center', color: '#f14b5d' }}>
                        {unit}
                    </react_native_1.Text>
                </react_native_1.View>
                <react_native_1.TouchableOpacity style={styles.btnPlusMinus} onPress={() => onRemove()}>
                    <react_native_1.Text style={{ fontSize: 18, color: '#f14b5d' }}>
                       -
                    </react_native_1.Text>
                </react_native_1.TouchableOpacity>
            </react_native_1.View>);
    }
    else {
        return (<react_native_1.TouchableOpacity style={styles.btn}>
            <react_native_1.Text style={{ fontSize: 18, color: '#fff' }}>
                Add
            </react_native_1.Text>
        </react_native_1.TouchableOpacity>);
    }
};
const styles = react_native_1.StyleSheet.create({
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
});
exports.default = AddRemove;
//# sourceMappingURL=AddRemove.js.map