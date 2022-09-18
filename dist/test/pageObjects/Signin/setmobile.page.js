"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../page"));
class SetMobilePage extends page_1.default {
    get labelTitle() {
        const loc = driver.isAndroid ?
            '//*[@text="Set Mobile"]' :
            '';
        return $(loc);
    }
    get inputEmail() {
        const loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/et_full_name"]' :
            '';
        return $(loc);
    }
    get inputMobile() {
        const loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/et_mobile_number"]' :
            '';
        return $(loc);
    }
    get buttonNext() {
        const loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_next_big"]' :
            '';
        return $(loc);
    }
}
