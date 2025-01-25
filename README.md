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

### How secrets are handled

1. Add all the necessary secrets/envs in the `.env` file
2. The values will be injected in the `envs_tmp.js` using `scripts/env_injector.js` and saved as `envs.js` that is not tracked by version control
3. The vars from `envs.js` can be used in any `.js` file without explicitly importing

### How build command works

1. Builds the client into one file `index.html` inside `build` directory
2. Injects env vars into `envs.js` and saves it inside `server` directory
3. Copies all `.js` files from `server` (except `envs_tmp.js`) inside `build` directory

## Useful commands

Get the head deployed url for the webapp:

```
clasp open --webapp
```
