"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const signin_page_1 = __importDefault(require("../../pageObjects/Signin/signin.page"));
const verifyemail_page_1 = __importDefault(require("../../pageObjects/Signin/verifyemail.page"));
const home_page_1 = __importDefault(require("../../pageObjects/homepage/home.page"));
const email_util_1 = __importDefault(require("../../../utils/email.util"));
describe(`Test Suite Device: ${JSON.stringify(driver.capabilities).substring(JSON.stringify(driver.capabilities).search('deviceName')).split('"')[2]}`, function () {
    beforeEach(async function () {
    });
    it('User is able to login succesfully', async function () {
        await (await signin_page_1.default.labelPageTitle).waitForDisplayed({ timeout: 10000 });
        await (await signin_page_1.default.inputEmail).setValue('testcrm0108@gmail.com');
        await (await signin_page_1.default.buttonNext).click();
        await email_util_1.default.verifyEmail('testcrm0108@gmail.com', 'zejvnnsmjpddhtbg', '[SA] New Device Verification');
        await (await verifyemail_page_1.default.buttonNext).click();
        await verifyemail_page_1.default.enterPasscode(['3', '6', '1', '9', '8', '6']);
        await verifyemail_page_1.default.enterOneTimePassword();
        await (await home_page_1.default.lableTitle).waitForDisplayed({ timeout: 10000 });
        await home_page_1.default.wait(2);
    });
});
