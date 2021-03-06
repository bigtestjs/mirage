# :warning: DEPRECATED :warning:
In order to make BigTest development faster and friction free, we've consolidated all of our individual projects into a [single repository on the Frontside Organization](https://github.com/thefrontside/bigtest). We'd love to see you there!

_note: the last release from this repository was 0.0.1_

## Mirage Server 

A client-side server to develop, test and prototype your app.

> Note: This repository has been archived in favor of https://github.com/miragejs/server
> Documentation and tutorials at https://miragejs.com/docs

This project is a plain vanilla javascript extraction of the
[ember-cli-mirage][1] project. It can be used inside of any framework,
including React. The goal is for it to be eventually used upstream
by Ember mirage proper.

## Usage

``` javascript
import Mirage, { Factory } from '@bigtest/mirage';

let server = new Mirage({
  environment: 'test',
  factories: {
    address: Factory
  }
});

// do some stuff with the server.

// stop intercepting requests
server.shutdown()
```

## Development

Test suite is running in QUnit and Karma.

```
$ yarn
$ yarn start // karma server
$ yarn test // single run
```

[1]: http://www.ember-cli-mirage.com/
