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




            }])
        .controller('AppController', AppController)
        .service('AppService', AppService);

    AppController.$inject = ['$location', '$timeout', '$document'];
    function AppController($location, $timeout, $document ) {

        var vm = this;
        vm.menu_mobile_open = false;
        vm.goToAnchor = goToAnchor;




        function goToAnchor(id) {
            $location.path('/main');

            $timeout(function(){
                var duration = 1000;
                var offset = 50; //pixels; adjust for floating menu, context etc
                //Scroll to #some-id with 30 px "padding"
                //Note: Use this in a directive, not with document.getElementById
                var someElement = angular.element(document.getElementById(id));
                $document.scrollToElement(someElement, offset, duration);
            },10);


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


