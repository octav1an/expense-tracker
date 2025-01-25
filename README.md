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
2. The values will be injected in the `envs_tmp.gs` using `scripts/env_injector.js` and saved as `envs.gs` that is not tracked by version control
3. The vars from `envs.gs` can be used in any `.gs` file without explicitly importing

### How build command works

1. Builds the client into one file `index.html` inside `build` directory
2. Injects env vars into `envs.gs` and saves it inside `server` directory
3. Copies all `.gs` files from `server` (except `envs_tmp.gs`) inside `build` directory

## Useful commands

Get the head deployed url for the webapp:

```
clasp open --webapp
```
