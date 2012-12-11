
Chic Event (Beta)
=================

Chic Event is simple object-oriented event system for JavaScript. It's built on top of [Chic][chic].

**Current Version:** *0.0.0*  
**Automated Build Status:** [![Build Status][travis-status]][travis]  
**Node Support:** *0.6, 0.8*  
**Browser Support:** *Untested, coming soon*


Getting Started
---------------

You can use Chic Event on the server side with [Node.js][node] and npm:

```sh
$ npm install chic-event
```

On the client side, you can either install Chic Event through [Component][component]:

```sh
$ component install rowanmanning/chic-event
```

or by simply including `chic-event.js` in your page:

```html
<script src="path/to/lib/chic-event.js"></script>
```


Usage
-----

In Node.js or using Component, you can include Chic Event in your script by using require:

```js
var chicEvent = require('chic-event');
var Event = chicEvent.Event;
var EventEmitter = chicEvent.EventEmitter;
```

If you're just including with a `<script>`, `Event` and `EventEmitter` are available in the `chic.event` namespace:

```js
var Event = chic.event.Event;
var EventEmitter = chic.event.EventEmitter;
```

The rest of the examples assume you've got the `Event` and `EventEmitter` variables already.

Todo...


Development
-----------

To develop Chic Event, you'll need to clone the repo and install dependencies:

```sh
$ npm install
```

No code will be accepted unless all tests are passing and there are no lint errors. Commands are outlined below:

### Lint code

Run JSHint with the correct config against the code-base:

```sh
$ npm run-script lint
```

### Run unit tests (CLI)

Run unit tests on the command line in a Node environment:

```sh
$ npm test
```


License
-------

Chic Event is licensed under the [MIT][mit] license.



[chic]: https://github.com/rowanmanning/chic
[component]: https://github.com/component/component
[mit]: http://opensource.org/licenses/mit-license.php
[node]: http://nodejs.org/
[travis]: https://secure.travis-ci.org/rowanmanning/chic-event
[travis-status]: https://secure.travis-ci.org/rowanmanning/chic-event.png?branch=master
