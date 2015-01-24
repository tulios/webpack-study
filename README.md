# Experiments with Webpack

## Features

* Stylesheets manifest (src/styles.js) with task to auto update (gulp update-styles)
* Centralized CSS/SCSS glob list
* Centralized SCSS includes list
* Centralized JS vendor list
* Centralized JS alias (mimic a library with your own files)
* Build task with multiple environments including uglifying and asset manifest generation (NODE_ENV=production gulp build)

## Building / Running

1. gulp build

```sh
gulp build
```

2. Dev server

```sh
npm run dev-server
```

http://localhost:8082/

or

http://localhost:8082/webpack-dev-server/
