'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var expect = require('chai').expect;

describe('markdown-it-wikilink', function () {

  it('should not alter links that are not empty', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[text](page)';
    target = '<p><a href="page">text</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should add alter links that are empty', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[page]()';
    target = '<p><a href="page">page</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

});
