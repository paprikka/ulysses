module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '\\.(css|svg)$': '<rootDir>/__mocks__/asset.js',
    },
}
