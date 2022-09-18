"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const page_1 = __importDefault(require("../page"));
class SigninPage extends page_1.default {
    get labelPageTitle() {
        let loc = driver.isAndroid ?
            '//*[@text="Enter your email"]' :
            '';
        return $(loc);
    }
    get buttonNext() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_next_big"]' :
            '';
        return $(loc);
    }
    get inputEmail() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/et_email"]' :
            '';
        return $(loc);
    }
    get linkNewsNotInterested() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_no"]' :
            '';
        return $(loc);
    }
    get buttonStayTuned() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_yes]' :
            '';
        return $(loc);
    }
}
exports.default = new SigninPage();
