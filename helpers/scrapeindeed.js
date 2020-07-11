const pupHelper = require('./puppeteerhelper');
const siteLink = 'https://www.indeed.com/q-nodejs-jobs.html';

module.exports = () => new Promise(async (resolve, reject) => {
  let browser;
  let results = [];
  try {
    const browser = await pupHelper.launchBrowser();
    const page = await pupHelper.launchPage(browser, true);
    await page.goto(siteLink, {timeout: 0, waitUntil: 'networkidle2'});
    await page.waitForSelector('td#resultsCol > .jobsearch-SerpJobCard > h2.title > a.jobtitle');

    results = await pupHelper.getTxtMultiple('td#resultsCol > .jobsearch-SerpJobCard > h2.title > a.jobtitle', page);

    await browser.close();
    resolve(results);
  } catch (error) {
    if (browser) await browser.close();
    console.log('Scrape Error: ', error);
    resolve(results);
  }
});