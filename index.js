/**
 *
 * Copyright 2015 Randal L Kamradt Sr.
 *
 * returns a tree object that describes a taxonomy loaded from
 * a json file with a single array of strings where the
 * data is type>subtype>subsubtype, etc
 *
 * @return Tree tree that defines a taxonomy
 */
module.exports = function() {
  var ret = {
    'root': {},
    'parse': function(data) {
      for(var i = 0; i < data.data.length; i++) {
        var hierarchy = data.data[i].split('>');
        var n = this.root;
        for(var j = 0; j < hierarchy.length; j++) {
          var member = hierarchy[j];
          if(n.get(member)) {
            n = n.get(member);
          } else {
            n.add(member, this);
            n = n.get(member);
          }
        }
      }
      return this.root;
    },
    'newNode': function() {
      return {
        'count': 0,
        'data': {},
        'get': function(member) {
          return this.data[member];
        },
        'add': function(member, tree) {
          this.count++;
          this.data[member] = tree.newNode();
        },
        'levelCount': function() {
          var ret = this.count;
          for(var sdata in this.data) {
            ret += this.data[sdata].levelCount();
          }
          return ret;
        }
      };
    }
  };
  ret.root = ret.newNode();
  return ret;
};
