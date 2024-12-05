const puppeteer = require('puppeteer');
const config = require('../auth-server/config.json');

describe('show/hide an event details', () => {
  let browser;
  let page;
  jest.setTimeout(30000);

  beforeAll(async () => {
    try {
      console.log('Launching browser...');
      browser = await puppeteer.launch({
        headless: false,
        slowMo: 250,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      page = await browser.newPage();

      // Set up credentials in localStorage
      await page.evaluateOnNewDocument((config) => {
        localStorage.setItem('CLIENT_ID', config.CLIENT_ID);
        localStorage.setItem('CLIENT_SECRET', config.CLIENT_SECRET);
        localStorage.setItem('PROJECT_ID', config.PROJECT_ID);
        localStorage.setItem('CALENDAR_ID', config.CALENDAR_ID);
      }, config);

      console.log('Navigating to page...');
      await page.goto('http://localhost:3000/meet');
      console.log('Waiting for event selector...');
      await page.waitForSelector('.event', { timeout: 60000 });
    } catch (err) {
      console.error('Error during setup:', err);
    }
  });

  afterAll(async () => {
    try {
      await browser.close();
    } catch (err) {
      console.error('Error closing browser:', err);
    }
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });
});