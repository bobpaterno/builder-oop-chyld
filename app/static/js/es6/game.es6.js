/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#login').click(login);
    $('#dashboard').on('click', '#plant', plant);
    $('#dashboard').on('click', '#getforest', forest);
    $('#forest').on('click', '.grow', grow);
    $('#forest').on('click', '.chop', chop);
    $('#dashboard').on('click', '#sell-wood', sellWood);
  }

  function sellWood(){
    var userId = $('#user').attr('data-id');
    var amount = $('#wood-amt').val();
    ajax(`/users/${userId}/sellwood`, 'put', {amount:amount}, h=>{
      $('#dashboard').empty().append(h);
    });
  }

  function chop(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    var userId = $('#user').attr('data-id');
    ajax(`/trees/${treeId}/chop/${userId}`, 'put', null, h=>{
      tree.replaceWith(h);
      dashboard();
    });
  }

  function dashboard(){
    var userId = $('#user').attr('data-id');
    ajax(`/users/${userId}`, 'get', null, h=>{
      $('#dashboard').empty().append(h);
    });
  }

  function grow(){
    var tree = $(this).closest('.tree');
    var treeId = tree.attr('data-id');
    ajax(`/trees/${treeId}/grow`, 'put', null, h=>{
      tree.replaceWith(h);
    });
  }

  function forest(){
    var userId = $('#user').attr('data-id');
    ajax(`/trees?userId=${userId}`, 'get', null, h=>{
      $('#forest').empty().append(h);
    });
  }

  function plant(){
    var userId = $('#user').attr('data-id');
    ajax('/trees/plant', 'post', {userId:userId}, h=>{
      $('#forest').append(h);
    });
  }

  function login(){
    var username = $('#username').val();
    ajax('/login', 'post', {username:username}, h=>{
      $('#username').val('');
      $('#dashboard').empty().append(h);
    });
  }

  function ajax(url, type, data={}, success=r=>console.log(r), dataType='html'){
    $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
  }
})();
