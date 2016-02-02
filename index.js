'use strict';
/*jshint node:true*/

module.exports = function wikilink_plugin(md, scheme) {
  var oldLinkOpenOverride = md.renderer.rules.link_open;
  
  var head = "";
  var tail = "";
  if (scheme != undefined) {
    head = scheme.head || head;
    tail = scheme.tail || tail;
  }

  scheme = scheme || 'http://';

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');

    if (hrefIndex >= 0 && tokens[idx].attrs[hrefIndex][1] == "") { // if markdown link doesn't contain a url use the text as url (wikilink)
      tokens[idx].attrs[hrefIndex][1] = head+encodeURI(tokens[idx+1].content)+tail;
    }

    if (oldLinkOpenOverride) {
     return oldLinkOpenOverride.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  };
};
