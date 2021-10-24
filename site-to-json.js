const yaml = require('js-yaml');
const fs   = require('fs');
const parseMD = require('parse-md').default

function readYaml(path) {
  try {
    return yaml.load(fs.readFileSync(path, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}

function writeJSON(filename, data) {
  fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf8');
}

function main() {
  // categories
  const categories = readYaml('../devfest2021/data/categories.yml');
  writeJSON('./src/data/categories.json', categories);
  // rooms
  const rooms = readYaml('../devfest2021/data/rooms.yml');
  writeJSON('./src/data/rooms.json', rooms);
  // schedule
  const schedule = readYaml('../devfest2021/data/schedule.yml');
  writeJSON('./src/data/schedule.json', schedule);
  // slots
  const slots = readYaml('../devfest2021/data/slots.yml');
  writeJSON('./src/data/slots.json', slots);

  const sessions = walkMarkdownFilesInFolder('../devfest2021/content/sessions');
  const speakers = walkMarkdownFilesInFolder('../devfest2021/content/speakers');
  writeJSON('./src/data/site.json', { sessions, speakers });
}

function walkMarkdownFilesInFolder(folder) {
  const files = fs.readdirSync(folder);
  return files.map((file) => {
    const filePath = folder + '/' + file;
    if (!filePath.startsWith('_') && filePath.endsWith('.md')) {
      const raw = fs.readFileSync(filePath, 'utf8');
      const { metadata } = parseMD(raw)
      console.log(metadata)
      return metadata;
    }
    return null;
  }).filter(Boolean);
}

main();