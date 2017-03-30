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


.controller('logoutCtrl', function($scope, $timeout, $rootScope, $state, $ionicLoading, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate) {


    $scope.perfilArtista = false;
    $scope.cerrarSesion = function(){

        $ionicLoading.show();

        window.localStorage.setItem( 'userInfoTS', null);
        window.localStorage.setItem( 'estadoAppTS', null);
        window.localStorage.setItem( 'idPublicacionAppTS', null);

        console.log(JSON.parse(window.localStorage.getItem('userInfoTS')));
$ionicLoading.hide();
        $state.go('app.login');
        
    }
if($state.current.name !== 'app.login'){
            var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
            if(userData.tipoUsuario == 2) {$scope.perfilArtista = true} 
}

 
      $scope.$on('menuLateral', function(event, args) {

      if($state.current.name !== 'app.login'){

            var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
            if(userData.tipoUsuario == 2) {$scope.perfilArtista = true} 
      }
          // do what you want to do
      });



})


.controller('LoginCtrl', function($scope, $rootScope, $timeout, api, $state, $stateParams, $ionicModal, ionicMaterialInk, $ionicPopup, $ionicLoading, $ionicSideMenuDelegate) {
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
    $ionicSideMenuDelegate.canDragContent(false);

/* $scope.$on('$ionicView.beforeEnter', function() {
           //do stuff before enter


        });*/


   


$scope.user={};
$scope.registro={};



  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}

$scope.pushK=function(userID){

//pusjj
        if(localStorage.getItem('pushKeyTS')){
          console.log('en pushK');

        var pushKey=  localStorage.getItem('pushKeyTS');
        var device= ionic.Platform.platform();
        var uuid=ionic.Platform.device().uuid;
        var logIn = Date.now();


        var pushState = { 
        userId:userID,
        pushK:pushKey, 
        device:device,
        deviceId:uuid,
        login: logIn
        }

        console.log(pushState);

     api.addPush(pushState).then(function(data){
      console.log(data);

      if(!data.error){ 
        localStorage.setItem('TSidPush', data.id);
      }
      else{console.log('Ha ocurrido un error en el proceso de PUSHK')}  
        
      

     });


        }else{console.log("nopushKey");}
//endPush

}

    $scope.loginUser=function(){



      if($scope.user.nombre == 'undefine' || $scope.user.nombre == null || $scope.user.nombre == '' ||
        $scope.user.pass == 'undefine' || $scope.user.pass == null || $scope.user.pass == '' ){


        mensajeAlerta('Credenciales incompletas');
      }

    else{

         $ionicLoading.show();
        api.loginUser($scope.user.nombre, $scope.user.pass).then(function(data) {

            $ionicLoading.hide();

            if(data.loginExito){

              $scope.pushK(data.idUsuario);
              console.log(data);
              window.localStorage.setItem( 'userInfoTS', JSON.stringify(data));


              $state.go('app.inicio');
            }
            else{
              mensajeAlerta('Credenciales invalidas');
            }
       

        });

    }

    }

$scope.recuperar = function(email){
$ionicLoading.show();
  console.log(email);

          api.recuperarContra(email).then(function(data) {

            $ionicLoading.hide();

            if(data.recuperacionOK){
              //console.log(data);
              //window.localStorage.setItem( 'userInfoTS', JSON.stringify(data));

              $scope.pop.close();
              mensajeAlerta('Se ha enviado la contraseña a tu correo, verifica en breve. Recuerda buscar en la carpeta de "no deseados" si no está en tu bandeja');

            }
            else{

              $scope.pop.close();
              mensajeAlerta('Email invalido');
            }
       

        });


}


    $scope.olvide = function(){

                      var mensaje = 'Correo Electronico'
                   var customTemplate =
          '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/email.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> <input type="text" ng-model="olvideEmail" > <button ng-click="recuperar(olvideEmail)" class="btnRecuperar button" style="    width: 100%;background-color: #e6b400;margin-top: 20px;height: 40px;font-family: Ubuntu;color: #444;border: none;border-radius: 2px;">Recuperar</button></div>';

        $scope.pop = $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          scope: $scope,
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustoms',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });
    }

      $scope.registroUsuario = function(){


            if($scope.registro.nombre == 'undefine' || $scope.registro.nombre == null || $scope.registro.nombre == '' ||
          $scope.registro.email == 'undefine' || $scope.registro.email == null || $scope.registro.email == '' || 
           $scope.registro.contra == 'undefine' || $scope.registro.contra == null || $scope.registro.contra == '' || 
            $scope.registro.contra2 == 'undefine' || $scope.registro.contra2 == null || $scope.registro.contra2 == ''){


          mensajeAlerta('Todos los campos son requeridos');
        }

      else{

        if($scope.registro.contra !== $scope.registro.contra2){
            mensajeAlerta('Las contraseñas no coinciden');
        }
        else{
          console.log( $scope.registro);
          $ionicLoading.show();
          api.registrarUsuario($scope.registro).then(function(data) {
            console.log(data);

          $ionicLoading.hide();
          if(!data.error){        
                $scope.closeModal();
                var mensaje = 'Registro Exitoso! Ya puedes inicar sesion'
                   var customTemplate =
          '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

        $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustom',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });
           }
              else{
                mensajeAlerta('Ha ocurrido un error');
              }
          });
      }
}
     

    }



    //modal
 $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('registroUsuario.html', {
    //  $ionicModal.fromTemplateUrl('buscando.html', {
      scope: $scope,
      animation: 'slide-in-up'
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

.controller('interesadosCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate) {


  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion


    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('contactenosCtrl', function($scope, $timeout, $stateParams, api, $ionicPopup, $ionicLoading, $ionicModal, ionicMaterialInk, $ionicSideMenuDelegate) {


  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion


    // Set Ink
    ionicMaterialInk.displayEffect();

  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}


    $scope.registroArtista = {};

    $scope.registrarArtista = function(){


            if($scope.registroArtista.nombre == 'undefine' || $scope.registroArtista.nombre == null || $scope.registroArtista.nombre == '' ||
          $scope.registroArtista.tipoDocumento == 'undefine' || $scope.registroArtista.tipoDocumento == null || $scope.registroArtista.tipoDocumento == '' || 
           $scope.registroArtista.numDocumento == 'undefine' || $scope.registroArtista.numDocumento == null || $scope.registroArtista.numDocumento == '' || 
            $scope.registroArtista.telefono == 'undefine' || $scope.registroArtista.telefono == null || $scope.registroArtista.telefono == '' || 
             $scope.registroArtista.ciudad == 'undefine' || $scope.registroArtista.ciudad == null || $scope.registroArtista.ciudad == '' ||
              $scope.registroArtista.genero == 'undefine' || $scope.registroArtista.genero == null || $scope.registroArtista.genero == ''){


          mensajeAlerta('Todos los campos son requeridos');
        }

      else{

       // $scope.reserva.genero = 1;

    
          var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
          var idUsuario = userData.idUsuario;   
 $scope.registroArtista.idUsuario = idUsuario;

   console.log( $scope.registroArtista);

          $ionicLoading.show();
          api.registrarArtista($scope.registroArtista).then(function(data) {
          console.log(data);

              $ionicLoading.hide();

              if(!data.error){
               

              //  window.localStorage.setItem( 'estadoAppTS', 2);
              //  window.localStorage.setItem( 'idPublicacionAppTS', data.idPublicacion);

               // verificarEstado();
                
                $scope.closeModal();
                var mensaje = 'Registro Exitoso! Pronto nos comunicaremos contigo para confirmar tu perfil de Artista'
                   var customTemplate =
          '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

        $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustom',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });




              }
              else{
                mensajeAlerta('Ha ocurrido un error');
              }
          });
      }

     

    }

    //modal
 $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('formularioArtista.html', {
    //  $ionicModal.fromTemplateUrl('buscando.html', {
      scope: $scope,
      animation: 'slide-in-up'
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

.controller('serenatasCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate) {


  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion


    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('generoCtrl', function($scope, $timeout, $state, $stateParams, api, $ionicPopup, $ionicLoading, ionicMaterialInk, $ionicSideMenuDelegate) {


  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    // Set Motion


    // Set Ink
    ionicMaterialInk.displayEffect();
  $ionicLoading.show();

$scope.getTitulo = function(){

  return $stateParams.genero;
}
     function getItemsCategoria(){

        $scope.idCategoria = $stateParams.idCategoria;
       
        api.getItemsCategoria($scope.idCategoria).then(function(data) {
      //$ionicLoading.hide();
      
      if(!data.error){

      $ionicLoading.hide();
     console.log(data);
     $scope.items = data.artistas;
   //  $scope.comentarios = data.comentarios;
      }
      else{
        $ionicLoading.hide();
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }


      });


 }
getItemsCategoria();


  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}


  $scope.abrirDetalleArtista = function(idArtista){

    console.log(idArtista);
$state.go('app.profile', { idArtista:idArtista });


  }




})



.controller('inicioCtrl', function($scope, $ionicLoading, $ionicPopup, $rootScope, api, $stateParams, $state, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

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

   // $scope.$on('$ionicView.enter', function() {
   $rootScope.$broadcast('menuLateral');
//});



$scope.reserva={};
$scope.enBusqueda=false;


  $scope.abrirDetalleArtista = function(idArtista){

    console.log(idArtista);
$state.go('app.profile', { idArtista:idArtista });


  }
   function verificarInteresados(){


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;

        var idPublicacion = JSON.parse(window.localStorage.getItem('idPublicacionAppTS'));
       // var idUser = userData.idUsuario;
console.log(idPublicacion);

        

      api.verificarInteresados(idPublicacion).then(function(data) {
      //$ionicLoading.hide();
      
      if(!data.error){

     console.log(data);
     $scope.arrayInteresados = data.interesados;
    //ath.round(parseFloat(data.interesados.calificacion));
     $scope.interesados= data.interesados.length;
      
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

   }

  function verificarEstado(){

      var estado = JSON.parse(window.localStorage.getItem('estadoAppTS'));
      if(estado==2){
        console.log('eestado 2');
        $scope.enBusqueda = true;
        verificarInteresados();

      }
      else{
        console.log('eestado 1');
        $scope.enBusqueda = false;}


  }
    
    verificarEstado();
  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}



$scope.artistasInteresados=function(){

  console.log($scope.arrayInteresados);
  $state.go('app.interesados');
}


$scope.cargando=function(){
  $state.go('app.serenatas');
}



$scope.cancelarBusqueda=function(){
  
  window.localStorage.setItem( 'estadoAppTS', 1);
verificarEstado();



}


  $scope.buscarGrupo=function(){

  //$scope.enBusqueda = true;
  //$scope.closeModal();
      

        if($scope.reserva.nombre == 'undefine' || $scope.reserva.nombre == null || $scope.reserva.nombre == '' ||
          $scope.reserva.ciudad == 'undefine' || $scope.reserva.ciudad == null || $scope.reserva.ciudad == '' || 
           $scope.reserva.direccion == 'undefine' || $scope.reserva.direccion == null || $scope.reserva.direccion == '' || 
            $scope.reserva.telefono == 'undefine' || $scope.reserva.telefono == null || $scope.reserva.telefono == '' || 
             $scope.reserva.motivo == 'undefine' || $scope.reserva.motivo == null || $scope.reserva.motivo == '' 
           //  || $scope.reserva.genero == 'undefine' || $scope.reserva.genero == null || $scope.reserva.genero == ''   
              ){


          mensajeAlerta('Todos los campos son requeridos');
        }

      else{

        $scope.reserva.genero = 1;

          var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
          $scope.reserva.idUsuario = userData.idUsuario;

          $ionicLoading.show();
          api.addLaPlaya($scope.reserva).then(function(data) {
 console.log(data);
              $ionicLoading.hide();
              if(!data.error){
               

                window.localStorage.setItem( 'estadoAppTS', 2);
                window.localStorage.setItem( 'idPublicacionAppTS', data.idPublicacion);

                verificarEstado();
                
                $scope.closeModal();
                var mensaje = 'Reserva exitosa! Dale al boton de Artistas Interesados para ponerte en contacto con los interesados'
                   var customTemplate =
          '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

        $ionicPopup.show({
          template: customTemplate,
          title: '',
          subTitle: '',
          buttons: [{
            text: 'Cerrar',
            type: 'button-blueCustom',
            onTap: function(e) {

             // if(borrar){ $scope.user.pin='';}
             
            }
          }]
        });




              }
              else{
                mensajeAlerta('Ha ocurrido un error');
              }
          });
      }
    }



    //modal
 $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('reservaYa.html', {
    //  $ionicModal.fromTemplateUrl('buscando.html', {
      scope: $scope,
      animation: 'slide-in-up'
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

.controller('laPlayaCtrl', function($scope, $rootScope, $ionicPopup, $ionicLoading, api, $state, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {
$scope.publicaciones=[];
$scope.infoModal={};
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


  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}

    function getPublicaciones(){


      $ionicLoading.show();


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;

      api.getPublicaciones(idUser).then(function(data) {
      $ionicLoading.hide();
      
      if(!data.error){
     console.log(data.publicaciones);
      $scope.publicaciones = data.publicaciones;

    
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

    }

    getPublicaciones();

    $scope.getCat=function(categoria){

      if(categoria==1){return 'Mariachis' }
        if(categoria==2){return 'Boleros' }
          if(categoria==3){return 'Norteñas' }
            if(categoria==4){return 'Tunas' }
              if(categoria==5){return 'Parranda Vallenato' }
                if(categoria==6){return 'Llanera' }
                  if(categoria==7){return 'Bandas de Rock' }
                    if(categoria==8){return 'Carranguera' }
                      if(categoria==9){return 'Solistas' }
                        if(categoria==10){return 'Orquestas Tropicales' }

      return ' - ';
    }

    $scope.timeSince = function (dates) {


 var date = Date.parse(dates);
   


console.log(date);
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}



//modall

    //modal
 $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];

  $scope.openModal = function() {
    $ionicModal.fromTemplateUrl('detallePublicacion.html', {
    //  $ionicModal.fromTemplateUrl('buscando.html', {
      scope: $scope,
      animation: 'slide-in-up'
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

//modal Enda

  $scope.detallePublicacion = function(data){

    console.log(data);
    $scope.infoModal=data;
    $scope.openModal();

  }

  $scope.postularme = function(idPublicacion){

 
    var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
    var idUser = userData.idUsuario;
    var arrayDatos = {idArtista:idUser, idPublicacion: idPublicacion};

        api.postularArtista(arrayDatos).then(function(data) {

      $ionicLoading.hide();
      
      if(!data.error){


        $scope.closeModal();

        var mensaje = 'Te has postulado correctamente! El cliente será notificado de tu intencion, espera su contacto! '
        var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/confirma.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

    
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

  }


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

.controller('ProfileArtistaCtrl', function($scope, $state, $ionicNavBarDelegate, $stateParams, $sce, $ionicModal, $timeout, $ionicPopup, $ionicLoading, api, serverConfig, ionicMaterialMotion, $ionicSideMenuDelegate, ionicMaterialInk) {

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


    $scope.$on('$ionicView.enter', function(e) {

   
    $ionicNavBarDelegate.showBar(true);
      
});





$scope.tipoTab='info';
$scope.edit={};



  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}



$scope.cambiarFoto = function(fotoNum){

getImage();

function getFotoOrden(){

  var ret = '';
  if(fotoNum == 1){ ret = 'artista1_'}
  if(fotoNum == 2){ ret = 'artista2_'}
  if(fotoNum == 3){ ret = 'artista3_'}


  return ret;
}


function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 alert('get picture failed');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

//artista1_{{idArtista}}.jpg

function uploadPhoto(imageURI) {
  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 options.fileName = getFotoOrden()+$scope.idArtista+'.jpg';
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, serverConfig.url+"/TUSERENATA/v1/index.php/subirFoto", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();
  mensajeAlerta('Foto cambiada correctamente');
  $state.reload();

 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
  mensajeAlerta('error al subir foto');
 }, options);
 }
 

 }

 ionicMaterialInk.displayEffect();


 $scope.editarPerfil = function(){


  console.log('ddcc33');

  $scope.edit.nombre = $scope.infoPerfil.nombre;
   $scope.edit.descripcion = $scope.infoPerfil.descripcion;
    $scope.edit.precioXhora = $scope.infoPerfil.precioXhora;
     $scope.edit.linkVideo1 = $scope.infoPerfil.linkVideo1;
      $scope.edit.linkVideo2 = $scope.infoPerfil.linkVideo2;


  $scope.openModal();
 }
  function getInfoPerfil(){

       $ionicLoading.show();
        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        $scope.idArtista =  userData.idUsuario;
        $scope.urlImagenes = serverConfig.imageStorageURL;

    
        api.getInfoPerfil($scope.idArtista).then(function(data) {
      //$ionicLoading.hide();
       $ionicLoading.hide();
      if(!data.error){

     console.log(data);
     $scope.infoPerfil = data.infoPerfil;
     $scope.comentarios = data.comentarios;
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      $state.go('app.inicio');
      }
      });


 }

     $scope.getCat=function(categoria){

      if(categoria==1){return 'Mariachis' }
        if(categoria==2){return 'Boleros' }
          if(categoria==3){return 'Norteñas' }
            if(categoria==4){return 'Tunas' }
              if(categoria==5){return 'Parranda Vallenato' }
                if(categoria==6){return 'Llanera' }
                  if(categoria==7){return 'Bandas de Rock' }
                    if(categoria==8){return 'Carranguera' }
                      if(categoria==9){return 'Solistas' }
                        if(categoria==10){return 'Orquestas Tropicales' }

      return ' - ';
    }



 getInfoPerfil();


 $scope.actualizarPerfil = function(){

  $scope.edit.id = $scope.idArtista;
  console.log($scope.edit);
 $ionicLoading.show();
    
      api.actualizarPerfil($scope.edit).then(function(data) {
      //$ionicLoading.hide();
       $ionicLoading.hide();

      if(!data.error){

       console.log(data);
       $scope.closeModal();
       $state.reload();
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });


 }

    $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];
 
  $scope.openModal= function(animation) {
    $ionicModal.fromTemplateUrl('editPerfil.html', {
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
  //  $scope.modal.remove();
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

.controller('ProfileCtrl', function($scope, $stateParams, $sce, $ionicModal, $timeout, $ionicPopup, $ionicLoading, api, serverConfig, ionicMaterialMotion, $ionicSideMenuDelegate, ionicMaterialInk) {
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

 console.log($stateParams.idArtista);

   $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }

 
$scope.abrirFace = function(){

  window.open('{{http://www.twitter.com/nraboy}}', '_system', 'location=yes');
   return false;
}

  function mensajeAlerta(mensaje){

        
   var customTemplate =
        '<div style="text-align:center;font-family: Ubuntu;"><img style="margin-top:10px" src="img/excla.png"> <p style="    font-size: 18px;color:#ffc900; margin-top:25px">'+mensaje+'</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [{
          text: 'Cerrar',
          type: 'button-blueCustom',
          onTap: function(e) {

           // if(borrar){ $scope.user.pin='';}
           
          }
        }]
      });

}

 function getInfoPerfil(){

        $scope.idArtista = $stateParams.idArtista;
        $scope.urlImagenes = serverConfig.imageStorageURL;

        api.getInfoPerfil($stateParams.idArtista).then(function(data) {
      //$ionicLoading.hide();
      
      if(!data.error){

     console.log(data);
     $scope.infoPerfil = data.infoPerfil;
     $scope.comentarios = data.comentarios;
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });


 }


    $scope.getCat=function(categoria){

      if(categoria==1){return 'Mariachis' }
        if(categoria==2){return 'Boleros' }
          if(categoria==3){return 'Norteñas' }
            if(categoria==4){return 'Tunas' }
              if(categoria==5){return 'Parranda Vallenato' }
                if(categoria==6){return 'Llanera' }
                  if(categoria==7){return 'Bandas de Rock' }
                    if(categoria==8){return 'Carranguera' }
                      if(categoria==9){return 'Solistas' }
                        if(categoria==10){return 'Orquestas Tropicales' }

      return ' - ';
    }



 getInfoPerfil();



 //chat control

    //modal
    function actualizarMensajes(idUser, idArtista){
      //console.log(idUser);
     // console.log(idArtista);
    api.getMensajes(idUser, idArtista).then(function(response){

    $ionicLoading.hide();

    if(response.error==true){

       mensajeAlerta('Ha ocurrido un error');

      }
    else{

       $scope.mensajesChat=response.mensajes;

    }  
    });

    }

$scope.enviarMensaje = function(texto){

  console.log(texto);

  if(texto=='undefined' || texto==undefined || texto == ''){}
  else{

      api.enviarMensaje($scope.idUsuarioEmisor, $scope.idReceptor,texto).then(function(response){
       // $ionicLoading.hide();
        if(response.error){
        mensajeAlerta('Ha ocurrido un error');
       }
        else{
        actualizarMensajes($scope.idUsuarioEmisor, $scope.idArtista);
        }  
        });
  }
}


$scope.abrirChat = function(){

 $ionicLoading.show();

        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;
        $scope.idUsuarioEmisor = idUser;
        $scope.idReceptor =$scope.idArtista;

if(idUser == $scope.idArtista){
  $ionicLoading.hide();
  mensajeAlerta('No puedes enviarte mensajes a ti mismo');
}
else{
$scope.openModalChat();

  
actualizarMensajes(idUser, $scope.idArtista);

}
}

 
   $scope.modalClasses = ['slide-in-up', 'slide-in-down', 'fade-in-scale', 'fade-in-right', 'fade-in-left', 'newspaper', 'jelly', 'road-runner', 'splat', 'spin', 'swoosh', 'fold-unfold'];
 
  $scope.openModalChat= function(animation) {
    $ionicModal.fromTemplateUrl('chat.html', {
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
  //  $scope.modal.remove();
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


 //chat end

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
