import puppeteer from 'puppeteer';

describe('show/hide an events details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch(
      // { headless: false, slowMo: 50 }
    );
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(async () => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const extra = await page.$('.event .extra');
    expect(extra).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .detailsButton');
    const extra = await page.$('event .extra');
    expect(extra).toBeDefined();
  });

  test('User can collapse an event to hide its details', async() => {
    await page.click('.event .detailsButton');
    const extra = await page.$('.event .extra');
    expect(extra).toBeNull();
  });
});