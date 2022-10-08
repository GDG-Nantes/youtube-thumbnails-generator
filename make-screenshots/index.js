const fs = require("fs");
const puppeteer = require("puppeteer");
const { kebabCase, deburr } = require("lodash");

const contents = fs.readFileSync("../src/data/site.json");
const sessions = JSON.parse(contents).sessions;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (let i = 0; i < sessions.length; i++) {
    const session = sessions[i];

    if (!!session.key) {
      console.log(`Building ${session.key}...`)
      console.log(`http://localhost:3000?id=${encodeURIComponent(session.key)}&type=youtube&index=${mapIndexToImage(i)}`)
      await page.goto(`http://localhost:3000?id=${encodeURIComponent(session.key)}&type=youtube&index=${mapIndexToImage(i)}`);
  
      const elements = await page.$$(`#thumbnail`);
  
      const filename = deburr(kebabCase(session.title).substring(0, 40));
      await sleep(1000);
      await elements[0].screenshot({ path: `screenshots/${filename}.png` });
    }
  }

  await browser.close();
})();

function mapIndexToImage(index) {
  return ((index + 1) % 3) + 1;
}
