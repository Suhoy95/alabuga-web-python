# Frontend log

Рабочая директория: [wh-frontend](./wh-frontend)

## Создание шаблонного React+Webpack приложения

1. Установка пакетов

```
npm init
npm install --save-dev webpack webpack-cli \
    style-loader css-loader babel-loader \
    @babel/core @babel/preset-env @babel/preset-react babel-polyfill \
    eslint eslint-plugin-react eslint-webpack-plugin \
    react react-dom react-router react-router-dom \
    reqwest \
    antd
```

2. Настройка WebPack+Eslint: [webpack.config.js](wh-frontend/webpack.config.js),
[.eslintrc.json](wh-frontend/.eslintrc.json)

## Создание Таблиц со страницами

- https://ant.design/components/table/#components-table-demo-ajax

## Создание модальных окон и форм

- https://ant.design/components/modal/#components-modal-demo-footer
- https://ant.design/components/form/#components-form-demo-form-in-modal
