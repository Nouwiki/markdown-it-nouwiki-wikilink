/*! markdown-it-nouwiki-wikilink 0.1.0 https://github.com//01AutoMonkey/markdown-it-nouwiki-wikilink @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitNouwikiWikiLink = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/*jshint node:true*/

module.exports = function wikilink_plugin(md, scheme) {
  var oldLinkOpenOverride = md.renderer.rules.link_open;

  var head = "";
  var tail = "";
  if (scheme != undefined) {
    head = scheme.head;
    tail = scheme.tail;
  }

  //scheme = scheme || 'http://'; // what is this doing here?

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');
    var href = tokens[idx].attrs[hrefIndex][1];

    if (hrefIndex >= 0 && href == "") { // if markdown link doesn't contain a url use the text as url (wikilink)
      tokens[idx].attrs[hrefIndex][1] = head+encodeURI(tokens[idx+1].content)+tail;
    // else if it does contain data but the link is not a url, an absolute path, or a relative path
    } else if (hrefIndex >= 0) {
      if (href.indexOf("/") != 0) { // not absolute
        if (href.indexOf("./") != 0 && href.indexOf("../") != 0) { // not relative
          if (href.indexOf("/") == -1 || !(href.indexOf("/") == href.indexOf("//"))) { // not a url
            tokens[idx].attrs[hrefIndex][1] = head+href+tail;
          }
        }
      }
    }

    if (oldLinkOpenOverride) {
     return oldLinkOpenOverride.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  }
}

},{}]},{},[1])(1)
});