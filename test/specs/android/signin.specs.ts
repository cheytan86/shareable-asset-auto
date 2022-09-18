import SigninPage from '../../pageObjects/Signin/signin.page';
import VerifyEmailPage from '../../pageObjects/Signin/verifyemail.page';
import HomePage from '../../pageObjects/homepage/home.page';
import IMAPEmail from '../../../utils/email.util';

describe(`Test Suite Device: ${JSON.stringify(driver.capabilities).substring(JSON.stringify(driver.capabilities).search('deviceName')).split('"')[2]}`, function() {

    beforeEach(async function() {

    })

    it('User is able to login succesfully', async function() {
        await (await SigninPage.labelPageTitle).waitForDisplayed({timeout: 10000});

        await (await SigninPage.inputEmail).setValue('testcrm0108@gmail.com');
        // driver.openNotifications()

        await (await SigninPage.buttonNext).click();

        // await (await VerifyEmailPage.labelTitle).waitForDisplayed({timeout: 10000});
        // verify and click on email
        await IMAPEmail.verifyEmail('testcrm0108@gmail.com','zejvnnsmjpddhtbg','[SA] New Device Verification');
        // click on next button
        await (await VerifyEmailPage.buttonNext).click();
        await VerifyEmailPage.enterPasscode(['3','6','1','9','8','6']);
        await VerifyEmailPage.enterOneTimePassword();
        await (await HomePage.lableTitle).waitForDisplayed({timeout:  10000});
        await HomePage.wait(2);
    })

})