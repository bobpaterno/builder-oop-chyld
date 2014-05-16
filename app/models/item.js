'use strict';


class Item {
  constructor(type) {
    this.type = type;

    switch(type) {
      case 'autogrow':
        this.cost = 50000;
        this.image= '/img/ag1.gif';
        break;
    }
  }

}

module.exports = Item;
