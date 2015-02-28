# Experiments with Webpack

## Features

* Stylesheets manifest (__src/styles.js__) with task to auto update (__gulp update-styles__)
* Centralized CSS/SCSS glob list
* Centralized SCSS includes list
* Centralized JS vendor list
* Centralized JS alias (mimic a library with your own files)
* Build task with multiple environments including uglifying and asset manifest generation (__NODE_ENV=production gulp build__)
* Component view generator (__NAME=view-name gulp new:view__)
* Component widget generator (__NAME=widget-name gulp new:widget__)
* Tests with jasmine + rewire (__npm run test__)
* Tests for Continuous Integration (__CI=true npm run test__)
* Test helper to easily stub React components (stubComponent)

## Building / Running

1. gulp

```sh
npm install -g gulp
```

2. Build

```sh
gulp build
```

2. Dev server

```sh
npm run dev-server
```

http://localhost:8082/
