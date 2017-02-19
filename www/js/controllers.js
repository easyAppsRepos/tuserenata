/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);
})


.controller('inicioCtrl', function($scope, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    


})
.controller('notificacionesCtrl', function($scope, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();




})
.controller('FriendsCtrl', function($scope, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
$scope.disableSwipe = function() {
   $ionicSlideBoxDelegate.enableSlide(false);
};

//borrarlater


$scope.reservasActivas = [{apellido:"Toro",
codigo:1486928895,
created_at:"-0001-11-30 00:00:00",
deleted_at:null,
email:"correop@yahoo.es",
estado:1,
fecha_reserva:"2017-02-19",
hora_reserva:"13:00:00",
id:910,
nombre:"Pedro Pablo ",
notas:"Celebramos el cumpleaños del avi (95 años). ¿Proporcionáis tarta y velas?",
numero_personas:8,
telefono:"678569959",
updated_at:"-0001-11-30 00:00:00",
zona:"Medellin"},

{apellido:"Toro",
codigo:1486928895,
created_at:"-0001-11-30 00:00:00",
deleted_at:null,
email:"correop@yahoo.es",
estado:1,
fecha_reserva:"2017-02-19",
hora_reserva:"13:00:00",
id:910,
nombre:"Maria Perez ",
notas:"Celebramos el cumpleaños del avi (95 años). ¿Proporcionáis tarta y velas?",
numero_personas:8,
telefono:"678569959",
updated_at:"-0001-11-30 00:00:00",
zona:"Medellin"},

{apellido:"Toro",
codigo:1486928895,
created_at:"-0001-11-30 00:00:00",
deleted_at:null,
email:"correop@yahoo.es",
estado:1,
fecha_reserva:"2017-02-19",
hora_reserva:"13:00:00",
id:910,
nombre:"Juan Romero ",
notas:"Celebramos el cumpleaños del avi (95 años). ¿Proporcionáis tarta y velas?",
numero_personas:8,
telefono:"678569959",
updated_at:"-0001-11-30 00:00:00",
zona:"Medellin"}]
//endsborrarlater

$scope.evento={};
$scope.tipoReservas = 'semana';


         $scope.cont_dia= new Array(7);
  $scope.cont_dia[0]= 0;
  $scope.cont_dia[1]= 0;
  $scope.cont_dia[2]= 0;
  $scope.cont_dia[3]= 0;
  $scope.cont_dia[4]= 0;
  $scope.cont_dia[5]= 0;
  $scope.cont_dia[6]= 0;
  $scope.fecha= new Date();
  $scope.fecha_m= new Date();


   $scope.onezoneDatepicker = {
    date: $scope.fecha, // MANDATORY                     
    mondayFirst: true,                
    months: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],                    
    daysOfTheWeek: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],     
    startDate: new Date(2012, 1, 26),             
    endDate: new Date(2024, 1, 26),                    
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
    showDatepicker: true,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: true,
    hideSetButton: false,
    highlights: [],
    callback: function(value){
    $scope.change_view(value,true);
    }
};


  $scope.Dia_icon= function(){

    var i = $scope.diaActual;
    if (i==0){
      return "img/Dias/Domingo.png"
    }else if (i==1){
      return "img/Dias/Lunes.png"
    }else if (i==2){
      return "img/Dias/Martes.png"
    }else if (i==3){
      return "img/Dias/Miercoles.png"
    }else if (i==4){
      return "img/Dias/Jueves.png"
    }else if (i==5){
      return "img/Dias/Viernes.png"
    }else if (i==6){
      return "img/Dias/Sabado.png"
    }
  }


  
  $scope.obt_fecha_dia = function(i) {
    var day_r= $scope.fecha.getDay();
    var date= new Date();
    date.setDate($scope.fecha.getDate()+(i-day_r));
    $scope.fecha_m=date;
    $scope.diaActual=i;
  }


  $scope.nextSlide = function() {
  console.log('next')
    if ($scope.fecha_m == new Date()){
      $scope.tipo_d="Hoy";
    }
    $scope.noexiste($scope.fecha_m);
     $rootScope.back_button_show=true;
    $ionicSlideBoxDelegate.next();
  }
  
  $scope.movetoSlide = function(i) {
//ret res
 console.log("zzzz");
    if(i==0){
      $rootScope.back_button_show=false;
    }
    $ionicSlideBoxDelegate.slide(i);
  }
  
  
  $scope.slideHasChanged = function(index) {
 

    if (index==0){
      $rootScope.back_button_show=false;
    }else{
      $rootScope.back_button_show=true;
    }
    if(index==1){
      $scope.noexiste($scope.fecha_m);
    }
    $ionicScrollDelegate.scrollTop();
    
  }

    $scope.change_view = function(fecha, s) {

    if(!s){
      $scope.fecha_m=(new Date(fecha+"T12:00:00"));
    }else{
      $scope.fecha_m=fecha;
    }
    $scope.noexiste($scope.fecha_m);

    $scope.nextSlide(); 
    $scope.back_button_show=true
  }

    $scope.noexiste = function(fecha) {
    
    $scope.nothing=true;
    for(var i=0; i<$scope.onezoneDatepicker.highlights.length;i++){
      if ($scope.onezoneDatepicker.highlights[i].date.toDateString() == fecha.toDateString()){
        $scope.nothing=false;
        return;
      }
    } 
  }




$scope.agregarEvento  = function(){

    console.log('sada');
}




    //calendario

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
        $scope.evento.fecha= new Date(val);
      },
      disabledDates: [            //Optional
        new Date(2016, 2, 16),
        new Date(2015, 3, 16),
        new Date(2015, 4, 16),
        new Date(2015, 5, 16),
        new Date('Wednesday, August 12, 2015'),
        new Date("08-16-2016"),
        new Date(1439676000000)
      ],
      from: new Date(2017, 1, 1), //Optional
      to: new Date(2017, 11, 31), //Optional
      inputDate: new Date(),      //Optional
      mondayFirst: true,          //Optional
      //disableWeekdays: [0],       //Optional
      closeOnSelect: false,       //Optional
      templateType: 'popup'       //Optional
    };

    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
 

    //calendario end/


    //hora

  var ipTObj1 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
       $scope.evento.hora=(selectedTime.getUTCHours()+ 'H :'+ selectedTime.getUTCMinutes()+ 'M');
      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Ok'    //Optional
  };

    $scope.openTimePicker = function(){
      ionicTimePicker.openTimePicker(ipTObj1);
    };
 

  


    //horaend



            //modal


 
   $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function(animation) {
    $ionicModal.fromTemplateUrl('nuevoEvento.html', {
      scope: $scope,
      animation: animation
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

    //end modal


})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, $ionicSideMenuDelegate, ionicMaterialInk) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
$ionicSideMenuDelegate.canDragContent(false);
    // Set Motion
    $timeout(function() {
        ionicMaterialMotion.slideUp({
            selector: '.slide-up'
        });
    }, 300);

    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

$scope.tipoTab='info';
    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
