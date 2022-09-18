"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Page {
    open(path) {
        browser.maximizeWindow();
        return browser.url(`https://www.expressvpn.com/${path}`);
    }
    wait(seconds) {
        const start = new Date().getTime();
        let end = start;
        while (end < start + seconds * 1000) {
            end = new Date().getTime();
        }
    }
    inputText(obj, value) {
        if (driver.isAndroid) {
        }
    }
    async SwipeHorizontally(anchorper, anchorstartper, endpointper) {
        const { height, width } = await driver.getWindowSize();
        console.log('Height ' + height + ',width ' + width);
        const anchor = height * anchorper / 100;
        const startPoint = width * anchorstartper / 100;
        const endPoint = width * endpointper / 100;
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
        ]);
    }
    async SwipeVertically(anchorper, anchorstartper, endpointper) {
        const { height } = await driver.getWindowSize();
        const anchor = height * anchorper / 100;
        const startPoint = height * anchorstartper / 100;
        const endPoint = height * endpointper / 100;
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
        ]);
    }
}
exports.default = Page;
