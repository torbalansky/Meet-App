const puppeteer = require('puppeteer');

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
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      page = await browser.newPage();
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