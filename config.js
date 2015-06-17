System.config({
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  }
});

System.config({
  "map": {
    "CodeSeven/toastr": "github:CodeSeven/toastr@2.1.1",
    "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
    "aurelia-http-client": "github:aurelia/http-client@0.9.1",
    "aurelia-router": "github:aurelia/router@0.9.0",
    "jquery": "github:components/jquery@2.1.4",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88",
    "github:aurelia/dependency-injection@0.8.1": {
      "aurelia-logging": "github:aurelia/logging@0.5.0",
      "aurelia-metadata": "github:aurelia/metadata@0.6.0",
      "core-js": "npm:core-js@0.9.17"
    },
    "github:aurelia/event-aggregator@0.5.0": {
      "aurelia-logging": "github:aurelia/logging@0.5.0"
    },
    "github:aurelia/http-client@0.9.1": {
      "aurelia-path": "github:aurelia/path@0.7.0",
      "core-js": "npm:core-js@0.9.17"
    },
    "github:aurelia/metadata@0.6.0": {
      "core-js": "npm:core-js@0.9.17"
    },
    "github:aurelia/route-recognizer@0.5.0": {
      "core-js": "npm:core-js@0.9.17"
    },
    "github:aurelia/router@0.9.0": {
      "aurelia-dependency-injection": "github:aurelia/dependency-injection@0.8.1",
      "aurelia-event-aggregator": "github:aurelia/event-aggregator@0.5.0",
      "aurelia-history": "github:aurelia/history@0.5.0",
      "aurelia-path": "github:aurelia/path@0.7.0",
      "aurelia-route-recognizer": "github:aurelia/route-recognizer@0.5.0",
      "core-js": "npm:core-js@0.9.17"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "npm:core-js@0.9.17": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    }
  }
});

