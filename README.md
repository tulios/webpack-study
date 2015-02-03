# Experiments with Webpack

## Features

* Stylesheets manifest (src/styles.js) with task to auto update (gulp update-styles)
* Centralized CSS/SCSS glob list
* Centralized SCSS includes list
* Centralized JS vendor list
* Centralized JS alias (mimic a library with your own files)
* Build task with multiple environments including uglifying and asset manifest generation (NODE_ENV=production gulp build)
* Component view generator (NAME=view-name gulp new:view)
* Component widget generator (NAME=widget-name gulp new:widget)
* Tests with jasmine + rewire (npm run test)
* Tests for Continuous Integration (CI=true npm run test)
* Test helper to easily stub React components (stubComponent)

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
