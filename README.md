# cwrc-entity-management-forms-static

## Installation

1. Clone the project: `git clone`
2. Install the dependencies: `npm install`
3. Customize the build
4. Run the build: `npm run build`

## Customizing the Build

### Environment Variables

Server and cookie variables can be set in the [.env](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/.env) file.

### Overrides

Certain files in the dependencies (i.e. node_modules) need to be overwritten. The files are located in the [overrides](https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/overrides) directory.

[cli.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/overrides/cli.js) should replace the file located at `node_modules/react-snapshot/lib/cli.js`.

[webpack.config.prod.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/overrides/webpack.config.prod.js) should replace the file located at `node_modules/react-scripts/config/webpack.config.prod.js`.

### Routing

In order for React routing to work properly, a few files need to be altered.

In [package.json](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/package.json) the `homepage`
field needs to be set to the build folder on the server, e.g. `https://dev-02.cwrc.ca/cwrc-entity-management-forms-static/build/`.

In [routes.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/routing/routes.js) each route needs to be altered.
The `path` field needs to include the folder structure (minus the server root).
So for example `/person` becomes `/cwrc-entity-management-forms-static/build/person`. Additionally, the `exact` field should be set to `false`.

## Updating the Build

1. From the installation directory, run `git pull` to update. (You might need to `git stash` the above build customizations. Then `git stash pop` them after the pull is complete.)
2. Run `npm run build` to actually create the build.

## Important Files and Directories

If you're updating this app, many of the directories can be ignored as they're part of the [suicrux](https://github.com/Metnew/suicrux) boilerplate that formed the basis for the app.

Listed below are the files and directories directly related to the entity forms.

### API

Everything related to client server communication is at: https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/api/EntitiesSvc

Entities are stored as XML on the server, and manipulated as JSON on the client. Code for doing XML to JSON and JSON to XML conversion can be found for each entity in the relevant directory inside EntitiesSvc.

Common functions used in the conversions can be found here: https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/api/utils/conversion_utilities.js

Actual server calls are made at: https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/api/EntitiesSvc/index.js

### Forms

The code for the forms themselves is at: https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/containers/EntityForm

Common components used in all forms can be found here: https://github.com/cwrc/cwrc-entity-management-forms-static/tree/master/src/containers/EntityForm/components

