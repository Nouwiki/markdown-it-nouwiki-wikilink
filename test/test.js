'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var expect = require('chai').expect;

describe('markdown-it-wikilink', function () {

  it('test 1', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[page]()';
    target = '<p><a href="page">page</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page|text]()';
    target = '<p><a href="page">text</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page a|text]()';
    target = '<p><a href="page%20a">text</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page a|text|more text]()';
    target = '<p><a href="page%20a">text|more text</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page a](), [page b]()';
    target = '<p><a href="page%20a">page a</a>, <a href="page%20b">page b</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page a|text](), [page b|text]()';
    target = '<p><a href="page%20a">text</a>, <a href="page%20b">text</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should add /wiki/ to the front of the link and .html to the back', function() {
    var md = require('markdown-it')().use(require('../'), {"head": "/wiki/", "tail": ".html"});
    var s, target;

    s = '[page]()';
    target = '<p><a href="/wiki/page.html">page</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page a](), [page b]()';
    target = '<p><a href="/wiki/page%20a.html">page a</a>, <a href="/wiki/page%20b.html">page b</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page c](), [page d]()';
    target = '<p><a href="/wiki/page%20c.html">page c</a>, <a href="/wiki/page%20d.html">page d</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('test 1', function() {
    var md = require('markdown-it')().use(require('../'));
    var s, target;

    s = '[Example: StackEdit|StackEdit]()';
    target = '<p><a href="Example:%20StackEdit">StackEdit</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[Example: Markdown Here|Markdown Here]()';
    target = '<p><a href="Example:%20Markdown%20Here">Markdown Here</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[Example: Rippledoc|Rippledoc]()';
    target = '<p><a href="Example:%20Rippledoc">Rippledoc</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[Example: The PHP League|The PHP League]()';
    target = '<p><a href="Example:%20The%20PHP%20League">The PHP League</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });



});
