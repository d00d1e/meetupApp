import puppeteer from 'puppeteer';


describe('Filter events by city', () => {
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

  test('Show upcoming events based on the users location by default', async () => {
    const events = await page.$('.event');
    expect(events).toBeDefined();
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    const suggestions = await page.$('.suggestions li');
    await page.type('.city', 'Boston')
    expect(suggestions).toBeDefined();
  });

  test('User can select a city from the suggested list', async () => {
    const suggestion = await page.$('.suggestions');
    expect(suggestion).toBeDefined();
    expect('.city').toBeDefined();
  });
});


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
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .detailsButton');
    const eventDetails = await page.$('event .eventDetails');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async() => {
    await page.click('.event .detailsButton');
    const eventDetails = await page.$('.event .eventDetails');
    expect(eventDetails).toBeNull();
  });
});