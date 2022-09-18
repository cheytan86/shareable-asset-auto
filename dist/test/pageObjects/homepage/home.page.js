"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../page"));
class HomePage extends page_1.default {
    get lableTitle() {
        let loc = driver.isAndroid ?
            '//*[@text="Fundraising"]' :
            '';
        return $(loc);
    }
}
exports.default = new HomePage();
