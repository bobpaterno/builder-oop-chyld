(function() {
  'use strict';
  $(document).ready(init);
  function init() {
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell-wood', sellWood);
  }
  function sellWood() {
    var userId = $('#user').attr('data-id');
    var amount = $('#wood-amt').val();
    ajax(("/users/" + userId + "/sellwood"), 'put', {amount: amount}, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function chop() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');
    ajax(("/trees/" + treeId + "/chop/" + userId), 'put', null, (function(h) {
      tree.replaceWith(h);
      dashboard();
    }));
  }
  function dashboard() {
    var userId = $('#user').attr('data-id');
    ajax(("/users/" + userId), 'get', null, (function(h) {
      $('#dashboard').empty().append(h);
    }));
  }
  function grow() {
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(("/trees/" + treeId + "/grow"), 'put', null, (function(h) {
      tree.replaceWith(h);
    }));
  }
  function forest() {
    var userId = $('#user').attr('data-id');
    ajax(("/trees?userId=" + userId), 'get', null, (function(h) {
      $('#forest').empty().append(h);
    }));
  }
  function plant() {
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId: userId}, (function(h) {
      $('#forest').append(h);
    }));
  }
  function login() {
    var username = $('#username').val();
    ajax('/login', 'post', {username: username}, (function(h) {
      $('#username').val('');
      $('#dashboard').empty().append(h);
    }));
  }
  function ajax(url, type) {
    var data = arguments[2] !== (void 0) ? arguments[2] : {};
    var success = arguments[3] !== (void 0) ? arguments[3] : (function(r) {
      return console.log(r);
    });
    var dataType = arguments[4] !== (void 0) ? arguments[4] : 'html';
    $.ajax({
      url: url,
      type: type,
      dataType: dataType,
      data: data,
      success: success
    });
  }
})();

//# sourceMappingURL=game.map
