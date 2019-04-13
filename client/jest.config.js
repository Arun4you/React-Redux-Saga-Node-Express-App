module.exports = {
    "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
    },
    "setupFilesAfterEnv": [
        '<rootDir>src/setupTests.js'
    ]
} 