# aurelia-auth-session

This plugin is for the [Aurelia](http://www.aurelia.io/) platform. It sets up authentication, authorization and user session.


## How to install this plugin?

1. In your project install the plugin via `jspm` with following command

  ```shell
  jspm install bootstrap
  jspm install font-awesome
  jspm install github:CodeSeven/toastr
  jspm install service=github:moshensky/aurelia-auth-session
  ```

2. Include css files somewhere (for example app.html)

  ```html
  <template>
      <require from="bootstrap/css/bootstrap.css"></require>
      <require from="font-awesome/css/font-awesome.css"></require>
      <require from="service/loading-mask/loading-mask.css"></require>
      <require from="CodeSeven/toastr/build/toastr.min.css"></require>

      <require from="nav-bar"></require>

      <nav-bar router.bind="router"></nav-bar>
      <div style="background: white;" class="page-host">
        <router-view></router-view>
      </div>
  </template>
  ```

3. Add plugin configuration in main.js

  ```javascript

  export function configure(aurelia) {
    aurelia.use
      .plugin('service', (config) => {
        config.useLocale('bg-BG');
        config.setHttpService({
          authHost: 'http://localhost:9000',
          serviceHost: 'http://localhost:9000',
          serviceApiPrefix: '/',
          requestTimeout: 30000, // milliseconds
          hosts: {
            "hostName": 'host address'
          }
        });
        config.routerAuthStep({
          loginRoute: 'login'
        });
      });

    aurelia.start().then(a => a.setRoot());
  }
  ```
