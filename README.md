
Chic Event (Beta)
=================

Chic Event is simple object-oriented event system for JavaScript. It's built on top of [Chic][chic].

**Current Version:** *0.0.1*  
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

Chic Event's classes are build with Chic. [Read the documentation][chic] to familiarise yourself with the API.


### EventEmitter

The `EventEmitter` class is best used by extending it. Doing so will give your new classes the ability to handle and emit events. `EventEmitter` has an `extend` static method; you can create your own class like this:

```js
var Animal = EventEmitter.extend({
    init: function () { ... }
});
var fluffy = new Animal();
```

Once you have a class, you'll be able to use the following methods:


### EventEmitter.on()

Bind a handler to an event type. This accepts two arguments:  
**type:** *(string)* The type of event to bind to.  
**handler:** *(function)* What to call when this type of event is emitted.

```js
fluffy.on('eat', function () { ... });
```


### EventEmitter.emit()

Emit an event. This accepts two arguments:  
**type:** *(string)* The type of event to emit.  
**event:** *([Event](#event)|mixed)* The event object to pass to all handlers, or data with which to construct an event object.

The following examples are equivalent:

```js
var event = new Event({food: 'steak'});
fluffy.emit('eat', event);
```

```js
fluffy.emit('eat', {food: 'steak'});
```

Each of the handlers bound to the given event type will be called with the [`Event`](#event) object as their first argument:

```js
fluffy.on('eat', function (event) {
    if (event.data.food !== 'steak') {
        return 'Fluffy sicked up his ' + event.data.food;
    }
});
fluffy.emit('eat', {food: 'carrots'}); // Fluffy sicked up his carrots
```


### EventEmitter.off()

Remove a specific handler from an event type. This accepts two arguments:  
**type:** *(string)* The type of event to remove the handler from.  
**handler:** *(function)* The handler to remove.

```js
function onEat () { ... }
fluffy.on('eat', onEat); // bind a handler
fluffy.off('eat', onEat); // then remove it
```

Remove all handlers from an event type. This accepts one argument:  
**type:** *(string)* The type of event to remove the handlers from.

```js
fluffy.on('eat', function () { ... }); // bind handlers
fluffy.on('eat', function () { ... });
fluffy.off('eat'); // then remove them
```

Remove all handlers from all event types. Call with no arguments.

```js
fluffy.on('eat', function () { ... }); // bind handlers
fluffy.on('poop', function () { ... });
fluffy.off(); // then remove them
```


### Event

The `Event` class is used to hold event data and allow handlers to stop events, preventing further handlers from executing.


### Event.type

This property contains the type of the event. It defaults to `null` and is set when passed into [`EventEmitter.emit`](#eventemitteremit):

```js
var event = new Event();
fluffy.emit('eat', event);
event.type; // eat
```


### Event.target

This property contains the [`EventEmitter`](#eventemitter) instance which triggered the event. It defaults to `null` and is set when passed into [`EventEmitter.emit`](#eventemitteremit):

```js
var event = new Event();
fluffy.emit('eat', event);
event.target === fluffy; // true
```


### Event.data

This property contains the arbitrary event data which can be passed in during construction:

```js
var event = new Event({food: 'steak'});
event.data.food; // steak
```

If [`EventEmitter.emit`](#eventemitteremit) is called with anything other than an `Event` instance, then a new `Event` is created with the data passed into the constructor:

```js
fluffy.on('eat', function (event) {
    event.data.food; // steak
});
fluffy.emit('eat', {food: 'steak'});
```


### Event.stop()

Event handlers are executed in the order they are added. This method allows a handler to prevent execution of any other handlers later in the stack:

```js
fluffy.on('eat', function (event) {
    event.stop();
});
fluffy.on('eat', function (event) {
    // never called
});
fluffy.emit('eat');
```


### Event.stopped()

This method returns whether the `Event` instance has been stopped with [`Event.stop`](#eventstop):

```js
var event = new Event();
event.stopped(); // false
event.stop();
event.stopped(); // true
```


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
