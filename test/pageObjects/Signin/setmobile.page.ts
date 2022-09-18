import Page from '../page';

class SetMobilePage extends Page {

    get labelTitle() {
        const loc = driver.isAndroid ?
            '//*[@text="Set Mobile"]':
            '';
        return $(loc);
    }

    get inputEmail() {
        const loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/et_full_name"]':
            '';
        return $(loc);
    }

    get inputMobile() {
        const loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/et_mobile_number"]':
            '';
        return $(loc);
    }

    get buttonNext() {
        const loc = driver.isAndroid ?
            '//*[@resource-id="com.bluewhale.sa:id/bt_next_big"]':
            '';
        return $(loc);
    }
}