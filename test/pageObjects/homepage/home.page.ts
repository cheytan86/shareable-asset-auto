import Page from '../page';

class HomePage extends Page {

    get lableTitle() {
        let loc = driver.isAndroid ?
            '//*[@text="Fundraising"]':
            ''
        return $(loc)
    }
}

export default new HomePage();