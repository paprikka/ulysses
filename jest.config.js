module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '\\.(css|svg|jpg)$': '<rootDir>/__mocks__/asset.js',
    },
}
