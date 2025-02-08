## Development

First login:

```
clasp login
```

Build

```
npm run build
```

To pull and push changes from google app script project:

```
clasp push
```

**NOTE** to open the app add `?key=<allowed key from .env>` to the url

### Create new app

1. Create new google app script of type "webapp"

```
./scripts/create_app.sh
```

2. Update `.env.tmp` and rename the file as `.env`

3. Build and publish the project

```
npm run publish
```

NOTE: yes for "Manifest file has been updated. Do you want to push and overwrite?"

### How secrets are handled

1. Add all the necessary secrets/envs in the `.env` file
2. The values will be injected in the `envs_tmp.js` using `scripts/env_injector.js` and saved as `envs.js` that is not tracked by version control
3. The vars from `envs.js` can be used in any `.js` file without explicitly importing

### How build command works

1. Builds the client into one file `index.html` inside `build` directory
2. Injects env vars into `envs.js` and saves it inside `server` directory
3. Copies all `.js` files from `server` (except `envs_tmp.js`) inside `build` directory

## Deployment

1. Create a version of the code

```
clasp version "version description"
```

2. Create new deployment

```
clasp deploy -V <version previously created> -d "deployment description"
```

**NOTE:** check the "Execute as" and "Who has access" option in the "Manage deployments" UI, and set them as:

- Execute as: User accessing the web app
- Who has access: Anyone with Google account

3. (Optional) To redeploy a newer version on as existing deployment (useful for keeping the same URL)

```
clasp deploy -V <version> -d <deployment description> -i <deployment id>
```

NOTE: to get the deployment id use `clasp deployments`

## Useful commands

Get the head deployed url for the webapp:

```

clasp open --webapp

```

## TODO:

1. Replace parcel with vite
2. Add snackbar for failure submit
3. Add snackbar or other animation for success submit
4. Use yml file for envs
