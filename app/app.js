(function () {
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('gk', ['oc.lazyLoad',
        'ngRoute',
        'ngAnimate',
        'duScroll',
        'acUtils'
    ]).config(['$routeProvider',
            function ($routeProvider) {

                $routeProvider.otherwise('/main');


                $routeProvider.when('/main', {
                    templateUrl: 'main/main.html',
                    controller: 'MainController',
                    data: {requiresLogin: false},
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            // you can lazy load files for an existing module
                            return $ocLazyLoad.load('main/main.js');
                        }]
                    }
                });
                $routeProvider.when('/productos', {
                    templateUrl: 'productos/productos.html',
                    controller: 'ProductosController',
                    data: {requiresLogin: false},
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                            // you can lazy load files for an existing module
                            return $ocLazyLoad.load('productos/productos.js');
                        }]
                    }
                });


            }])
        .controller('AppController', AppController)
        .service('AppService', AppService)
        .run(function ($rootScope) {
            $rootScope.$on('$routeChangeStart', function (e, to) {


                //(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                //        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                //    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                //})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
                //
                //ga('create', 'UA-56571440-2', 'auto');
                //ga('send', 'pageview', to);
            })
        });

    AppController.$inject = ['$location', '$timeout', '$document'];
    function AppController($location, $timeout, $document) {

        var vm = this;
        vm.menu_mobile_open = false;
        vm.goToAnchor = goToAnchor;
        vm.goToProductos = goToProductos;

        function goToProductos(){

            $location.path('/productos');
            goToAnchor('productos');
        }


        function goToAnchor(id) {
            $location.path('/main');

            $timeout(function () {
                var duration = 1000;
                var offset = 50; //pixels; adjust for floating menu, context etc
                //Scroll to #some-id with 30 px "padding"
                //Note: Use this in a directive, not with document.getElementById
                var someElement = angular.element(document.getElementById(id));
                $document.scrollToElement(someElement, offset, duration);
            }, 10);


        }

    }

    AppService.$inject = ['$rootScope'];
    function AppService($rootScope) {
        this.listen = function (callback) {
            $rootScope.$on('gkradio', callback);
        };

        this.broadcast = function () {
            $rootScope.$broadcast('gkradio');
        }
    }
})();


WebFontConfig = {
    google: {families: ['Futura:400,700:latin']}
};
(function () {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
})();