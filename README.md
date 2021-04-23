# cwrc-entity-management-forms-static

## Installation

1. Clone the project: `git clone`
2. Install the dependencies: `npm install`
3. [Customize the build](#customizing-the-build)
4. [Generate Builds](#generate-builds)
5. [Deploying](#deploying)

## Customizing the Build

### Environment Variables

Server and cookie variables can be set in the [.env-cmdrc](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/.env-cmdrc.js) file.

### Overrides

Certain files in the dependencies (i.e. node_modules) need to be overwritten. The files are located in the [overrides](https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/overrides) directory.

[cli.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/overrides/cli.js) should replace the file located at `node_modules/react-snapshot/lib/cli.js`.

[webpack.config.prod.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/overrides/webpack.config.prod.js) should replace the file located at `node_modules/react-scripts/config/webpack.config.prod.js`.

### Routing

In order for React routing to work properly, a few files need to be altered.

In [package.json](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/package.json) the `homepage`
field needs to be set to the build folder on the server, e.g. `https://dev-02.cwrc.ca/cwrc-entity-management-forms-static/build/`.

### Important Files and Directories

If you're updating this app, many of the directories can be ignored as they're part of the [suicrux](https://github.com/Metnew/suicrux) boilerplate that formed the basis for the app.

Listed below are the files and directories directly related to the entity forms.

### API

Everything related to client server communication is at: [https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/api/EntitiesSvc](https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/api/EntitiesSvc)

Entities are stored as XML on the server, and manipulated as JSON on the client. Code for doing XML to JSON and JSON to XML conversion can be found for each entity in the relevant directory inside EntitiesSvc.

Common functions used in the conversions can be found here: [https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/api/utils/conversion_utilities.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/api/utils/conversion_utilities.js)

Actual server calls are made at: [https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/api/EntitiesSvc/index.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/api/EntitiesSvc/index.js)

### Forms

The code for the forms themselves is at: [https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/containers/EntityForm](https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/containers/EntityForm)

Common components used in all forms can be found here: [https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/containers/EntityForm/components](https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/containers/EntityForm/components)

## Generate Builds

### BEFORE compiling code

In order for React routing to work properly, you need to define the correct root path for the build according to the server you are deploing:

In [package.json](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/package.json) the `homepage`
field needs to be set to the build folder on the server:

- local: "/"
- development: "https://dev-02.cwrc.ca/cwrc-entity-management-forms-static/build/"
- testing: "https://test-01.cwrc.ca/cwrc-entity-management-forms-static/build/"
- staging: "https://staging-01.cwrc.ca/cwrc-entity-management-forms-static/build/"
- production: "https://cwrc.ca/cwrc-entity-management-forms-static/build/"

### Compiling code

run one of the options on package.json:

- "build:development": "env-cmd -e development npm run build && copyfiles -u 1 \"build/**/*\" ./bin/dev && npm run clean:build"
- "build:testing": "env-cmd -e testing npm run build && copyfiles -u 1 \"build/**/*\" ./bin/testing && npm run clean:build"
- "build:staging": "env-cmd -e staging npm run build && copyfiles -u 1 \"build/**/*\" ./bin/staging && npm run clean:build"
- "build:production": "env-cmd -e production npm run build && copyfiles -u 1 \"build/**/*\" ./bin/production && npm run clean:build"
- "build:all": "npm run build:development && npm run build:testing && npm run build:staging && npm run build:production"

Each one of them takes env variables from the file .env-cmdrc.js. "build:all" will generate builds for all environments at once. The built files will be saved into each specific folder in the `bin` folder.

### IMPORTANT NOTE: BEFORE Compile

If dependencies are updated (specifically react-scripts and react-snapshop), you need to replace the override files as follows (check oveerides)

## Deploying

1. Push files to Gihub
2. Pull files on server

It is better to compile code on site becuase of the different build options. But you can use the pre-built code on `bin` if you like.

### Updating the Build: Using pre-builts

1. From the installation directory, run `git pull` to update. (You might need to `git stash` the above build customizations. Then `git stash pop` them after the pull is complete.)
2. Move or copy the content of a specific environment (e.g.: `/bin/dev`) to `/build`. e.g.: `cp -R ./bin/dev ./build`

### Updating the Build: Compiling code ON SITE

1. From the installation directory, run `git pull` to update. (You might need to `git stash` the above build customizations. Then `git stash pop` them after the pull is complete.)
2. run `npm i` to install eventual dependencies updates.
3. Run `npm run {build-version}` to actually create a build for a specific environment. Or `npm run build:all` to create version to all environments.
4. Move or copy the content of a specific environment (e.g. `/bin/dev`) to `/build`. e.g.: `cp -R ./bin/dev ./build`
