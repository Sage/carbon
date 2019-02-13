const path = require('path');

module.exports = (storybookBaseConfig, configType, defaultConfig) => {
    defaultConfig.module.rules.push(
        {
            test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']
        }
    );

    defaultConfig.resolve = {
        alias: {
            storybookHelpers: path.resolve(__dirname, '../src/__storybook_helpers__/')
        },
        extensions: ['.js']
    };

    return defaultConfig;
};