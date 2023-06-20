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


## Build Dockerfile

```
$ docker build . -t firebase-nodets-starter:v1.0.0 && \
    
    docker run -d \
    --restart=on-failure \
    --name=firebase-nodets-starter \
    -v /home/ec2-user/firebase-nodets-starter/.env:/usr/app/.env \
    -p 80:8081 \
    firebase-nodets-starter:v1.0.0

```