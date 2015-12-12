(function () {
  'use strict';
  var scripts = document.getElementsByTagName("script");
  var currentScriptPath = scripts[scripts.length - 1].src;
  angular.module('gk.main', ['ngRoute'])
      .controller('MainController', MainController);


  MainController.$inject = ['$location'];
  function MainController($location) {

    var vm = this;




  }
})();