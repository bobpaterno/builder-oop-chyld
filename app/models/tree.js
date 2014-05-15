'use strict';

var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var _ = require('lodash');

class Tree{
  constructor(userId){
    this.userId = userId;
    this.height = 0;
    this.isHealthy = true;
    this.isChopped = false;
  }

  save(fn){
    trees.save(this, ()=>fn());
  }

  grow(){
    this.height += _.random(0,2);
    this.isHealthy = _.random(0, 200) !== 71;
  }

  chop(user){
    user.wood += this.height / 2;
    this.height = 0;
    this.isHealthy = false;
    this.isChopped = true;
  }

  getClass(){
    var classes = [];

    if(this.height === 0){
      classes.push('seed');
    }else if(this.height < 12){
      classes.push('sapling');
    }else if(this.height < 24){
      classes.push('treenager');
    }else{
      classes.push('adult');
    }

    if(!this.isHealthy){
      classes.push('dead');
    }else{
      classes.push('alive');
    }

    if(this.isChopped){
      classes.push('stump');
    }

    return classes.join(' ');
  }

  static findByTreeId(treeId, fn){
    treeId = Mongo.ObjectID(treeId);
    trees.findOne({_id:treeId}, (e, tree)=>{
      tree = _.create(Tree.prototype, tree);
      fn(tree);
    });
  }

  static findAllByUserId(userId, fn){
    userId = Mongo.ObjectID(userId);
    trees.find({userId:userId}).toArray((e,objs)=>{
      var forest = objs.map(o=>_.create(Tree.prototype, o));
      fn(forest);
    });
  }

  static plant(userId, fn){
    userId = Mongo.ObjectID(userId);
    var tree = new Tree(userId);
    trees.save(tree, ()=>fn(tree));
  }
}

module.exports = Tree;
