const puppeteer = require('puppeteer');
const { kebabCase, deburr } = require('lodash');

const sessions = require('../src/data/sessions');

async function main() {
  puppeteer.launch().then(async browser => {
    try {
      const page = await browser.newPage();

      const sessionsArray = Object.values(sessions)
      for (let i = 0; i < sessionsArray.length; i++) {
        const session = sessionsArray[i];
        console.log(`screenshot: (${session.id}) ${session.title}`)
        await page.goto(`http://localhost:3000?id=${session.id}`);

        const elements = await page.$$(`#thumbnail-${session.id}`);

        const filename = deburr(kebabCase(session.title).substring(0, 40));
        await elements[0].screenshot({ path: `screenshots/${filename}.png` });
      }

      await browser.close();
    } catch (e) {
      console.error(e)
    }
  }).catch((e) => {
    console.error(e)
  });
}

main();