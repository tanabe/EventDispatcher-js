/**
 *  Custom Event Dispacher
 *  (c) Hideaki Tanabe <http://blog.kaihatsubu.com>
 *  Licensed under the MIT License.
 */
(function(window) {

  /**
   *  internal EventDispacher object
   */
  var EventDispacher = {
    /**
     *  dispatch event
     *  @param name event name
     *  @param eventObject custom event object
     */
    dispatchEvent: function(name, eventObject) {
      //console.log("dispatchEvent", name);
      var listeners = this.__events[name];
      for (var i = 0, length = listeners.length; i < length; i++) {
        listeners[i].handler.apply(listeners[i].thisObject, [name, this, eventObject]);
      }
    },

    /**
     *  add event listener
     *  @param name event name
     *  @param thisObject scope of handler
     *  @param handler event handler function
     */
    addEventListener: function(name, thisObject, handler) {
      //console.log("addEventListener", name, thisObject, handler);
      if (!this.__events[name]) {
        this.__events[name] = [];
      }

      if (indexOfEventListener(this.__events[name], thisObject, handler) > -1) {
        return;
      } else {
        this.__events[name].push({thisObject: thisObject, handler: handler});
      }
    },

    /**
     *  remove event listener
     *  @param name event name
     *  @param thisObject scope of handler
     *  @param handler event handler function
     */
    removeEventListener: function(name, thisObject, handler) {
      //console.log("removeEventListener", this);
      var listeners = this.__events[name];
      var index = indexOfEventListener(this.__events[name], thisObject, handler);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    }
  };

  /**
   *  return index of specified event handler
   *  @param name event name
   *  @param thisObject scope of handler
   *  @param handler event handler function
   *  @return index
   */
  var indexOfEventListener = function(listeners, thisObject, handler) {
    for (var i = 0, length = listeners.length; i < length; i++) {
      if (listeners[i]["thisObject"] === thisObject && listeners[i]["handler"] === handler) {
        return i;
      }
    }
    return -1;
  };

  /**
   *  add methods for specified object
   *  @param target
   */
  EventDispacher.initialize = function(target) {
    target.dispatchEvent = this.dispatchEvent;
    target.addEventListener = this.addEventListener;
    target.removeEventListener = this.removeEventListener;
    target.__events = {};
  };

  window.EventDispacher = EventDispacher;
})(window);
