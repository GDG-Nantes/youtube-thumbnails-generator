const fs = require("fs");
const puppeteer = require("puppeteer");
const { kebabCase, deburr } = require("lodash");

const contents = fs.readFileSync("../src/data/site.json");
const sessions = JSON.parse(contents).sessions;

async function main() {
  puppeteer
    .launch()
    .then(async browser => {
      try {
        const page = await browser.newPage();

        for (let i = 0; i < sessions.length; i++) {
          const session = sessions[i];
          console.log(`screenshot: (${session.key}) ${session.title}`);
          await page.goto(`http://localhost:3000?id=${session.key}&type=feedback`);

          const elements = await page.$$(`#thumbnail-${session.key}`);

          const filename = deburr(kebabCase(session.title).substring(0, 40));
          await elements[0].screenshot({ path: `screenshots/${filename}.png` });
        }

        await browser.close();
      } catch (e) {
        console.error(e);
      }
    })
    .catch(e => {
      console.error(e);
    });
}

main();
