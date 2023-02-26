const versionrc = require("./.versionrc.json");
const types = versionrc.types.map((definition) => definition.type);

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", types],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-empty": [2, "never"],
    "header-max-length": [2, "always", 80],
  },
  parserPreset: {
    parserOpts: {
      issuePrefixes: ["#"],
    },
  },
};
