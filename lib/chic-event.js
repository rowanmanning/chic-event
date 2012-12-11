(function (exports, isCJS) {
    'use strict';


    // Get dependencies
    var Class;
    if (isCJS) {
        Class = require('chic').Class;
    } else {
        Class = exports.Class;

        // Namespace juggling for non Common JS environments
        exports.event = exports.event || {};
        exports = exports.event;
    }


    // Utilities

    // Get the index of the first instance of a value in an array
    function arrayIndexOf (array, val) {

        // Use native indexOf
        if (Array.prototype.indexOf) {
            return array.indexOf(val);
        }

        // Use loop/if for environments without native indexOf
        var i, len = array.length;
        for (i = 0; i < len; len += 1) {
            if (array[i] === val) {
                return i;
            }
        }
        return -1;

    }


    // Event class
    var Event = Class.extend({

        // Stop the event, preventing any further handlers from executing
        stop: function () {
            this._stopped = true;
        },

        //  Check whether the event is stopped
        stopped: function () {
            return (this._stopped === true);
        }

    });


    // EventEmitter class
    var EventEmitter = Class.extend({

        // Bind a handler to an event
        on: function (type, handler) {

            // Validate arguments
            if (typeof type !== 'string') {
                throw new Error('Type must be a string');
            }
            if (typeof handler !== 'function') {
                throw new Error('Handler must be a function');
            }

            // Check for presence of event store
            if (!this._events) {
                this._events = {};
            }
            if (!this._events[type]) {
                this._events[type] = [];
            }

            // Add handler
            this._events[type].push(handler);

        },

        // Unbind handlers from events
        off: function (type, handler) {

            // Validate arguments
            if (typeof type !== 'undefined' && typeof type !== 'string') {
                throw new Error('Type must be a string or undefined');
            }
            if (typeof handler !== 'undefined' && typeof handler !== 'function') {
                throw new Error('Handler must be a function or undefined');
            }

            // If no type is given, remove all handlers
            if (!type) {
                return delete this._events;
            }

            // Check for presence of event store
            if (!this._events || !this._events[type]) {
                return;
            }

            // If no handler is given, remove all handlers for this type
            if (!handler) {
                return delete this._events[type];
            }

            // Do we have a matching handler?
            var handlers = this._events[type];
            var i = arrayIndexOf(handlers, handler);
            if (i === -1) {
                return;
            }

            // Remove handler
            handlers.splice(i, 1);

        },

        // Emit an event
        emit: function (type, event) {

            // Validate arguments
            if (typeof type !== 'string') {
                throw new Error('Type must be a string');
            }
            if (typeof event !== 'undefined' && !(event instanceof Event)) {
                throw new Error('Event must be an Event object or undefined');
            }

            // Check for presence of event store
            if (!this._events || !this._events[type]) { return; }

            // Get handlers
            var handlers = this._events[type];

            // Build event
            if (!event) {
                event = new Event();
            }
            event.type = type;

            // Loop and call handlers
            var i, len = handlers.length;
            for (i = 0; i < len; i += 1) {
                handlers[i].call(this, event);

                // Prevent further handlers from being called if event is stopped
                if (event.stopped()) {
                    break;
                }
            }

        },

        // Get all handlers bound to an event type
        handlers: function (type) {

            // Validate arguments
            if (typeof type !== 'string') {
                throw new Error('Type must be a string');
            }

            // Check for presence of event store
            if (!this._events || !this._events[type]) {
                return [];
            }

            // Return handlers
            return this._events[type].slice(0);

        }

    });


    // Exports
    exports.Event = Event;
    exports.EventEmitter = EventEmitter;


} (
    (typeof exports === 'undefined' ? (this.chic = this.chic || {}) : exports),
    (typeof exports !== 'undefined')
));