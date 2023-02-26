const YAML = require("js-yaml");

const loadChartManifest = (contents) => {
  const parsedChartManifest = YAML.load(contents);
  return parsedChartManifest;
};

const writeVersion = (contents, version) => {
  const parsedChartManifest = loadChartManifest(contents);
  parsedChartManifest.version = version;
  parsedChartManifest.appVersion = version;
  const updatedChartManifest = YAML.dump(parsedChartManifest);
  console.log("Updated chart manifest: ", updatedChartManifest);
  return updatedChartManifest;
};

const readVersion = (contents) => {
  const parsedChartManifest = loadChartManifest(contents);
  return parsedChartManifest.version;
};

module.exports = {
  writeVersion,
  readVersion,
};
