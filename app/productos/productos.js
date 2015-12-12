(function () {
    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('app.productos', ['ngRoute'])
        .controller('ProductosController', ProductosController);


    ProductosController.$inject = [];
    function ProductosController() {

        var vm = this;

    }
})();