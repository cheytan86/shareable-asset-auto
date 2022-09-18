import Page from '../page';

class SigninPage extends Page {

    get labelPageTitle() {
        let loc = driver.isAndroid ?
            '//*[@text="Enter your email"]':
            '';
        return $(loc);
    }

    get buttonNext() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_next_big"]' :
            ''
        return $(loc);
    }

    get inputEmail() {
        let loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/et_email"]' :
            ''
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

export default new SigninPage();