module.exports = {
    automock: false,
    clearMocks: true,
    testEnvironment: "node",
    testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
    transform: { "^.+\\.tsx?$": "ts-jest" }
};
