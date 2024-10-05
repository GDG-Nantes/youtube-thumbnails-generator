const yaml = require('js-yaml');
const fs   = require('fs');

const WEBSITE_REPO_FOLDER = 'devfest2024';

function readYaml(path) {
  try {
    return yaml.load(fs.readFileSync(path, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

function readJSON(path) {
  try {
    let rawdata = fs.readFileSync(path);
    return JSON.parse(rawdata);
  } catch (e) {
    console.log(e);
  }
}

function writeJSON(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
}

function main() {
  // categories
  const categoriesJSON = readJSON(`../${WEBSITE_REPO_FOLDER}/data/categories.json`);
  writeJSON('./src/data/categories.json', categoriesJSON.categories);
  // slots
  const slotsJSON = readJSON(`../${WEBSITE_REPO_FOLDER}/data/slots.json`);
  writeJSON('./src/data/slots.json', slotsJSON.slots);

  const sessions = walkMarkdownFilesInFolder(`../${WEBSITE_REPO_FOLDER}/data/sessions`);
  const speakers = walkMarkdownFilesInFolder(`../${WEBSITE_REPO_FOLDER}/data/speakers`);
  writeJSON('./src/data/site.json', { sessions, speakers });
}

function walkMarkdownFilesInFolder(folder) {
  const files = fs.readdirSync(folder);
  return files.map((file) => {
    const filePath = folder + '/' + file;
    if (!filePath.startsWith('_') && filePath.endsWith('.yml')) {
      const metadata = readYaml(filePath);
      console.log(metadata)
      return metadata;
    }
    return null;
  }).filter(Boolean);
}

main();