// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic-material', 'onezone-datepicker', 'ionMdInput', 'ionic-datepicker', 'ionic-timepicker'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }


        //PUSH FUNCIONANDO

        var push = PushNotification.init({
                "android": {
                "senderID": "22934730845"
                },
                "ios": {
                "alert": "true",
                "badge": "true",
                "sound": "true"
                },
                "windows": {}
        });

        push.on('registration', function(data) {

            console.log('registradoPush');
            localStorage.setItem('pushKeyTS', data.registrationId);

        });

        push.on('notification', function(data) {

        //alert('Tienes una notificacion: '+data.title);

         console.log(data);
        });

        push.on('error', function(e) {
        console.log(e.message);

        });
        //push final 


    });
})


 .constant("serverConfig", {
        //"url": "http://localhost:80",
        "url": "http://tu-serenata.co",
        "imageStorageURL" : 'http://tu-serenata.co/images/'
        //"port": "80"
    })

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {

    // Turn off caching for demo simplicity's sake

     $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};


    $ionicConfigProvider.views.maxCache(0);
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })


    .state('app.friends', {
        url: '/friends',
        views: {
            'menuContent': {
                templateUrl: 'templates/friends.html',
                controller: 'FriendsCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })

      .state('app.notificaciones', {
        url: '/notificaciones',
        views: {
            'menuContent': {
                templateUrl: 'templates/notificaciones.html',
                controller: 'notificacionesCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })


      .state('app.contactenos', {
        url: '/contactenos',
        views: {
            'menuContent': {
                templateUrl: 'templates/contactenos.html',
                controller: 'contactenosCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })



            .state('app.laPlaya', {
        url: '/laPlaya',
        views: {
            'menuContent': {
                templateUrl: 'templates/laPlaya.html',
                controller: 'laPlayaCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })



            .state('app.inicio', {
        url: '/inicio',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio.html',
                controller: 'inicioCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {



                }
            }
        }
    })

            .state('app.interesados', {
        url: '/interesados',
        views: {
            'menuContent': {
                templateUrl: 'templates/interesados.html',
                controller: 'inicioCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })
            .state('app.serenatas', {
        url: '/serenatas',
        views: {
            'menuContent': {
                templateUrl: 'templates/serenatas.html',
                controller: 'serenatasCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })

                        .state('app.genero', {
        url: '/genero/:idCategoria/:genero',
        views: {
            'menuContent': {
                templateUrl: 'templates/genero.html',
                controller: 'generoCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {

                }
            }
        }
    })



    .state('app.gallery', {
        url: '/gallery',
        views: {
            'menuContent': {
                templateUrl: 'templates/gallery.html',
                controller: 'GalleryCtrl'
            },
            'fabContent': {
                template: '<button id="fab-gallery" class="button button-fab button-fab-top-right expanded button-energized-900 drop"><i class="icon ion-heart"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-gallery').classList.toggle('on');
                    }, 600);
                }
            }
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: ''
            }
        }
    })

    .state('app.profile', {
        url: '/profile/:idArtista',
        views: {
            'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {
                    /*$timeout(function () {
                        document.getElementById('fab-profile').classList.toggle('on');
                    }, 800);*/
                }
            }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/login');


        if(localStorage.getItem('userInfoTS') == null || 
            localStorage.getItem('userInfoTS') == 'null' || 
            localStorage.getItem('userInfoTS') == 'undefined' || 
            localStorage.getItem('userInfoTS') == undefined){

        console.log(localStorage.getItem('userInfoTS'));
        $urlRouterProvider.otherwise('/app/login');

        }
        else{
            console.log(localStorage.getItem('userInfoTS'));
        $urlRouterProvider.otherwise('/app/inicio');
        // $urlRouterProvider.otherwise("/login");
        }







});
