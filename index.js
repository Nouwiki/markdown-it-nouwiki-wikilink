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
