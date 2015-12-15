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
                            return $ocLazyLoad.load('main/main.min.js');
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
                            return $ocLazyLoad.load('productos/productos.min.js');
                        }]
                    }
                });


            }])
        .controller('AppController', AppController)
        .service('AppService', AppService)
        .directive('navContacto', NavContacto)
        .run(function ($rootScope) {
            $rootScope.$on('$routeChangeStart', function (e, to) {
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

                ga('create', 'UA-56571440-3', 'auto');
                ga('send', 'pageview', to);
            })
        });

    AppController.$inject = ['$location', '$timeout', '$document', '$window', '$scope', '$http'];
    function AppController($location, $timeout, $document, $window, $scope, $http) {

        var vm = this;
        vm.menu_mobile_open = false;
        vm.goToAnchor = goToAnchor;
        vm.goToProductos = goToProductos;
        vm.sendMail = sendMail;
        vm.scroll = 0;

        vm.email = '';
        vm.nombre = '';
        vm.mensaje = '';
        vm.asunto = '';
        vm.enviado = false;


        function goToProductos() {

            $location.path('/productos');
            $timeout(function () {
                var duration = 1000;
                var offset = 50; //pixels; adjust for floating menu, context etc
                //Scroll to #some-id with 30 px "padding"
                //Note: Use this in a directive, not with document.getElementById
                var someElement = angular.element(document.getElementById('productos'));
                $document.scrollToElement(someElement, offset, duration);
            }, 20);
        }


        angular.element($window).bind("scroll", function () {
            vm.scroll = window.pageYOffset;
            $scope.$apply();
        });

        function goToAnchor(id) {
            $location.path('/main');

            $timeout(function () {
                var duration = 1000;
                var offset = 50; //pixels; adjust for floating menu, context etc
                //Scroll to #some-id with 30 px "padding"
                //Note: Use this in a directive, not with document.getElementById
                var someElement = angular.element(document.getElementById(id));
                $document.scrollToElement(someElement, offset, duration);
            }, 20);


        }

        function sendMail() {


            return $http.post('contact.php',
                {'email': vm.email, 'nombre': vm.nombre, 'mensaje': vm.mensaje, 'asunto': vm.asunto})
                .success(
                    function (data) {
                        console.log(data);
                        vm.enviado = true;
                        $timeout(hideMessage, 3000);
                        function hideMessage() {
                            vm.enviado = false;
                        }

                        vm.email = '';
                        vm.nombre = '';
                        vm.mensaje = '';
                        vm.asunto = '';

                        //goog_report_conversion('http://www.ac-desarrollos.com/#');
                    })
                .error(function (data) {
                    console.log(data);
                });
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

    NavContacto.$inject = ['$timeout', '$document'];
    function NavContacto($timeout, $document) {
        return {
            restrict: 'AE',
            scope: {},
            controller: function ($scope, $element, $attrs) {

                $element.bind('click', function () {

                    $timeout(function () {
                        var duration = 1000;
                        var offset = 50; //pixels; adjust for floating menu, context etc
                        //Scroll to #some-id with 30 px "padding"
                        //Note: Use this in a directive, not with document.getElementById
                        var someElement = angular.element(document.getElementById('contacto-container'));
                        $document.scrollToElement(someElement, offset, duration);
                    }, 20);
                });


            },
            link: function (scope, element, attr) {


            },
            controllerAs: 'acSearchCtrl'
        };
    }


})();


WebFontConfig = {
    google: {families: ['PT+Sans:400,700:latin']}
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