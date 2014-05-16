(function() {
  'use strict';
  var isOn = false;
  var timer;
  init();
  function init() {
    $('#autogrow').click(grow);
  }
  function grow() {
    isOn = !isOn;
    $('#autogrow').toggleClass('on');
    if (isOn) {
      start();
    } else {
      clearInterval(timer);
    }
  }
  function start() {
    clearInterval(timer);
    timer = setInterval(growInterval, 1000);
  }
  function growInterval() {
    $('.alive:not(.beanstalk)').map((function(x, y) {
      return $(y).attr('data-id');
    })).each((function(i, treeId) {
      var tree = $((".tree[data-id=" + treeId + "]"));
      ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
        tree.replaceWith(h);
        if ($(h).hasClass('beanstalk')) {
          audioBeanStalk.play();
        }
      }));
    }));
  }
})();

//# sourceMappingURL=autogrow.map
