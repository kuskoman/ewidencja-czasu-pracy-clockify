const YAML = require("js-yaml");

const loadChartManifest = async (contents) => {
  const parsedChartManifest = YAML.load(contents);
  return parsedChartManifest;
};

const writeVersion = async (contents, version) => {
  const parsedChartManifest = await loadChartManifest(contents);
  parsedChartManifest.version = version;
  parsedChartManifest.appVersion = version;
  const updatedChartManifest = YAML.dump(parsedChartManifest);
  return updatedChartManifest;
};

const readVersion = async (contents) => {
  const parsedChartManifest = await loadChartManifest(contents);
  return parsedChartManifest.version;
};

module.exports = {
  writeVersion,
  readVersion,
};
