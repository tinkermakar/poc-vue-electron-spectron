
import spectron from 'spectron'
import { testWithSpectron } from 'vue-cli-plugin-electron-builder'

let spectronApp;

beforeAll(async () => {
  const { app, stopServe } = await testWithSpectron(spectron, {
    forceDev: true
  });
  spectronApp = { app, stopServe };
});

afterAll(async () => {
  await spectronApp.stopServe();
}, 5000);

// Test with Spectron
test("Window loads properly", async () => {
  const { app } = spectronApp;
  const win = app.browserWindow;
  // Window is up and running
  expect(await app.isRunning()).toBe(true);
  expect(await app.client.getWindowCount()).toBe(1);
  expect(await win.isMinimized()).toBe(false);
  expect(await win.isVisible()).toBe(true);

  // Size is correct
  const { width, height } = await win.getBounds();
  expect(width).toBeGreaterThan(0);
  expect(height).toBeGreaterThan(0);

  // App is loaded properly
  expect(
    /Welcome to Your Vue\.js (\+ TypeScript )?App/.test(
      await (await app.client.$('#app')).getHTML()
    )
  ).toBe(true)
});

// Test with Puppeteer
test('should be titled "About"', async () => {
  await page.goto('https://digitalregulation.org');
  await page.click('.menu-item-702');

  await page.waitForSelector('h1');

  const html = await page.$eval('h1', el => el.innerHTML);

  expect(html.trim()).toBe('About');
}, 50000);
