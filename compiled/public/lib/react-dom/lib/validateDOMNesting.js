/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var emptyFunction = require('fbjs/lib/emptyFunction');
var warning = require('fbjs/lib/warning');

var validateDOMNesting = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  // This validation code was written based on the HTML5 parsing spec:
  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  //
  // Note: this does not catch all invalid nesting, nor does it try to (as it's
  // not clear what practical benefit doing so provides); instead, we warn only
  // for cases where the parser will give a parse tree differing from what React
  // intended. For example, <b><div></div></b> is invalid but we don't warn
  // because it still parses correctly; we do warn for other cases like nested
  // <p> tags where the beginning of the second element implicitly closes the
  // first, causing a confusing mess.

  // https://html.spec.whatwg.org/multipage/syntax.html#special
  var specialTags = ['address', 'applet', 'area', 'article', 'aside', 'base', 'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 'ul', 'wbr', 'xmp'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-scope
  var inScopeTags = ['applet', 'caption', 'html', 'table', 'td', 'th', 'marquee', 'object', 'template',

  // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
  // TODO: Distinguish by namespace here -- for <title>, including it here
  // errs on the side of fewer warnings
  'foreignObject', 'desc', 'title'];

  // https://html.spec.whatwg.org/multipage/syntax.html#has-an-element-in-button-scope
  var buttonScopeTags = inScopeTags.concat(['button']);

  // https://html.spec.whatwg.org/multipage/syntax.html#generate-implied-end-tags
  var impliedEndTags = ['dd', 'dt', 'li', 'option', 'optgroup', 'p', 'rp', 'rt'];

  var emptyAncestorInfo = {
    current: null,

    formTag: null,
    aTagInScope: null,
    buttonTagInScope: null,
    nobrTagInScope: null,
    pTagInButtonScope: null,

    listItemTagAutoclosing: null,
    dlItemTagAutoclosing: null
  };

  var updatedAncestorInfo = function updatedAncestorInfo(oldInfo, tag, instance) {
    var ancestorInfo = _assign({}, oldInfo || emptyAncestorInfo);
    var info = { tag: tag, instance: instance };

    if (inScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.aTagInScope = null;
      ancestorInfo.buttonTagInScope = null;
      ancestorInfo.nobrTagInScope = null;
    }
    if (buttonScopeTags.indexOf(tag) !== -1) {
      ancestorInfo.pTagInButtonScope = null;
    }

    // See rules for 'li', 'dd', 'dt' start tags in
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    if (specialTags.indexOf(tag) !== -1 && tag !== 'address' && tag !== 'div' && tag !== 'p') {
      ancestorInfo.listItemTagAutoclosing = null;
      ancestorInfo.dlItemTagAutoclosing = null;
    }

    ancestorInfo.current = info;

    if (tag === 'form') {
      ancestorInfo.formTag = info;
    }
    if (tag === 'a') {
      ancestorInfo.aTagInScope = info;
    }
    if (tag === 'button') {
      ancestorInfo.buttonTagInScope = info;
    }
    if (tag === 'nobr') {
      ancestorInfo.nobrTagInScope = info;
    }
    if (tag === 'p') {
      ancestorInfo.pTagInButtonScope = info;
    }
    if (tag === 'li') {
      ancestorInfo.listItemTagAutoclosing = info;
    }
    if (tag === 'dd' || tag === 'dt') {
      ancestorInfo.dlItemTagAutoclosing = info;
    }

    return ancestorInfo;
  };

  /**
   * Returns whether
   */
  var isTagValidWithParent = function isTagValidWithParent(tag, parentTag) {
    // First, let's check if we're in an unusual parsing mode...
    switch (parentTag) {
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
      case 'select':
        return tag === 'option' || tag === 'optgroup' || tag === '#text';
      case 'optgroup':
        return tag === 'option' || tag === '#text';
      // Strictly speaking, seeing an <option> doesn't mean we're in a <select>
      // but
      case 'option':
        return tag === '#text';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
      // No special behavior since these rules fall back to "in body" mode for
      // all except special table nodes which cause bad parsing behavior anyway.

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
      case 'tr':
        return tag === 'th' || tag === 'td' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
      case 'tbody':
      case 'thead':
      case 'tfoot':
        return tag === 'tr' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
      case 'colgroup':
        return tag === 'col' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
      case 'table':
        return tag === 'caption' || tag === 'colgroup' || tag === 'tbody' || tag === 'tfoot' || tag === 'thead' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
      case 'head':
        return tag === 'base' || tag === 'basefont' || tag === 'bgsound' || tag === 'link' || tag === 'meta' || tag === 'title' || tag === 'noscript' || tag === 'noframes' || tag === 'style' || tag === 'script' || tag === 'template';

      // https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
      case 'html':
        return tag === 'head' || tag === 'body';
      case '#document':
        return tag === 'html';
    }

    // Probably in the "in body" parsing mode, so we outlaw only tag combos
    // where the parsing rules cause implicit opens or closes to be added.
    // https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
    switch (tag) {
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return parentTag !== 'h1' && parentTag !== 'h2' && parentTag !== 'h3' && parentTag !== 'h4' && parentTag !== 'h5' && parentTag !== 'h6';

      case 'rp':
      case 'rt':
        return impliedEndTags.indexOf(parentTag) === -1;

      case 'body':
      case 'caption':
      case 'col':
      case 'colgroup':
      case 'frame':
      case 'head':
      case 'html':
      case 'tbody':
      case 'td':
      case 'tfoot':
      case 'th':
      case 'thead':
      case 'tr':
        // These tags are only valid with a few parents that have special child
        // parsing rules -- if we're down here, then none of those matched and
        // so we allow it only if we don't know what the parent is, as all other
        // cases are invalid.
        return parentTag == null;
    }

    return true;
  };

  /**
   * Returns whether
   */
  var findInvalidAncestorForTag = function findInvalidAncestorForTag(tag, ancestorInfo) {
    switch (tag) {
      case 'address':
      case 'article':
      case 'aside':
      case 'blockquote':
      case 'center':
      case 'details':
      case 'dialog':
      case 'dir':
      case 'div':
      case 'dl':
      case 'fieldset':
      case 'figcaption':
      case 'figure':
      case 'footer':
      case 'header':
      case 'hgroup':
      case 'main':
      case 'menu':
      case 'nav':
      case 'ol':
      case 'p':
      case 'section':
      case 'summary':
      case 'ul':

      case 'pre':
      case 'listing':

      case 'table':

      case 'hr':

      case 'xmp':

      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return ancestorInfo.pTagInButtonScope;

      case 'form':
        return ancestorInfo.formTag || ancestorInfo.pTagInButtonScope;

      case 'li':
        return ancestorInfo.listItemTagAutoclosing;

      case 'dd':
      case 'dt':
        return ancestorInfo.dlItemTagAutoclosing;

      case 'button':
        return ancestorInfo.buttonTagInScope;

      case 'a':
        // Spec says something about storing a list of markers, but it sounds
        // equivalent to this check.
        return ancestorInfo.aTagInScope;

      case 'nobr':
        return ancestorInfo.nobrTagInScope;
    }

    return null;
  };

  /**
   * Given a ReactCompositeComponent instance, return a list of its recursive
   * owners, starting at the root and ending with the instance itself.
   */
  var findOwnerStack = function findOwnerStack(instance) {
    if (!instance) {
      return [];
    }

    var stack = [];
    do {
      stack.push(instance);
    } while (instance = instance._currentElement._owner);
    stack.reverse();
    return stack;
  };

  var didWarn = {};

  validateDOMNesting = function validateDOMNesting(childTag, childText, childInstance, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.current;
    var parentTag = parentInfo && parentInfo.tag;

    if (childText != null) {
      process.env.NODE_ENV !== 'production' ? warning(childTag == null, 'validateDOMNesting: when childText is passed, childTag should be null') : void 0;
      childTag = '#text';
    }

    var invalidParent = isTagValidWithParent(childTag, parentTag) ? null : parentInfo;
    var invalidAncestor = invalidParent ? null : findInvalidAncestorForTag(childTag, ancestorInfo);
    var problematic = invalidParent || invalidAncestor;

    if (problematic) {
      var ancestorTag = problematic.tag;
      var ancestorInstance = problematic.instance;

      var childOwner = childInstance && childInstance._currentElement._owner;
      var ancestorOwner = ancestorInstance && ancestorInstance._currentElement._owner;

      var childOwners = findOwnerStack(childOwner);
      var ancestorOwners = findOwnerStack(ancestorOwner);

      var minStackLen = Math.min(childOwners.length, ancestorOwners.length);
      var i;

      var deepestCommon = -1;
      for (i = 0; i < minStackLen; i++) {
        if (childOwners[i] === ancestorOwners[i]) {
          deepestCommon = i;
        } else {
          break;
        }
      }

      var UNKNOWN = '(unknown)';
      var childOwnerNames = childOwners.slice(deepestCommon + 1).map(function (inst) {
        return inst.getName() || UNKNOWN;
      });
      var ancestorOwnerNames = ancestorOwners.slice(deepestCommon + 1).map(function (inst) {
        return inst.getName() || UNKNOWN;
      });
      var ownerInfo = [].concat(
      // If the parent and child instances have a common owner ancestor, start
      // with that -- otherwise we just start with the parent's owners.
      deepestCommon !== -1 ? childOwners[deepestCommon].getName() || UNKNOWN : [], ancestorOwnerNames, ancestorTag,
      // If we're warning about an invalid (non-parent) ancestry, add '...'
      invalidAncestor ? ['...'] : [], childOwnerNames, childTag).join(' > ');

      var warnKey = !!invalidParent + '|' + childTag + '|' + ancestorTag + '|' + ownerInfo;
      if (didWarn[warnKey]) {
        return;
      }
      didWarn[warnKey] = true;

      var tagDisplayName = childTag;
      var whitespaceInfo = '';
      if (childTag === '#text') {
        if (/\S/.test(childText)) {
          tagDisplayName = 'Text nodes';
        } else {
          tagDisplayName = 'Whitespace text nodes';
          whitespaceInfo = ' Make sure you don\'t have any extra whitespace between tags on ' + 'each line of your source code.';
        }
      } else {
        tagDisplayName = '<' + childTag + '>';
      }

      if (invalidParent) {
        var info = '';
        if (ancestorTag === 'table' && childTag === 'tr') {
          info += ' Add a <tbody> to your code to match the DOM tree generated by ' + 'the browser.';
        }
        process.env.NODE_ENV !== 'production' ? warning(false, 'validateDOMNesting(...): %s cannot appear as a child of <%s>.%s ' + 'See %s.%s', tagDisplayName, ancestorTag, whitespaceInfo, ownerInfo, info) : void 0;
      } else {
        process.env.NODE_ENV !== 'production' ? warning(false, 'validateDOMNesting(...): %s cannot appear as a descendant of ' + '<%s>. See %s.', tagDisplayName, ancestorTag, ownerInfo) : void 0;
      }
    }
  };

  validateDOMNesting.updatedAncestorInfo = updatedAncestorInfo;

  // For testing
  validateDOMNesting.isTagValidInContext = function (tag, ancestorInfo) {
    ancestorInfo = ancestorInfo || emptyAncestorInfo;
    var parentInfo = ancestorInfo.current;
    var parentTag = parentInfo && parentInfo.tag;
    return isTagValidWithParent(tag, parentTag) && !findInvalidAncestorForTag(tag, ancestorInfo);
  };
}

module.exports = validateDOMNesting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi92YWxpZGF0ZURPTU5lc3RpbmcuanMiXSwibmFtZXMiOlsiX2Fzc2lnbiIsInJlcXVpcmUiLCJlbXB0eUZ1bmN0aW9uIiwid2FybmluZyIsInZhbGlkYXRlRE9NTmVzdGluZyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsInNwZWNpYWxUYWdzIiwiaW5TY29wZVRhZ3MiLCJidXR0b25TY29wZVRhZ3MiLCJjb25jYXQiLCJpbXBsaWVkRW5kVGFncyIsImVtcHR5QW5jZXN0b3JJbmZvIiwiY3VycmVudCIsImZvcm1UYWciLCJhVGFnSW5TY29wZSIsImJ1dHRvblRhZ0luU2NvcGUiLCJub2JyVGFnSW5TY29wZSIsInBUYWdJbkJ1dHRvblNjb3BlIiwibGlzdEl0ZW1UYWdBdXRvY2xvc2luZyIsImRsSXRlbVRhZ0F1dG9jbG9zaW5nIiwidXBkYXRlZEFuY2VzdG9ySW5mbyIsIm9sZEluZm8iLCJ0YWciLCJpbnN0YW5jZSIsImFuY2VzdG9ySW5mbyIsImluZm8iLCJpbmRleE9mIiwiaXNUYWdWYWxpZFdpdGhQYXJlbnQiLCJwYXJlbnRUYWciLCJmaW5kSW52YWxpZEFuY2VzdG9yRm9yVGFnIiwiZmluZE93bmVyU3RhY2siLCJzdGFjayIsInB1c2giLCJfY3VycmVudEVsZW1lbnQiLCJfb3duZXIiLCJyZXZlcnNlIiwiZGlkV2FybiIsImNoaWxkVGFnIiwiY2hpbGRUZXh0IiwiY2hpbGRJbnN0YW5jZSIsInBhcmVudEluZm8iLCJpbnZhbGlkUGFyZW50IiwiaW52YWxpZEFuY2VzdG9yIiwicHJvYmxlbWF0aWMiLCJhbmNlc3RvclRhZyIsImFuY2VzdG9ySW5zdGFuY2UiLCJjaGlsZE93bmVyIiwiYW5jZXN0b3JPd25lciIsImNoaWxkT3duZXJzIiwiYW5jZXN0b3JPd25lcnMiLCJtaW5TdGFja0xlbiIsIk1hdGgiLCJtaW4iLCJsZW5ndGgiLCJpIiwiZGVlcGVzdENvbW1vbiIsIlVOS05PV04iLCJjaGlsZE93bmVyTmFtZXMiLCJzbGljZSIsIm1hcCIsImluc3QiLCJnZXROYW1lIiwiYW5jZXN0b3JPd25lck5hbWVzIiwib3duZXJJbmZvIiwiam9pbiIsIndhcm5LZXkiLCJ0YWdEaXNwbGF5TmFtZSIsIndoaXRlc3BhY2VJbmZvIiwidGVzdCIsImlzVGFnVmFsaWRJbkNvbnRleHQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7OztBQVVBOztBQUVBLElBQUlBLFVBQVVDLFFBQVEsZUFBUixDQUFkOztBQUVBLElBQUlDLGdCQUFnQkQsUUFBUSx3QkFBUixDQUFwQjtBQUNBLElBQUlFLFVBQVVGLFFBQVEsa0JBQVIsQ0FBZDs7QUFFQSxJQUFJRyxxQkFBcUJGLGFBQXpCOztBQUVBLElBQUlHLFFBQVFDLEdBQVIsQ0FBWUMsUUFBWixLQUF5QixZQUE3QixFQUEyQztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUlDLGNBQWMsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixNQUF0QixFQUE4QixTQUE5QixFQUF5QyxPQUF6QyxFQUFrRCxNQUFsRCxFQUEwRCxVQUExRCxFQUFzRSxTQUF0RSxFQUFpRixZQUFqRixFQUErRixNQUEvRixFQUF1RyxJQUF2RyxFQUE2RyxRQUE3RyxFQUF1SCxTQUF2SCxFQUFrSSxRQUFsSSxFQUE0SSxLQUE1SSxFQUFtSixVQUFuSixFQUErSixJQUEvSixFQUFxSyxTQUFySyxFQUFnTCxLQUFoTCxFQUF1TCxLQUF2TCxFQUE4TCxJQUE5TCxFQUFvTSxJQUFwTSxFQUEwTSxPQUExTSxFQUFtTixVQUFuTixFQUErTixZQUEvTixFQUE2TyxRQUE3TyxFQUF1UCxRQUF2UCxFQUFpUSxNQUFqUSxFQUF5USxPQUF6USxFQUFrUixVQUFsUixFQUE4UixJQUE5UixFQUFvUyxJQUFwUyxFQUEwUyxJQUExUyxFQUFnVCxJQUFoVCxFQUFzVCxJQUF0VCxFQUE0VCxJQUE1VCxF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InZhbGlkYXRlRE9NTmVzdGluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgdmFsaWRhdGVET01OZXN0aW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgLy8gVGhpcyB2YWxpZGF0aW9uIGNvZGUgd2FzIHdyaXR0ZW4gYmFzZWQgb24gdGhlIEhUTUw1IHBhcnNpbmcgc3BlYzpcbiAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjaGFzLWFuLWVsZW1lbnQtaW4tc2NvcGVcbiAgLy9cbiAgLy8gTm90ZTogdGhpcyBkb2VzIG5vdCBjYXRjaCBhbGwgaW52YWxpZCBuZXN0aW5nLCBub3IgZG9lcyBpdCB0cnkgdG8gKGFzIGl0J3NcbiAgLy8gbm90IGNsZWFyIHdoYXQgcHJhY3RpY2FsIGJlbmVmaXQgZG9pbmcgc28gcHJvdmlkZXMpOyBpbnN0ZWFkLCB3ZSB3YXJuIG9ubHlcbiAgLy8gZm9yIGNhc2VzIHdoZXJlIHRoZSBwYXJzZXIgd2lsbCBnaXZlIGEgcGFyc2UgdHJlZSBkaWZmZXJpbmcgZnJvbSB3aGF0IFJlYWN0XG4gIC8vIGludGVuZGVkLiBGb3IgZXhhbXBsZSwgPGI+PGRpdj48L2Rpdj48L2I+IGlzIGludmFsaWQgYnV0IHdlIGRvbid0IHdhcm5cbiAgLy8gYmVjYXVzZSBpdCBzdGlsbCBwYXJzZXMgY29ycmVjdGx5OyB3ZSBkbyB3YXJuIGZvciBvdGhlciBjYXNlcyBsaWtlIG5lc3RlZFxuICAvLyA8cD4gdGFncyB3aGVyZSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzZWNvbmQgZWxlbWVudCBpbXBsaWNpdGx5IGNsb3NlcyB0aGVcbiAgLy8gZmlyc3QsIGNhdXNpbmcgYSBjb25mdXNpbmcgbWVzcy5cblxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNzcGVjaWFsXG4gIHZhciBzcGVjaWFsVGFncyA9IFsnYWRkcmVzcycsICdhcHBsZXQnLCAnYXJlYScsICdhcnRpY2xlJywgJ2FzaWRlJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYmdzb3VuZCcsICdibG9ja3F1b3RlJywgJ2JvZHknLCAnYnInLCAnYnV0dG9uJywgJ2NhcHRpb24nLCAnY2VudGVyJywgJ2NvbCcsICdjb2xncm91cCcsICdkZCcsICdkZXRhaWxzJywgJ2RpcicsICdkaXYnLCAnZGwnLCAnZHQnLCAnZW1iZWQnLCAnZmllbGRzZXQnLCAnZmlnY2FwdGlvbicsICdmaWd1cmUnLCAnZm9vdGVyJywgJ2Zvcm0nLCAnZnJhbWUnLCAnZnJhbWVzZXQnLCAnaDEnLCAnaDInLCAnaDMnLCAnaDQnLCAnaDUnLCAnaDYnLCAnaGVhZCcsICdoZWFkZXInLCAnaGdyb3VwJywgJ2hyJywgJ2h0bWwnLCAnaWZyYW1lJywgJ2ltZycsICdpbnB1dCcsICdpc2luZGV4JywgJ2xpJywgJ2xpbmsnLCAnbGlzdGluZycsICdtYWluJywgJ21hcnF1ZWUnLCAnbWVudScsICdtZW51aXRlbScsICdtZXRhJywgJ25hdicsICdub2VtYmVkJywgJ25vZnJhbWVzJywgJ25vc2NyaXB0JywgJ29iamVjdCcsICdvbCcsICdwJywgJ3BhcmFtJywgJ3BsYWludGV4dCcsICdwcmUnLCAnc2NyaXB0JywgJ3NlY3Rpb24nLCAnc2VsZWN0JywgJ3NvdXJjZScsICdzdHlsZScsICdzdW1tYXJ5JywgJ3RhYmxlJywgJ3Rib2R5JywgJ3RkJywgJ3RlbXBsYXRlJywgJ3RleHRhcmVhJywgJ3Rmb290JywgJ3RoJywgJ3RoZWFkJywgJ3RpdGxlJywgJ3RyJywgJ3RyYWNrJywgJ3VsJywgJ3dicicsICd4bXAnXTtcblxuICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNoYXMtYW4tZWxlbWVudC1pbi1zY29wZVxuICB2YXIgaW5TY29wZVRhZ3MgPSBbJ2FwcGxldCcsICdjYXB0aW9uJywgJ2h0bWwnLCAndGFibGUnLCAndGQnLCAndGgnLCAnbWFycXVlZScsICdvYmplY3QnLCAndGVtcGxhdGUnLFxuXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2h0bWwtaW50ZWdyYXRpb24tcG9pbnRcbiAgLy8gVE9ETzogRGlzdGluZ3Vpc2ggYnkgbmFtZXNwYWNlIGhlcmUgLS0gZm9yIDx0aXRsZT4sIGluY2x1ZGluZyBpdCBoZXJlXG4gIC8vIGVycnMgb24gdGhlIHNpZGUgb2YgZmV3ZXIgd2FybmluZ3NcbiAgJ2ZvcmVpZ25PYmplY3QnLCAnZGVzYycsICd0aXRsZSddO1xuXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2hhcy1hbi1lbGVtZW50LWluLWJ1dHRvbi1zY29wZVxuICB2YXIgYnV0dG9uU2NvcGVUYWdzID0gaW5TY29wZVRhZ3MuY29uY2F0KFsnYnV0dG9uJ10pO1xuXG4gIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI2dlbmVyYXRlLWltcGxpZWQtZW5kLXRhZ3NcbiAgdmFyIGltcGxpZWRFbmRUYWdzID0gWydkZCcsICdkdCcsICdsaScsICdvcHRpb24nLCAnb3B0Z3JvdXAnLCAncCcsICdycCcsICdydCddO1xuXG4gIHZhciBlbXB0eUFuY2VzdG9ySW5mbyA9IHtcbiAgICBjdXJyZW50OiBudWxsLFxuXG4gICAgZm9ybVRhZzogbnVsbCxcbiAgICBhVGFnSW5TY29wZTogbnVsbCxcbiAgICBidXR0b25UYWdJblNjb3BlOiBudWxsLFxuICAgIG5vYnJUYWdJblNjb3BlOiBudWxsLFxuICAgIHBUYWdJbkJ1dHRvblNjb3BlOiBudWxsLFxuXG4gICAgbGlzdEl0ZW1UYWdBdXRvY2xvc2luZzogbnVsbCxcbiAgICBkbEl0ZW1UYWdBdXRvY2xvc2luZzogbnVsbFxuICB9O1xuXG4gIHZhciB1cGRhdGVkQW5jZXN0b3JJbmZvID0gZnVuY3Rpb24gKG9sZEluZm8sIHRhZywgaW5zdGFuY2UpIHtcbiAgICB2YXIgYW5jZXN0b3JJbmZvID0gX2Fzc2lnbih7fSwgb2xkSW5mbyB8fCBlbXB0eUFuY2VzdG9ySW5mbyk7XG4gICAgdmFyIGluZm8gPSB7IHRhZzogdGFnLCBpbnN0YW5jZTogaW5zdGFuY2UgfTtcblxuICAgIGlmIChpblNjb3BlVGFncy5pbmRleE9mKHRhZykgIT09IC0xKSB7XG4gICAgICBhbmNlc3RvckluZm8uYVRhZ0luU2NvcGUgPSBudWxsO1xuICAgICAgYW5jZXN0b3JJbmZvLmJ1dHRvblRhZ0luU2NvcGUgPSBudWxsO1xuICAgICAgYW5jZXN0b3JJbmZvLm5vYnJUYWdJblNjb3BlID0gbnVsbDtcbiAgICB9XG4gICAgaWYgKGJ1dHRvblNjb3BlVGFncy5pbmRleE9mKHRhZykgIT09IC0xKSB7XG4gICAgICBhbmNlc3RvckluZm8ucFRhZ0luQnV0dG9uU2NvcGUgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlZSBydWxlcyBmb3IgJ2xpJywgJ2RkJywgJ2R0JyBzdGFydCB0YWdzIGluXG4gICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keVxuICAgIGlmIChzcGVjaWFsVGFncy5pbmRleE9mKHRhZykgIT09IC0xICYmIHRhZyAhPT0gJ2FkZHJlc3MnICYmIHRhZyAhPT0gJ2RpdicgJiYgdGFnICE9PSAncCcpIHtcbiAgICAgIGFuY2VzdG9ySW5mby5saXN0SXRlbVRhZ0F1dG9jbG9zaW5nID0gbnVsbDtcbiAgICAgIGFuY2VzdG9ySW5mby5kbEl0ZW1UYWdBdXRvY2xvc2luZyA9IG51bGw7XG4gICAgfVxuXG4gICAgYW5jZXN0b3JJbmZvLmN1cnJlbnQgPSBpbmZvO1xuXG4gICAgaWYgKHRhZyA9PT0gJ2Zvcm0nKSB7XG4gICAgICBhbmNlc3RvckluZm8uZm9ybVRhZyA9IGluZm87XG4gICAgfVxuICAgIGlmICh0YWcgPT09ICdhJykge1xuICAgICAgYW5jZXN0b3JJbmZvLmFUYWdJblNjb3BlID0gaW5mbztcbiAgICB9XG4gICAgaWYgKHRhZyA9PT0gJ2J1dHRvbicpIHtcbiAgICAgIGFuY2VzdG9ySW5mby5idXR0b25UYWdJblNjb3BlID0gaW5mbztcbiAgICB9XG4gICAgaWYgKHRhZyA9PT0gJ25vYnInKSB7XG4gICAgICBhbmNlc3RvckluZm8ubm9iclRhZ0luU2NvcGUgPSBpbmZvO1xuICAgIH1cbiAgICBpZiAodGFnID09PSAncCcpIHtcbiAgICAgIGFuY2VzdG9ySW5mby5wVGFnSW5CdXR0b25TY29wZSA9IGluZm87XG4gICAgfVxuICAgIGlmICh0YWcgPT09ICdsaScpIHtcbiAgICAgIGFuY2VzdG9ySW5mby5saXN0SXRlbVRhZ0F1dG9jbG9zaW5nID0gaW5mbztcbiAgICB9XG4gICAgaWYgKHRhZyA9PT0gJ2RkJyB8fCB0YWcgPT09ICdkdCcpIHtcbiAgICAgIGFuY2VzdG9ySW5mby5kbEl0ZW1UYWdBdXRvY2xvc2luZyA9IGluZm87XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuY2VzdG9ySW5mbztcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB3aGV0aGVyXG4gICAqL1xuICB2YXIgaXNUYWdWYWxpZFdpdGhQYXJlbnQgPSBmdW5jdGlvbiAodGFnLCBwYXJlbnRUYWcpIHtcbiAgICAvLyBGaXJzdCwgbGV0J3MgY2hlY2sgaWYgd2UncmUgaW4gYW4gdW51c3VhbCBwYXJzaW5nIG1vZGUuLi5cbiAgICBzd2l0Y2ggKHBhcmVudFRhZykge1xuICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluc2VsZWN0XG4gICAgICBjYXNlICdzZWxlY3QnOlxuICAgICAgICByZXR1cm4gdGFnID09PSAnb3B0aW9uJyB8fCB0YWcgPT09ICdvcHRncm91cCcgfHwgdGFnID09PSAnI3RleHQnO1xuICAgICAgY2FzZSAnb3B0Z3JvdXAnOlxuICAgICAgICByZXR1cm4gdGFnID09PSAnb3B0aW9uJyB8fCB0YWcgPT09ICcjdGV4dCc7XG4gICAgICAvLyBTdHJpY3RseSBzcGVha2luZywgc2VlaW5nIGFuIDxvcHRpb24+IGRvZXNuJ3QgbWVhbiB3ZSdyZSBpbiBhIDxzZWxlY3Q+XG4gICAgICAvLyBidXRcbiAgICAgIGNhc2UgJ29wdGlvbic6XG4gICAgICAgIHJldHVybiB0YWcgPT09ICcjdGV4dCc7XG5cbiAgICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL3N5bnRheC5odG1sI3BhcnNpbmctbWFpbi1pbnRkXG4gICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNwYXJzaW5nLW1haW4taW5jYXB0aW9uXG4gICAgICAvLyBObyBzcGVjaWFsIGJlaGF2aW9yIHNpbmNlIHRoZXNlIHJ1bGVzIGZhbGwgYmFjayB0byBcImluIGJvZHlcIiBtb2RlIGZvclxuICAgICAgLy8gYWxsIGV4Y2VwdCBzcGVjaWFsIHRhYmxlIG5vZGVzIHdoaWNoIGNhdXNlIGJhZCBwYXJzaW5nIGJlaGF2aW9yIGFueXdheS5cblxuICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWludHJcbiAgICAgIGNhc2UgJ3RyJzpcbiAgICAgICAgcmV0dXJuIHRhZyA9PT0gJ3RoJyB8fCB0YWcgPT09ICd0ZCcgfHwgdGFnID09PSAnc3R5bGUnIHx8IHRhZyA9PT0gJ3NjcmlwdCcgfHwgdGFnID09PSAndGVtcGxhdGUnO1xuXG4gICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNwYXJzaW5nLW1haW4taW50Ym9keVxuICAgICAgY2FzZSAndGJvZHknOlxuICAgICAgY2FzZSAndGhlYWQnOlxuICAgICAgY2FzZSAndGZvb3QnOlxuICAgICAgICByZXR1cm4gdGFnID09PSAndHInIHx8IHRhZyA9PT0gJ3N0eWxlJyB8fCB0YWcgPT09ICdzY3JpcHQnIHx8IHRhZyA9PT0gJ3RlbXBsYXRlJztcblxuICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluY29sZ3JvdXBcbiAgICAgIGNhc2UgJ2NvbGdyb3VwJzpcbiAgICAgICAgcmV0dXJuIHRhZyA9PT0gJ2NvbCcgfHwgdGFnID09PSAndGVtcGxhdGUnO1xuXG4gICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zeW50YXguaHRtbCNwYXJzaW5nLW1haW4taW50YWJsZVxuICAgICAgY2FzZSAndGFibGUnOlxuICAgICAgICByZXR1cm4gdGFnID09PSAnY2FwdGlvbicgfHwgdGFnID09PSAnY29sZ3JvdXAnIHx8IHRhZyA9PT0gJ3Rib2R5JyB8fCB0YWcgPT09ICd0Zm9vdCcgfHwgdGFnID09PSAndGhlYWQnIHx8IHRhZyA9PT0gJ3N0eWxlJyB8fCB0YWcgPT09ICdzY3JpcHQnIHx8IHRhZyA9PT0gJ3RlbXBsYXRlJztcblxuICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluaGVhZFxuICAgICAgY2FzZSAnaGVhZCc6XG4gICAgICAgIHJldHVybiB0YWcgPT09ICdiYXNlJyB8fCB0YWcgPT09ICdiYXNlZm9udCcgfHwgdGFnID09PSAnYmdzb3VuZCcgfHwgdGFnID09PSAnbGluaycgfHwgdGFnID09PSAnbWV0YScgfHwgdGFnID09PSAndGl0bGUnIHx8IHRhZyA9PT0gJ25vc2NyaXB0JyB8fCB0YWcgPT09ICdub2ZyYW1lcycgfHwgdGFnID09PSAnc3R5bGUnIHx8IHRhZyA9PT0gJ3NjcmlwdCcgfHwgdGFnID09PSAndGVtcGxhdGUnO1xuXG4gICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9zZW1hbnRpY3MuaHRtbCN0aGUtaHRtbC1lbGVtZW50XG4gICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgcmV0dXJuIHRhZyA9PT0gJ2hlYWQnIHx8IHRhZyA9PT0gJ2JvZHknO1xuICAgICAgY2FzZSAnI2RvY3VtZW50JzpcbiAgICAgICAgcmV0dXJuIHRhZyA9PT0gJ2h0bWwnO1xuICAgIH1cblxuICAgIC8vIFByb2JhYmx5IGluIHRoZSBcImluIGJvZHlcIiBwYXJzaW5nIG1vZGUsIHNvIHdlIG91dGxhdyBvbmx5IHRhZyBjb21ib3NcbiAgICAvLyB3aGVyZSB0aGUgcGFyc2luZyBydWxlcyBjYXVzZSBpbXBsaWNpdCBvcGVucyBvciBjbG9zZXMgdG8gYmUgYWRkZWQuXG4gICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2Uvc3ludGF4Lmh0bWwjcGFyc2luZy1tYWluLWluYm9keVxuICAgIHN3aXRjaCAodGFnKSB7XG4gICAgICBjYXNlICdoMSc6XG4gICAgICBjYXNlICdoMic6XG4gICAgICBjYXNlICdoMyc6XG4gICAgICBjYXNlICdoNCc6XG4gICAgICBjYXNlICdoNSc6XG4gICAgICBjYXNlICdoNic6XG4gICAgICAgIHJldHVybiBwYXJlbnRUYWcgIT09ICdoMScgJiYgcGFyZW50VGFnICE9PSAnaDInICYmIHBhcmVudFRhZyAhPT0gJ2gzJyAmJiBwYXJlbnRUYWcgIT09ICdoNCcgJiYgcGFyZW50VGFnICE9PSAnaDUnICYmIHBhcmVudFRhZyAhPT0gJ2g2JztcblxuICAgICAgY2FzZSAncnAnOlxuICAgICAgY2FzZSAncnQnOlxuICAgICAgICByZXR1cm4gaW1wbGllZEVuZFRhZ3MuaW5kZXhPZihwYXJlbnRUYWcpID09PSAtMTtcblxuICAgICAgY2FzZSAnYm9keSc6XG4gICAgICBjYXNlICdjYXB0aW9uJzpcbiAgICAgIGNhc2UgJ2NvbCc6XG4gICAgICBjYXNlICdjb2xncm91cCc6XG4gICAgICBjYXNlICdmcmFtZSc6XG4gICAgICBjYXNlICdoZWFkJzpcbiAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgY2FzZSAndGJvZHknOlxuICAgICAgY2FzZSAndGQnOlxuICAgICAgY2FzZSAndGZvb3QnOlxuICAgICAgY2FzZSAndGgnOlxuICAgICAgY2FzZSAndGhlYWQnOlxuICAgICAgY2FzZSAndHInOlxuICAgICAgICAvLyBUaGVzZSB0YWdzIGFyZSBvbmx5IHZhbGlkIHdpdGggYSBmZXcgcGFyZW50cyB0aGF0IGhhdmUgc3BlY2lhbCBjaGlsZFxuICAgICAgICAvLyBwYXJzaW5nIHJ1bGVzIC0tIGlmIHdlJ3JlIGRvd24gaGVyZSwgdGhlbiBub25lIG9mIHRob3NlIG1hdGNoZWQgYW5kXG4gICAgICAgIC8vIHNvIHdlIGFsbG93IGl0IG9ubHkgaWYgd2UgZG9uJ3Qga25vdyB3aGF0IHRoZSBwYXJlbnQgaXMsIGFzIGFsbCBvdGhlclxuICAgICAgICAvLyBjYXNlcyBhcmUgaW52YWxpZC5cbiAgICAgICAgcmV0dXJuIHBhcmVudFRhZyA9PSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHdoZXRoZXJcbiAgICovXG4gIHZhciBmaW5kSW52YWxpZEFuY2VzdG9yRm9yVGFnID0gZnVuY3Rpb24gKHRhZywgYW5jZXN0b3JJbmZvKSB7XG4gICAgc3dpdGNoICh0YWcpIHtcbiAgICAgIGNhc2UgJ2FkZHJlc3MnOlxuICAgICAgY2FzZSAnYXJ0aWNsZSc6XG4gICAgICBjYXNlICdhc2lkZSc6XG4gICAgICBjYXNlICdibG9ja3F1b3RlJzpcbiAgICAgIGNhc2UgJ2NlbnRlcic6XG4gICAgICBjYXNlICdkZXRhaWxzJzpcbiAgICAgIGNhc2UgJ2RpYWxvZyc6XG4gICAgICBjYXNlICdkaXInOlxuICAgICAgY2FzZSAnZGl2JzpcbiAgICAgIGNhc2UgJ2RsJzpcbiAgICAgIGNhc2UgJ2ZpZWxkc2V0JzpcbiAgICAgIGNhc2UgJ2ZpZ2NhcHRpb24nOlxuICAgICAgY2FzZSAnZmlndXJlJzpcbiAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgY2FzZSAnaGdyb3VwJzpcbiAgICAgIGNhc2UgJ21haW4nOlxuICAgICAgY2FzZSAnbWVudSc6XG4gICAgICBjYXNlICduYXYnOlxuICAgICAgY2FzZSAnb2wnOlxuICAgICAgY2FzZSAncCc6XG4gICAgICBjYXNlICdzZWN0aW9uJzpcbiAgICAgIGNhc2UgJ3N1bW1hcnknOlxuICAgICAgY2FzZSAndWwnOlxuXG4gICAgICBjYXNlICdwcmUnOlxuICAgICAgY2FzZSAnbGlzdGluZyc6XG5cbiAgICAgIGNhc2UgJ3RhYmxlJzpcblxuICAgICAgY2FzZSAnaHInOlxuXG4gICAgICBjYXNlICd4bXAnOlxuXG4gICAgICBjYXNlICdoMSc6XG4gICAgICBjYXNlICdoMic6XG4gICAgICBjYXNlICdoMyc6XG4gICAgICBjYXNlICdoNCc6XG4gICAgICBjYXNlICdoNSc6XG4gICAgICBjYXNlICdoNic6XG4gICAgICAgIHJldHVybiBhbmNlc3RvckluZm8ucFRhZ0luQnV0dG9uU2NvcGU7XG5cbiAgICAgIGNhc2UgJ2Zvcm0nOlxuICAgICAgICByZXR1cm4gYW5jZXN0b3JJbmZvLmZvcm1UYWcgfHwgYW5jZXN0b3JJbmZvLnBUYWdJbkJ1dHRvblNjb3BlO1xuXG4gICAgICBjYXNlICdsaSc6XG4gICAgICAgIHJldHVybiBhbmNlc3RvckluZm8ubGlzdEl0ZW1UYWdBdXRvY2xvc2luZztcblxuICAgICAgY2FzZSAnZGQnOlxuICAgICAgY2FzZSAnZHQnOlxuICAgICAgICByZXR1cm4gYW5jZXN0b3JJbmZvLmRsSXRlbVRhZ0F1dG9jbG9zaW5nO1xuXG4gICAgICBjYXNlICdidXR0b24nOlxuICAgICAgICByZXR1cm4gYW5jZXN0b3JJbmZvLmJ1dHRvblRhZ0luU2NvcGU7XG5cbiAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAvLyBTcGVjIHNheXMgc29tZXRoaW5nIGFib3V0IHN0b3JpbmcgYSBsaXN0IG9mIG1hcmtlcnMsIGJ1dCBpdCBzb3VuZHNcbiAgICAgICAgLy8gZXF1aXZhbGVudCB0byB0aGlzIGNoZWNrLlxuICAgICAgICByZXR1cm4gYW5jZXN0b3JJbmZvLmFUYWdJblNjb3BlO1xuXG4gICAgICBjYXNlICdub2JyJzpcbiAgICAgICAgcmV0dXJuIGFuY2VzdG9ySW5mby5ub2JyVGFnSW5TY29wZTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogR2l2ZW4gYSBSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCBpbnN0YW5jZSwgcmV0dXJuIGEgbGlzdCBvZiBpdHMgcmVjdXJzaXZlXG4gICAqIG93bmVycywgc3RhcnRpbmcgYXQgdGhlIHJvb3QgYW5kIGVuZGluZyB3aXRoIHRoZSBpbnN0YW5jZSBpdHNlbGYuXG4gICAqL1xuICB2YXIgZmluZE93bmVyU3RhY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgICBpZiAoIWluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgdmFyIHN0YWNrID0gW107XG4gICAgZG8ge1xuICAgICAgc3RhY2sucHVzaChpbnN0YW5jZSk7XG4gICAgfSB3aGlsZSAoaW5zdGFuY2UgPSBpbnN0YW5jZS5fY3VycmVudEVsZW1lbnQuX293bmVyKTtcbiAgICBzdGFjay5yZXZlcnNlKCk7XG4gICAgcmV0dXJuIHN0YWNrO1xuICB9O1xuXG4gIHZhciBkaWRXYXJuID0ge307XG5cbiAgdmFsaWRhdGVET01OZXN0aW5nID0gZnVuY3Rpb24gKGNoaWxkVGFnLCBjaGlsZFRleHQsIGNoaWxkSW5zdGFuY2UsIGFuY2VzdG9ySW5mbykge1xuICAgIGFuY2VzdG9ySW5mbyA9IGFuY2VzdG9ySW5mbyB8fCBlbXB0eUFuY2VzdG9ySW5mbztcbiAgICB2YXIgcGFyZW50SW5mbyA9IGFuY2VzdG9ySW5mby5jdXJyZW50O1xuICAgIHZhciBwYXJlbnRUYWcgPSBwYXJlbnRJbmZvICYmIHBhcmVudEluZm8udGFnO1xuXG4gICAgaWYgKGNoaWxkVGV4dCAhPSBudWxsKSB7XG4gICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhjaGlsZFRhZyA9PSBudWxsLCAndmFsaWRhdGVET01OZXN0aW5nOiB3aGVuIGNoaWxkVGV4dCBpcyBwYXNzZWQsIGNoaWxkVGFnIHNob3VsZCBiZSBudWxsJykgOiB2b2lkIDA7XG4gICAgICBjaGlsZFRhZyA9ICcjdGV4dCc7XG4gICAgfVxuXG4gICAgdmFyIGludmFsaWRQYXJlbnQgPSBpc1RhZ1ZhbGlkV2l0aFBhcmVudChjaGlsZFRhZywgcGFyZW50VGFnKSA/IG51bGwgOiBwYXJlbnRJbmZvO1xuICAgIHZhciBpbnZhbGlkQW5jZXN0b3IgPSBpbnZhbGlkUGFyZW50ID8gbnVsbCA6IGZpbmRJbnZhbGlkQW5jZXN0b3JGb3JUYWcoY2hpbGRUYWcsIGFuY2VzdG9ySW5mbyk7XG4gICAgdmFyIHByb2JsZW1hdGljID0gaW52YWxpZFBhcmVudCB8fCBpbnZhbGlkQW5jZXN0b3I7XG5cbiAgICBpZiAocHJvYmxlbWF0aWMpIHtcbiAgICAgIHZhciBhbmNlc3RvclRhZyA9IHByb2JsZW1hdGljLnRhZztcbiAgICAgIHZhciBhbmNlc3Rvckluc3RhbmNlID0gcHJvYmxlbWF0aWMuaW5zdGFuY2U7XG5cbiAgICAgIHZhciBjaGlsZE93bmVyID0gY2hpbGRJbnN0YW5jZSAmJiBjaGlsZEluc3RhbmNlLl9jdXJyZW50RWxlbWVudC5fb3duZXI7XG4gICAgICB2YXIgYW5jZXN0b3JPd25lciA9IGFuY2VzdG9ySW5zdGFuY2UgJiYgYW5jZXN0b3JJbnN0YW5jZS5fY3VycmVudEVsZW1lbnQuX293bmVyO1xuXG4gICAgICB2YXIgY2hpbGRPd25lcnMgPSBmaW5kT3duZXJTdGFjayhjaGlsZE93bmVyKTtcbiAgICAgIHZhciBhbmNlc3Rvck93bmVycyA9IGZpbmRPd25lclN0YWNrKGFuY2VzdG9yT3duZXIpO1xuXG4gICAgICB2YXIgbWluU3RhY2tMZW4gPSBNYXRoLm1pbihjaGlsZE93bmVycy5sZW5ndGgsIGFuY2VzdG9yT3duZXJzLmxlbmd0aCk7XG4gICAgICB2YXIgaTtcblxuICAgICAgdmFyIGRlZXBlc3RDb21tb24gPSAtMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBtaW5TdGFja0xlbjsgaSsrKSB7XG4gICAgICAgIGlmIChjaGlsZE93bmVyc1tpXSA9PT0gYW5jZXN0b3JPd25lcnNbaV0pIHtcbiAgICAgICAgICBkZWVwZXN0Q29tbW9uID0gaTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgVU5LTk9XTiA9ICcodW5rbm93biknO1xuICAgICAgdmFyIGNoaWxkT3duZXJOYW1lcyA9IGNoaWxkT3duZXJzLnNsaWNlKGRlZXBlc3RDb21tb24gKyAxKS5tYXAoZnVuY3Rpb24gKGluc3QpIHtcbiAgICAgICAgcmV0dXJuIGluc3QuZ2V0TmFtZSgpIHx8IFVOS05PV047XG4gICAgICB9KTtcbiAgICAgIHZhciBhbmNlc3Rvck93bmVyTmFtZXMgPSBhbmNlc3Rvck93bmVycy5zbGljZShkZWVwZXN0Q29tbW9uICsgMSkubWFwKGZ1bmN0aW9uIChpbnN0KSB7XG4gICAgICAgIHJldHVybiBpbnN0LmdldE5hbWUoKSB8fCBVTktOT1dOO1xuICAgICAgfSk7XG4gICAgICB2YXIgb3duZXJJbmZvID0gW10uY29uY2F0KFxuICAgICAgLy8gSWYgdGhlIHBhcmVudCBhbmQgY2hpbGQgaW5zdGFuY2VzIGhhdmUgYSBjb21tb24gb3duZXIgYW5jZXN0b3IsIHN0YXJ0XG4gICAgICAvLyB3aXRoIHRoYXQgLS0gb3RoZXJ3aXNlIHdlIGp1c3Qgc3RhcnQgd2l0aCB0aGUgcGFyZW50J3Mgb3duZXJzLlxuICAgICAgZGVlcGVzdENvbW1vbiAhPT0gLTEgPyBjaGlsZE93bmVyc1tkZWVwZXN0Q29tbW9uXS5nZXROYW1lKCkgfHwgVU5LTk9XTiA6IFtdLCBhbmNlc3Rvck93bmVyTmFtZXMsIGFuY2VzdG9yVGFnLFxuICAgICAgLy8gSWYgd2UncmUgd2FybmluZyBhYm91dCBhbiBpbnZhbGlkIChub24tcGFyZW50KSBhbmNlc3RyeSwgYWRkICcuLi4nXG4gICAgICBpbnZhbGlkQW5jZXN0b3IgPyBbJy4uLiddIDogW10sIGNoaWxkT3duZXJOYW1lcywgY2hpbGRUYWcpLmpvaW4oJyA+ICcpO1xuXG4gICAgICB2YXIgd2FybktleSA9ICEhaW52YWxpZFBhcmVudCArICd8JyArIGNoaWxkVGFnICsgJ3wnICsgYW5jZXN0b3JUYWcgKyAnfCcgKyBvd25lckluZm87XG4gICAgICBpZiAoZGlkV2Fyblt3YXJuS2V5XSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBkaWRXYXJuW3dhcm5LZXldID0gdHJ1ZTtcblxuICAgICAgdmFyIHRhZ0Rpc3BsYXlOYW1lID0gY2hpbGRUYWc7XG4gICAgICB2YXIgd2hpdGVzcGFjZUluZm8gPSAnJztcbiAgICAgIGlmIChjaGlsZFRhZyA9PT0gJyN0ZXh0Jykge1xuICAgICAgICBpZiAoL1xcUy8udGVzdChjaGlsZFRleHQpKSB7XG4gICAgICAgICAgdGFnRGlzcGxheU5hbWUgPSAnVGV4dCBub2Rlcyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGFnRGlzcGxheU5hbWUgPSAnV2hpdGVzcGFjZSB0ZXh0IG5vZGVzJztcbiAgICAgICAgICB3aGl0ZXNwYWNlSW5mbyA9ICcgTWFrZSBzdXJlIHlvdSBkb25cXCd0IGhhdmUgYW55IGV4dHJhIHdoaXRlc3BhY2UgYmV0d2VlbiB0YWdzIG9uICcgKyAnZWFjaCBsaW5lIG9mIHlvdXIgc291cmNlIGNvZGUuJztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFnRGlzcGxheU5hbWUgPSAnPCcgKyBjaGlsZFRhZyArICc+JztcbiAgICAgIH1cblxuICAgICAgaWYgKGludmFsaWRQYXJlbnQpIHtcbiAgICAgICAgdmFyIGluZm8gPSAnJztcbiAgICAgICAgaWYgKGFuY2VzdG9yVGFnID09PSAndGFibGUnICYmIGNoaWxkVGFnID09PSAndHInKSB7XG4gICAgICAgICAgaW5mbyArPSAnIEFkZCBhIDx0Ym9keT4gdG8geW91ciBjb2RlIHRvIG1hdGNoIHRoZSBET00gdHJlZSBnZW5lcmF0ZWQgYnkgJyArICd0aGUgYnJvd3Nlci4nO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAndmFsaWRhdGVET01OZXN0aW5nKC4uLik6ICVzIGNhbm5vdCBhcHBlYXIgYXMgYSBjaGlsZCBvZiA8JXM+LiVzICcgKyAnU2VlICVzLiVzJywgdGFnRGlzcGxheU5hbWUsIGFuY2VzdG9yVGFnLCB3aGl0ZXNwYWNlSW5mbywgb3duZXJJbmZvLCBpbmZvKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAndmFsaWRhdGVET01OZXN0aW5nKC4uLik6ICVzIGNhbm5vdCBhcHBlYXIgYXMgYSBkZXNjZW5kYW50IG9mICcgKyAnPCVzPi4gU2VlICVzLicsIHRhZ0Rpc3BsYXlOYW1lLCBhbmNlc3RvclRhZywgb3duZXJJbmZvKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFsaWRhdGVET01OZXN0aW5nLnVwZGF0ZWRBbmNlc3RvckluZm8gPSB1cGRhdGVkQW5jZXN0b3JJbmZvO1xuXG4gIC8vIEZvciB0ZXN0aW5nXG4gIHZhbGlkYXRlRE9NTmVzdGluZy5pc1RhZ1ZhbGlkSW5Db250ZXh0ID0gZnVuY3Rpb24gKHRhZywgYW5jZXN0b3JJbmZvKSB7XG4gICAgYW5jZXN0b3JJbmZvID0gYW5jZXN0b3JJbmZvIHx8IGVtcHR5QW5jZXN0b3JJbmZvO1xuICAgIHZhciBwYXJlbnRJbmZvID0gYW5jZXN0b3JJbmZvLmN1cnJlbnQ7XG4gICAgdmFyIHBhcmVudFRhZyA9IHBhcmVudEluZm8gJiYgcGFyZW50SW5mby50YWc7XG4gICAgcmV0dXJuIGlzVGFnVmFsaWRXaXRoUGFyZW50KHRhZywgcGFyZW50VGFnKSAmJiAhZmluZEludmFsaWRBbmNlc3RvckZvclRhZyh0YWcsIGFuY2VzdG9ySW5mbyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdmFsaWRhdGVET01OZXN0aW5nOyJdfQ==