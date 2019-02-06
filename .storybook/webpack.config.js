module.exports = (storybookBaseConfig, configType, defaultConfig) => {
    defaultConfig.module.rules.push(
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'], }
    );

    return defaultConfig;
};