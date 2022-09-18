const appRootDir = require('app-root-dir').get();
console.log(appRootDir);
const allure = require('allure-commandline');

export const config: WebdriverIO.Config = {

    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    // Specify Test Files
    specs: [
        './test/specs/android/**/*.ts'
    ],
    // Patterns to exclude.
    exclude: [
        // 'path/to/excluded/files'
    ],

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
            // for parallel execution we will need mltiple instances of appium running
            // "systemPort": 6001, 
            // "port": 6000,
        },
        // {
        //     // for parallel execution
        //     "platformName": "Android",
        //     "automationName": "UIAutomator2",
        //     "udid": "emulator-5554",
        //     "appPackage": 'com.wdiodemoapp',
        //     "appActivity": '.MainActivity',
        //     // for parallele execution we will need
        //     // "systemPort": 7001, 
        //     // "port": 7000,
        //     // "deviceName": ''
        // },
    ],

    logLevel: 'warn', //'info',

    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    
    baseUrl: 'http://localhost',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: 10000,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 120000,
    //
    // Default request retries count
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

    // services: ['chromedriver','browserstack'],
    
    framework: 'mocha',
    
    reporters: [
        'dot',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }],
    ],
    
    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000,
        // reporterOptions: {
        //     reportFilename: 'result',
        //     quiet: true,
        //     code: false,
        // },
        // require: [''],
    },

    autoCompileOpts: {
        autoCompile: true,
        // see https://github.com/TypeStrong/ts-node#cli-and-programmatic-options
        // for all available options
        tsNodeOpts: {
            transpileOnly: true,
            project: 'tsconfig.json'
        },
    },
 
    // =====
    // Hooks
    // =====
    // onPrepare: function (config, capabilities) {
    // },
    
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            console.log('Attaching screenshot')
            await browser.takeScreenshot();
        }
    },

    onComplete: function(exitCode, config, capabilities, results) {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure-results', '--clean'])
        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                10000)

            generation.on('exit', function (exitCode:any) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve('success')
            })
        })
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}