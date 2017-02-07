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
