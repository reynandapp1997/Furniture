# Furniture

### Installing

First you need to install all dependencies by running :

```bash
yarn install
```

### Running on local server

Go open file in src > redux > actions > index.js, and edit the following line. And change it with your own local server

```javascript
const api = 'https://furniture-server.herokuapp.com';
```

to

```javascript
const api = 'your own server ip';

const api = 'http://192.168.43.197:3000'; // example
```

### Build The Application

Before build the release version of the application, please follow this documentation to [Signed APK](https://facebook.github.io/react-native/docs/signed-apk-android)

To build the project just simply run this command on terminal

```sh
yarn build-android
```

or this command to debug the application

```sh
yarn start-android
```

### Server

Clone this [FurnitureServer](https://github.com/reynandapp1997/Furniture-Server) repository for the server of this application. 
