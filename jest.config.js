// /** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//     testEnvironment: "node",
//     transform: {
//       "^.+.tsx?$": ["ts-jest",{}],
//     },
//   };
/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { useESM: false }]
  },
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"]
};
