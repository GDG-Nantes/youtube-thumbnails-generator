const yaml = require('js-yaml');
const fs   = require('fs');

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
  const categoriesJSON = readJSON('../devfest2022/data/categories.json');
  writeJSON('./src/data/categories.json', categoriesJSON.categories);
  // schedule
  const scheduleJSON = readJSON('../devfest2022/data/schedule.json');
  writeJSON('./src/data/schedule.json', scheduleJSON.schedules);
  // slots
  const slotsJSON = readJSON('../devfest2022/data/slots.json');
  writeJSON('./src/data/slots.json', slotsJSON.slots);

  const sessions = walkMarkdownFilesInFolder('../devfest2022/data/sessions');
  const speakers = walkMarkdownFilesInFolder('../devfest2022/data/speakers');
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