
import spectron from 'spectron'
import { testWithSpectron } from 'vue-cli-plugin-electron-builder'


// Copied from https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/testingAndDebugging.html#testing
jest.setTimeout(50000)
test('Window Loads Properly', async () => {
  // Wait for dev server to start
  const { app, stopServe } = await testWithSpectron(spectron)
  const win = app.browserWindow
  const client = app.client

  // Window was created
  expect(await client.getWindowCount()).toBe(1)
  // It is not minimized
  expect(await win.isMinimized()).toBe(false)
  // Window is visible
  expect(await win.isVisible()).toBe(true)
  // Size is correct
  const { width, height } = await win.getBounds()
  expect(width).toBeGreaterThan(0)
  expect(height).toBeGreaterThan(0)
  // App is loaded properly
  expect(
    /Welcome to Your Vue\.js (\+ TypeScript )?App/.test(
      await (await app.client.$('#app')).getHTML()
    )
  ).toBe(true)

  await stopServe()
})

// Custom added
test('Installed CLI Plugins found', async () => {
  // Wait for dev server to start
  const { app, stopServe } = await testWithSpectron(spectron)

  const h3Heading = await (await app.client.$('h3')).getText()

  expect(h3Heading.trim()).toBe('Installed CLI Plugins');


  await stopServe()
})