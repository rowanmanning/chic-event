/*jshint maxlen: 140 */
/*global setup, suite, test */
(function () {
    'use strict';
    
    // Dependencies
    var assert = require('chai').assert;
    var sinon = require('sinon');

    // Test subject
    var Class = require('chic').Class;
    var chicEvent = require('../../lib/chic-event');
    var Event = chicEvent.Event;
    var EventEmitter = chicEvent.EventEmitter;

    // Test suite
    suite('chic-event (unit):', function () {

        test('should be an object', function () {
            assert.isObject(chicEvent);
        });

        test('should have an Event function', function () {
            assert.isFunction(Event);
        });

        test('should have an EventEmitter function', function () {
            assert.isFunction(EventEmitter);
        });

        suite('Event:', function () {
            var instance;

            setup(function () {
                instance = new Event();
            });

            test('should extend chic.Class', function () {
                assert.instanceOf(Event.prototype, Class);
            });

            test('instance should have a stop method', function () {
                assert.isFunction(instance.stop);
            });

            test('instance should have a stopped method', function () {
                assert.isFunction(instance.stop);
            });

            test('stopped method should return false if stop has not been called', function () {
                assert.isFalse(instance.stopped());
            });

            test('stopped method should return true if stop has been called', function () {
                instance.stop();
                assert.isTrue(instance.stopped());
            });

        });

        suite('EventEmitter:', function () {
            var instance;

            setup(function () {
                instance = new EventEmitter();
            });

            test('should extend chic.Class', function () {
                assert.instanceOf(EventEmitter.prototype, Class);
            });

            test('instance should have a handlers method', function () {
                assert.isFunction(instance.handlers);
            });

            test('instance should have an on method', function () {
                assert.isFunction(instance.on);
            });

            test('instance should have an off method', function () {
                assert.isFunction(instance.off);
            });

            test('instance should have a emit method', function () {
                assert.isFunction(instance.emit);
            });

            test('handlers method should return an array when no handlers are present', function () {
                assert.isArray(instance.handlers('foo'));
            });

            suite('with handlers added:', function () {
                var foo, foo2, bar, bar2;

                setup(function () {
                    foo = sinon.spy();
                    foo2 = sinon.spy();
                    bar = sinon.spy(function (event) { event.stop(); });
                    bar2 = sinon.spy();
                    instance.on('foo', foo);
                    instance.on('foo', foo2);
                    instance.on('bar', bar);
                    instance.on('bar', bar2);
                });

                test('handlers method should return the expected handlers if there are any', function () {
                    var handlers = instance.handlers('foo');
                    assert.lengthOf(handlers, 2);
                    assert.include(handlers, foo);
                    assert.include(handlers, foo2);
                });

                test('off method with no arguments should remove all handlers', function () {
                    instance.off();
                    assert.lengthOf(instance.handlers('foo'), 0);
                    assert.lengthOf(instance.handlers('bar'), 0);
                });

                test('off method with type argument only should remove all handlers of that type', function () {
                    instance.off('foo');
                    assert.lengthOf(instance.handlers('foo'), 0);
                    assert.lengthOf(instance.handlers('bar'), 2);
                });

                test('off method with type and handler arguments should remove only the specified handler', function () {
                    instance.off('foo', foo);
                    var handlers = instance.handlers('foo');
                    assert.lengthOf(handlers, 1);
                    assert.include(handlers, foo2);
                });

                test('emit method should call each handler of the emitted type', function () {
                    instance.emit('foo');
                    assert.isTrue(foo.calledOnce);
                    assert.isTrue(foo2.calledOnce);
                });

                test('handlers should be passed the event object when emit is called with one', function () {
                    var event = new Event();
                    instance.emit('foo', event);
                    assert.strictEqual(foo.firstCall.args[0], event);
                    assert.strictEqual(foo2.firstCall.args[0], event);
                });

                test('handlers should be passed an event object even when emit is called with no event object', function () {
                    instance.emit('foo');
                    assert.instanceOf(foo.firstCall.args[0], Event);
                    assert.instanceOf(foo2.firstCall.args[0], Event);
                    assert.strictEqual(foo2.firstCall.args[0], foo.firstCall.args[0]);
                });

                test('the event type property should be set to the type of event being emitted', function () {
                    var event = new Event();
                    instance.emit('foo', event);
                    assert.strictEqual(event.type, 'foo');
                });

                test('a handler which stops the event should prevent other handlers from being called', function () {
                    instance.emit('bar');
                    assert.isTrue(bar.calledOnce);
                    assert.isTrue(bar2.notCalled);
                });

            });

            suite('guarding:', function () {

                test('handlers method should throw when called with a non-string type argument', function () {
                    assert.throws(function () {
                        instance.handlers(123);
                    }, /^Type must be a string$/);
                });

                test('on method should throw when called with a non-string type argument', function () {
                    assert.throws(function () {
                        instance.on(123, function () {});
                    }, /^Type must be a string$/);
                });

                test('on method should throw when called with a non-function handler argument', function () {
                    assert.throws(function () {
                        instance.on('foo', 123);
                    }, /^Handler must be a function$/);
                });

                test('off method should throw when called with a defined, non-string type argument', function () {
                    assert.throws(function () {
                        instance.off(123);
                    }, /^Type must be a string or undefined$/);
                });

                test('off method should throw when called with a defined, non-function handler argument', function () {
                    assert.throws(function () {
                        instance.off('foo', 123);
                    }, /^Handler must be a function or undefined$/);
                });

                test('emit method should throw when called with a non-string type argument', function () {
                    assert.throws(function () {
                        instance.emit(123);
                    }, /^Type must be a string$/);
                });

                test('emit method should throw when called with a defined, non-Event event argument', function () {
                    assert.throws(function () {
                        instance.emit('foo', 123);
                    }, /^Event must be an Event object or undefined$/);
                });

            });

        });

    });

} ());