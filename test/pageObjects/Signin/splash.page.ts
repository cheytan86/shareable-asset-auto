import Page from '../page';

class SplashPage extends Page {

    get buttonOpenAccount() {
        let loc = driver.isAndroid ?
            '//*[@text="Open account now"]' :
            ''
        return $(loc);
    }
}