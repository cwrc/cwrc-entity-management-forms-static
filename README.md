# cwrc-entity-management-forms-static

## Customizing the Build

In order for React routing to work properly, a few files need to be altered.

In [package.json](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/package.json) the `homepage`
field needs to be set to the build folder on the server, e.g. `https://dev-02.cwrc.ca/cwrc-entity-management-forms-static/build/`.

In [routes.js](https://github.com/cwrc/cwrc-entity-management-forms-static/blob/master/src/routing/routes.js) each route needs to be altered.
The `path` field needs to include the folder structure (minus the server root).
So for example `/person` becomes `/cwrc-entity-management-forms-static/build/person`. Additionally, the `exact` field should be set to `false`.

## Build instructions

1. From installation folder on server, run `git pull` to update. (You might need to `git stash` the above build customizations. Then `git stash pop` them after the pull is complete.)
2. Run `npm run build` to actually create the build.
