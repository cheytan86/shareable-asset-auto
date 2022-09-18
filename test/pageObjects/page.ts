/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open (path: string) {
        // return browser.url(`https://www.expressvpn.com/${path}`)
        browser.maximizeWindow();
        return browser.url(`https://www.expressvpn.com/${path}`);
    }

    wait(seconds: number) {
        const start = new Date().getTime();
        let end = start;
        while(end < start + seconds*1000) {
            end = new Date().getTime();
        }
    }

    inputText(obj:WebdriverIO.Element, value: any) {
    
        if(driver.isAndroid) {

        }
    }

    async SwipeHorizontally(anchorper: number,anchorstartper: number, endpointper: number) {
        const {height,width} =  await driver.getWindowSize();
        console.log('Height ' + height + ',width ' + width);
        const anchor = height * anchorper /100;
        const startPoint = width * anchorstartper /100;
        const endPoint = width * endpointper /100;
        await driver.touchPerform([
            {
                action: 'press',
                options: {
                    x: startPoint,
                    y: anchor
                }
            },
            {
                action: 'wait',
                options: {
                    ms: 1000
                }
            },
            {
                action: 'moveTo',
                options: {
                    x: endPoint,
                    y: anchor
                }
            },
            {
                action: 'release',
                options: {}
            }
        ])
    }

    async SwipeVertically(anchorper: number,anchorstartper: number, endpointper: number) {
        
        const {height} =  await driver.getWindowSize();
        const anchor = height * anchorper /100;
        const startPoint = height * anchorstartper /100;
        const endPoint = height * endpointper /100;

        await driver.touchPerform([
            {
                action: 'press',
                options: {
                    x: anchor,
                    y: startPoint
                }
            },
            {
                action: 'wait',
                options: {
                    ms: 1000
                }
            },
            {
                action: 'moveTo',
                options: {
                    x: anchor,
                    y: endPoint
                }
            },
            {
                action: 'release',
                options: {}
            }
        ])
    }
}
