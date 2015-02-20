/**
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * test of index.js
 *
 */
var should = require('should');
var fs = require('fs');
var sut = require('./index.js')();

describe('Process input file', function() {
  describe('Parse input file', function() {
    it('should read the input file and create a tree', function() {
      var tree = sut.parse(JSON.parse(fs.readFileSync('test.json')));
      tree.levelCount().should.be.exactly(16); // full taxonomy
      var subtree = tree.get('dog');
      subtree.levelCount().should.be.exactly(7); // taxonomy of dogs
      subtree = tree.get('cat').get('short hair').levelCount().should.be.exactly(3); // calico, tuxedo, and siamese
      tree.get('cat').get('short hair').get('calico').levelCount().should.be.exactly(0); // none
    });
  });
});
