# Frontend log

Рабочая директория: [wh-frontend](./wh-frontend)

## Создание шаблонного React+Webpack приложения

1. Установка пакетов

```
npm init
npm install --save-dev webpack webpack-cli \
    style-loader css-loader babel-loader \
    @babel/core @babel/preset-env @babel/preset-react \
    eslint eslint-plugin-react eslint-webpack-plugin \
    react react-dom react-router react-router-dom \
    antd
```

2. Настройка WebPack+Eslint: [webpack.config.js](wh-frontend/webpack.config.js),
[.eslintrc.json](wh-frontend/.eslintrc.json)
