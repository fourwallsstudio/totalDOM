# totalDOM

totalDOM is a JavaScript DOM interaction library inspired by jQuery.
Features include:

* Selection of single or group DOM Elements
* Traversal of DOM tree.
* Manipulate DOM Elements
* Create and assign events
* Simplify HTTP requests

## Getting Started

Using totalDOM is as simple as including the the totalDOM.js file in your script.

```html
  <head>
    <meta charset="utf-8">
    <title>Your Site</title>
    <script src='./lib/totalDOM.js'></script>
  </head>
```

## API

[`$l`](#l)

[DOM Traversal](#dom-traversal)  
  * [`each`](#each)  
  * [`children`](#children)  
  * [`parent`](#parent)  

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`toggleClass`](#toggleclass)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`$l.ajax`](#lajax)
