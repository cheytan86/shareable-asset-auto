import Page from '../page';

class VerifyEmailPage extends Page {
    
    get labelTitle() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/tv_title"]' :
            '';
        return $(loc);
    }

    get buttonNext() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_next"]' :
            '';
        return $(loc);
    }

    get buttonNumKeys() {
        let loc = driver.isAndroid ?
            '//*[contains(@resource-id,"com.bluewhale.sa:id/keypad_")]':
            ''
        return $$(loc);
    }

    get buttonNumText0() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/keypad_0"]' :
            '';
        return $(loc);
    }

    get buttonNumText1() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/keypad_1"]' :
            '';
        return $(loc);
    }

    get buttonMarkAsRead() {
        let loc = driver.isAndroid ?
            '//*[@text="MARK AS READ"]':
            '';
        return $(loc);
    }

    get buttonClearAll() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.android.systemui:id/dismiss_text"]':
            '';
        return $(loc);
    }

    get buttonResend() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/v_otp_resend"]':
            '';
        return $(loc);
    }

    get labelDate() {
        let loc = driver.isAndroid ? 
            '//*[@resource-id="com.android.systemui:id/date"]':
            ''
        return $(loc);
    }

    get labelMessageText() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="android:id/message_text"]':
            '';
        return $(loc);
    }

    async enterPasscode(input: string[]) {
        
        for(let num of input) {
            let locs = await this.buttonNumKeys;
            for(let obj of locs) {
                let text = await obj.getText();
                console.log('Keypad number:' + text);
                if(text.includes(num)) {
                    await obj.click();
                    console.log('Number pressed:' + num);
                    break;
                }
            }
        }
    }

    async enterOneTimePassword() {
        await driver.openNotifications();
        await (await this.labelDate).waitForDisplayed({timeout: 10000});
        await this.wait(4);
        await (await this.buttonMarkAsRead).waitForDisplayed({timeout: 30000});
        // if(!await (await this.labelMessageText).isDisplayed()) {
        //     await (await this.buttonMarkAsRead).click();
        // }
        let text = await (await this.labelMessageText).getText();
        console.log('OTP Message:' + text);
        let otpNum = text.match(/\d+/)[0];
        console.log('OTP Code:' + otpNum);
        await (await this.buttonClearAll).click();
        await (await this.buttonResend).waitForDisplayed({timeout: 10000});
        for(let i = 0; i < otpNum.length; i++) {
            let num = otpNum.charAt(i);
            let locs = await this.buttonNumKeys;
            console.log('Key to Press' + num);
            for(let obj of locs) {
                let text = await obj.getText();
                console.log('Keypad number:' + text);
                if(text.includes(num)) {
                    await obj.click();
                    console.log('Number pressed:' + num);
                    break;
                }
            }
        }
        
    }
}

export default new VerifyEmailPage();