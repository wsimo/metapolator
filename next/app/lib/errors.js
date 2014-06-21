define(function() {
    "use strict";
    //metapolator errors
    var errors = {}
    
    /**
     * safe three lines of coding for each error with this factory
     * 
     * and observe that extending Error is uncool
     */
    var makeError = function(name, Constructor, prototype, namespace)
    {
        if(prototype === undefined)
            var prototype = new Error;
        
        if(Constructor === undefined) {
            var Constructor = function(message, stack) {
                if(message !== undefined) {
                    this.name = name;
                    this.message = message || "(no error message)";
                    stack = stack || (new Error).stack || '(no stack available)'
                    this.stack = [name, ' Error: ', this.message, '\n'
                                                       , stack].join('');
                }
            };
        };
        Constructor.prototype = prototype;
        Constructor.prototype.constructor = Constructor;
        if(namespace === undefined)
            var namespace = errors
        namespace[name] = Constructor;
    }
    errors.makeError = makeError;
    /**
     * here the definitions go
     */
    makeError('Error');
    makeError('Assertion', undefined , new errors.Error);
    makeError('CommandLine', undefined , new errors.Error);
    makeError('Value', undefined , new RangeError);
    makeError('MOM', undefined , new errors.Error);
    
    
    /**
     * if expression is false errors.Assertion is thrown
     * pass a message to explain yourself 
     **/
    errors.assert = function(exp, message) {
        if (!exp) {
            throw new errors.Assertion(message);
        }
    };
    errors.warn = function(message) {
        if(typeof console !== 'undefined' && console.log)
            console.log('WARNING: ' + message);
    };
    
    return errors;
});
