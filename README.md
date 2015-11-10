# Red5.org

## Requirements

[Node/NPM](https://nodejs.org/) is required to build this project.

## Updating Pages

1. In the Github web UI, go into the `templates/` directory.
2. Select the template you'd like to edit.
3. Select the pencil icon to edit the template.
4. Edit the template as you see fit.
5. Add a commit update at the bottom.
6. Select "**Create a new branch for this commit and start a pull request.**"
7. Whoever is in charge of building that repo will be notified so that they can merge the pull request, build, and push the new build.

## Updating Posts

1. In the Github web UI, go into the `posts/` directory.
2. Select the "**+**" icon at the end of the breadcrumb trail
3. Name the file with the format like 2015-01-01T23:59:59.000Z-Post-Name-Goes-Here.hbs
4. Edit the post as you see fit.
5. Add a commit update at the bottom.
6. Select "**Create a new branch for this commit and start a pull request.**"
7. Whoever is in charge of building that repo will be notified so that they can merge the pull request, build, and push the new build.

## Building

1. Ensure you have the latest from the `gh-pages` branch
2. Ensure that you have installed all NPM dependencies via `npm install`
3. Run `npm run publish`
4. If you would like to test locally, run `npm run start`
5. Commit the bundled JS files that get updated
6. Push your commit to the `gh-pages` branch
