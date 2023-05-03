# NodeJS Typescript starter

## Running the server:
```
$ npm i
$ npm run dev
```

### Database

By default, the app will connect to the Cloud (dev environment) Firestore DB.  If you want to connect to a local DB, run the emulator in the Firestore repository, and add the env variable to `.env` here:
```
FIRESTORE_EMULATOR_HOST=localhost:8080
```


## Deploy To Shared Dev

Any commits to `main` branch trigger an automatic deployment via GitHub workflow


