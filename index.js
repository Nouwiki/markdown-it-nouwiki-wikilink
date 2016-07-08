'use strict';

module.exports = function wikilink_plugin(md, options) {
  var originalRule = md.renderer.rules.link_open;

  var head = "";
  var tail = "";
  if (options != undefined) {
    head = options.head;
    tail = options.tail;
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');
    var href = tokens[idx].attrs[hrefIndex][1];

    if (hrefIndex >= 0 && href == "") { // if markdown link doesn't contain a url use the text as url (wikilink)
      var str = tokens[idx+1].content.split("|");
      var title = str[0];
      tokens[idx].attrs[hrefIndex][1] = head+encodeURI(title)+tail;
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
