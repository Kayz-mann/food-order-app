"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useNavigation = void 0;
const react_1 = require("react");
const react_navigation_1 = require("react-navigation");
function useNavigation() {
    return (0, react_1.useContext)(react_navigation_1.NavigationContext);
}
exports.useNavigation = useNavigation;
//# sourceMappingURL=useNavigation.js.map