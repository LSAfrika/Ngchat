// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig : {

    apiKey: "AIzaSyBN0zYbVAQg0rqON1AGvkp0jNYEPVlqJQg",

    authDomain: "ngchat-auth.firebaseapp.com",

    projectId: "ngchat-auth",

    storageBucket: "ngchat-auth.appspot.com",

    messagingSenderId: "921937354133",

    appId: "1:921937354133:web:4048c643cadc7a2fb12a9c"

  },
  API:'http://localhost:3000/'

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
