(function () {
  'use strict';
  var scripts = document.getElementsByTagName("script");
  var currentScriptPath = scripts[scripts.length - 1].src;
  angular.module('gk.main', ['ngRoute'])
      .controller('MainController', MainController);


  MainController.$inject = [];
  function MainController() {

    var vm = this;



  }
})();