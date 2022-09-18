"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const appRootDir = require('app-root-dir').get();
console.log(appRootDir);
const allure = require('allure-commandline');
exports.config = {
    runner: 'local',
    specs: [
        './test/specs/android/**/*.ts'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [
        {
            "platformName": "Android",
            "automationName": "UIAutomator2",
            "udid": "e64ba61d",
            "appPackage": 'com.bluewhale.sa',
            "appActivity": '.presentation.ui.auth.AuthActivity',
            deviceName: 'One Plus 7Pro',
            newCommandTimeout: 180
        },
    ],
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    port: 4723,
    services: [
        [
            'appium',
            {
                command: 'appium',
                logPath: './'
            }
        ],
    ],
    framework: 'mocha',
    reporters: [
        'dot',
        ['allure', {
                outputDir: 'allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
            }],
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000,
    },
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },
    },
    afterTest: async function (test, context, { error, result, duration, passed, retries }) {
        if (error) {
            console.log('Attaching screenshot');
            await browser.takeScreenshot();
        }
    },
    onComplete: function (exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report');
        const generation = allure(['generate', 'allure-results', '--clean']);
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(() => reject(reportError), 10000);
            generation.on('exit', function (exitCode) {
                clearTimeout(generationTimeout);
                if (exitCode !== 0) {
                    return reject(reportError);
                }
                console.log('Allure report successfully generated');
                resolve('success');
            });
        });
    },
};
