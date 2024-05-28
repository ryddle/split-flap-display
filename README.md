# ATTRIBUTIONS
Forked from a pen originally created on CodePen.io. Original URL: [https://codepen.io/joupain/pen/gELbGZ](https://codepen.io/joupain/pen/gELbGZ).

Original MIT license [ORIGINAL_CODEPEN_LICENSE](ORIGINAL_CODEPEN_LICENSE.txt) 

* This repository is an evolution of an original `joupain` [codepen](https://codepen.io/joupain/pen/gELbGZ) 

# NEW FEATURES

## Structure
Code is divided into two classes and one CSS file:
* `xsplit-flap.js` -> `splitFlapElm`:
    represents a single flap element
* `xsplit-flap.js` -> `splitFlap`:
    represents a set of flaps that works together (a display). <b>You should instantiate this class to create a display.</b>
* `xsplit-flap.css`:
    split-flap display styles

## Functionalities

* Loop between two values (like original CodePen)

### NEW

* Create instances.
* Specify options when creating the instance:
    * `parent`: HTMLElement (optional) - parent element
    * `beginText`: string (optional) - start text
    * `endText`: string (optional) - final text
    * `loop`: boolean (optional) - if loop or not
    * `size`: number (optional) - the number of elements of the display
* `noloop`: just show a text but don't change.
* `setText`: change from current text to new text.
* `setSize` (in constructor): sets the number of elements in the display. By default, the max size between `beginStr` and `endStr`.
* `roll`: roll the text to left or right.
* `setFlapsWidths`: by the moment, you can set the flap elements width globally for all instances.