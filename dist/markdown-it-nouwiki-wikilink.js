/*! markdown-it-nouwiki-wikilink 0.1.0 https://github.com//01AutoMonkey/markdown-it-nouwiki-wikilink @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitNouwikiWikiLink = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function wikilink_plugin(md, opt) {
  var originalRule = md.renderer.rules.link_open;

  var head = "";
  var tail = "";
  var atHead = "";
  var atTail = "";
  if (opt) {
    head = opt.head || head;
    tail = opt.tail || tail;
    atHead = opt.atHead || atHead;
    atTail = opt.atTail || atTail;
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');
    var href = tokens[idx].attrs[hrefIndex][1];

    if (hrefIndex >= 0 && href == "") { // if markdown link doesn't contain a url use the text as url (wikilink)
      var str = tokens[idx+1].content.split("|");
      var title = str[0];

      // @links
      var actualHead = head;
      //var actualTail = tail;
      var wiki = "";
      if (title.indexOf("@") > -1) {
        var split = title.split("@");
        title = split[0];
        wiki = split[1];
        if (title == "index" || title == "") {
          title = "";
          atTail = "/";
        }
        wiki = atHead+wiki+atTail;
        actualHead = wiki;
      } else {
        if (title == "index" || title == "") {
          title = "";
          head = "";
          actualHead = head;
        }
      }

      tokens[idx].attrs[hrefIndex][1] = actualHead+encodeURI(title)+tail;
      if (str.length > 1) {
        str.splice(0, 1);
        tokens[idx+1].content = str.join("|");
      }
    }

    if (originalRule) {
     return originalRule.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  }
}

},{}]},{},[1])(1)
});