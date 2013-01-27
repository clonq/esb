# esb

Enterprise Service Bus implementation for [node](http://nodejs.org)

## Installation

$ npm install esb

## Quick Start

The quickest way to get started with esb:

```js
require('esb')
```

This will start your ESB instance using the configuration provided in config.json.

## Features

  * Built on [Express](http://github.com/visionmedia/expressjs.com)
  * Custom versionable service protocols
  * Protocols available: HTTP
  * documentation publishable via the embedded web server

## Philosophy
This [ESB](http://en.wikipedia.org/wiki/Enterprise_service_bus) implementation is an attempt to create a framework for [SOA](http://en.wikipedia.org/wiki/Service-oriented_architecture)-based development in Node.

## To Do
* dynamically register/unregister a service
* queryable service registry
* service reliability scoring
* support for other protocols
