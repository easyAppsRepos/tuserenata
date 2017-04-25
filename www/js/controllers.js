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


.controller('logoutCtrl', function($scope, $timeout, api, $rootScope, $state, $ionicLoading, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate) {


    $scope.perfilArtista = false;
    $scope.cerrarSesion = function(){

     $ionicLoading.show();

        window.localStorage.setItem( 'userInfoTS', undefined);
        window.localStorage.setItem( 'estadoAppTS', undefined);
        window.localStorage.setItem( 'idPublicacionAppTS', undefined);

      if(localStorage.getItem('TSidPush')){

          api.removePush(localStorage.getItem('TSidPush')).then(function(response){

          
         // window.localStorage.setItem('pushKeyTS', undefined);
          window.localStorage.setItem('TSidPush', undefined);
          $ionicLoading.hide();
          $state.go('app.login');
          });

      }

      else{

                $ionicLoading.hide();
        $state.go('app.login');

      }
        
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

.controller('interesadosCtrl', function($scope, $timeout, serverConfig, $stateParams, ionicMaterialInk, $ionicSideMenuDelegate) {


  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
$scope.urlImagenes = serverConfig.imageStorageURL;
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

.controller('generoCtrl', function($scope, serverConfig,  $timeout, $state, $stateParams, api, $ionicPopup, $ionicLoading, ionicMaterialInk, $ionicSideMenuDelegate) {


  $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
$scope.urlImagenes = serverConfig.imageStorageURL;
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



.controller('inicioCtrl', function($scope,  serverConfig, $ionicLoading, $ionicPopup, $rootScope, api, $stateParams, $state, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

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
    $scope.urlImagenes = serverConfig.imageStorageURL;
    ionicMaterialInk.displayEffect();

   // $scope.$on('$ionicView.enter', function() {
   $rootScope.$broadcast('menuLateral');
//});


      $scope.$on('actualizarInteresados', function(event, args) {

        console.log('en actualizarInteresados');
        verificarInteresados();

      });



  $scope.getUR = function(id){

    console.log(id);
    //$scope.infoModal=data;
 return $scope.urlImagenes+'artista1_'+id+'.jpg';

  }




     $scope.$on('artistaElegido', function(event, args) {

        console.log('en artistaElegido');
        verificarEstado();
       // $scope.enBusqueda = 3;
       // window.localStorage.setItem( 'estadoAppTS', 3);
       // verificarEstado();

      });


     $scope.$on('eventoFinalizado', function(event, args) {

        console.log('en eventoFinalizado');
        verificarEstado();
       // $scope.enBusqueda = 1;
       // window.localStorage.setItem( 'estadoAppTS', 1);

      });


$scope.reserva={};
$scope.enBusqueda=1;



  $scope.detallePublicacion = function(){

    //console.log(data);
    //$scope.infoModal=data;
    $scope.openModal2();

  }

    $scope.openModal2 = function() {
    $ionicModal.fromTemplateUrl('detallePublicacion2.html', {
    //  $ionicModal.fromTemplateUrl('buscando.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  };




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

   $scope.escogerArtista = function(idArtista, idPublicacion){


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;


    console.log(idArtista);

        var customTemplate =
        '<div style="text-align:center"><img style="margin-top:10px" src="img/excla.png"> <p style="margin-top:25px; color:white !important">¿Estas seguro que deseas escoger a este artista?</p> </div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        buttons: [
        {
          text: 'Si',
          type: 'botn button-energized',
          onTap: function(e) {

            console.log('si');

//borrar start
      $ionicLoading.show();
        console.log(idArtista);
       // console.log(id);

        api.confirmarArtista(idArtista, idPublicacion, idUser).then(function(response){

            console.log(response);
            $ionicLoading.hide();
           // window.localStorage.setItem( 'estadoAppTS', 4);
           // $state.go('app.inicio');

           if(response.error){
            mensajeAlerta('No has podido seleccionar este Artista');
            verificarInteresados();
          }
           else{$state.go('app.inicio');}


        });
//borrar ends
          }
        },
        {
          text: 'No',
          type: 'botn button-light',
          onTap: function(e) {

          }
        }]
      });
   }

  function verificarEstado(){
$ionicLoading.show();
     // var estado = JSON.parse(window.localStorage.getItem('estadoAppTS')) ;
     //var estado = window.localStorage.getItem('estadoAppTS') ;
var estado;

  var userDatas = JSON.parse(window.localStorage.getItem('userInfoTS'));
     
        $scope.idU = userDatas.idUsuario;


      api.getEstado($scope.idU).then(function(data) {
        console.log(data);
     
      if(!data.error){
        estado=data.estado;

              if(estado==2){
        console.log('eestado 2');
        $scope.enBusqueda = 2;
         $scope.idPublicacion  = data.idPublicacion;
        verificarInteresados();
        $ionicLoading.hide();
      }

      else if(estado==3){
        console.log('artista solicitado');
              $scope.enBusqueda = 3;
              api.getInfoSerenata($scope.idU).then(function(data) {

      $ionicLoading.hide();
      if(!data.error){
        console.log(data);
         $scope.infoModal = data.infoSerenata;   
      }
      else{
          $ionicLoading.hide();
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });



      }
      else if(estado==4){

        console.log('eestado 4');
        $scope.enBusqueda = 4;
       
        $ionicLoading.hide();


      }

      else{
        console.log('eestado 1');
        $scope.enBusqueda = 1;
          $ionicLoading.hide();

      }

      //  mensajeAlerta('Tu cliente ha sido notificado');    
      }
      else{
        $scope.enBusqueda = 1;
        estado=1;
        $ionicLoading.hide();

     // mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

 




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


$scope.notificarLlegada = function(){

      $ionicLoading.show();
      var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
      var idUser = userData.idUsuario;

      api.notificarLlegada(idUser).then(function(data) {

      $ionicLoading.hide();
      if(!data.error){
        mensajeAlerta('Tu cliente ha sido notificado');    
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });
}

$scope.abrirMapa = function(){
  console.log($scope.infoModal.lat);
    console.log($scope.infoModal.lon);
$state.go("app.mapa",{lat: $scope.infoModal.lat, lon: $scope.infoModal.lon });
     // $ionicLoading.show();
//if($scope.infoModal.lat !== null && $scope.infoModal.lat !== 'null'){$state.go("app.mapa",{lat: $scope.infoModal.lat, lon: $scope.infoModal.lon });}
//else{mensajeAlerta('El usuario no ha proporcionado ubicacion GPS');}

}





$scope.artistasInteresados=function(){

  console.log($scope.arrayInteresados);
  $state.go('app.interesados');
}


$scope.cargando=function(){
  $state.go('app.serenatas');
}



$scope.cancelarBusqueda=function(tipo){
  
$ionicLoading.show();

        api.cancelarBusqueda($scope.idU, $scope.idPublicacion).then(function(data) {

      $ionicLoading.hide();
      if(!data.error){

verificarEstado();
      //  mensajeAlerta('Tu cliente ha sido notificado');    
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });


   // $timeout(function() {
   //     ionicMaterialMotion.slideUp({
   //         selector: '.slide-up'
    //    });
    //}, 300);





}

$scope.terminarSerenata = function(){

     $ionicLoading.show();
      var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
      var idUser = userData.idUsuario;



      api.terminarSerenata($scope.infoModal.idPublicacion, idUser, $scope.infoModal.idUsuario).then(function(data) {

      $ionicLoading.hide();

      if(!data.error){

        mensajeAlerta('Enhorabuena, has terminado la serenata'); 
       // window.localStorage.setItem( 'estadoAppTS', 1);
        verificarEstado();

      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });


}
$scope.cancelarSerenataUser=function(){

   var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
      var idUser = userData.idUsuario;



      api.cancelarSerenataUser(idUser).then(function(data) {
//aplicar sancion
      $ionicLoading.hide();

      if(!data.error){

        mensajeAlerta('Se ha cancelado la serenata'); 
     //   window.localStorage.setItem( 'estadoAppTS', 1);
        verificarEstado();

      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });




}



$scope.cancelarSerenataArtista=function(){
//console.log($scope.infoModal.idPublicacion);

   var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
      var idUser = userData.idUsuario;



      api.cancelarSerenata($scope.infoModal.idPublicacion,1, $scope.infoModal.idUsuario, idUser).then(function(data) {

      $ionicLoading.hide();

      if(!data.error){

        mensajeAlerta('Se ha cancelado la serenata'); 
     //   window.localStorage.setItem( 'estadoAppTS', 1);
        verificarEstado();

      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });




}


$scope.cancelarSerenataCliente=function(){
//console.log($scope.infoModal.idPublicacion);

/*      api.cancelarSerenata($scope.infoModal.idPublicacion,1).then(function(data) {

      $ionicLoading.hide();

      if(!data.error){

        mensajeAlerta('Se ha cancelado la serenata'); 
        window.localStorage.setItem( 'estadoAppTS', 1);
        verificarEstado();

      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });


*/

}






  $scope.buscarGrupo=function(){

  
  //$scope.closeModal();
      

        if($scope.reserva.nombre == 'undefine' || $scope.reserva.nombre == null || $scope.reserva.nombre == '' ||
          $scope.reserva.ciudad == 'undefine' || $scope.reserva.ciudad == null || $scope.reserva.ciudad == '' || 
           $scope.reserva.direccion == 'undefine' || $scope.reserva.direccion == null || $scope.reserva.direccion == '' || 
            $scope.reserva.telefono == 'undefine' || $scope.reserva.telefono == null || $scope.reserva.telefono == '' || 
             $scope.reserva.motivo == 'undefine' || $scope.reserva.motivo == null || $scope.reserva.motivo == '' 
             || $scope.reserva.genero == 'undefine' || $scope.reserva.genero == null || $scope.reserva.genero == ''   
              ){


          mensajeAlerta('Todos los campos son requeridos');
        }

      else{

  var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
          $scope.reserva.idUsuario = userData.idUsuario;

          $ionicLoading.show();

      //gps

        navigator.geolocation.getCurrentPosition(function(pos) {

         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
              //$scope.map.setZoom(16);

                $scope.reserva.lat = pos.coords.latitude;
                $scope.reserva.lon = pos.coords.longitude;

          api.addLaPlaya($scope.reserva).then(function(data) {
 console.log(data);
            
              if(!data.error){
               

               // window.localStorage.setItem( 'estadoAppTS', 2);
                window.localStorage.setItem( 'idPublicacionAppTS', data.idPublicacion);

              
                
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
  $ionicLoading.hide();
  verificarEstado();


              }
              else{  $ionicLoading.hide();
                mensajeAlerta('Ha ocurrido un error');
              }
          });



        }, function(error) {
          console.log('Unable to get location: ' + error.message);
            //ini
            var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
            $scope.reserva.idUsuario = userData.idUsuario;


            $ionicLoading.show();


                              $scope.reserva.lat = null;
                $scope.reserva.lon = null;


            api.addLaPlaya($scope.reserva).then(function(data) {
            console.log(data);

            if(!data.error){


            // window.localStorage.setItem( 'estadoAppTS', 2);
            window.localStorage.setItem( 'idPublicacionAppTS', data.idPublicacion);



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
            $ionicLoading.hide();
            verificarEstado();


            }
            else{  $ionicLoading.hide();
            mensajeAlerta('Ha ocurrido un error');
            }
            });
            //fin


        });


/*          var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
          $scope.reserva.idUsuario = userData.idUsuario;

          $ionicLoading.show();
          api.addLaPlaya($scope.reserva).then(function(data) {
 console.log(data);
            
              if(!data.error){
               

               // window.localStorage.setItem( 'estadoAppTS', 2);
                window.localStorage.setItem( 'idPublicacionAppTS', data.idPublicacion);

              
                
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
  $ionicLoading.hide();
  verificarEstado();


              }
              else{  $ionicLoading.hide();
                mensajeAlerta('Ha ocurrido un error');
              }
          });

*/

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


.controller('mensajesArtistaCtrl', function($scope, $ionicLoading, serverConfig, $ionicPopup, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

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

$scope.mensajesCero = false;
$scope.urlImagenes = serverConfig.imageStorageURL;
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


    // Set Ink
    ionicMaterialInk.displayEffect();

    function getChats(){


      $ionicLoading.show();


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;

      api.getChatsArtista(idUser).then(function(data) {
      $ionicLoading.hide();
      
      if(!data.error){
      
        if(data.chats.length==0){$scope.mensajesCero = true;}
        else{$scope.mensajesCero = false;}
      console.log(data.chats.length);
      $scope.chats = data.chats;

    
      }
      else{
         if(data.chats.length==0){$scope.mensajesCero = true;}
      //mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

    }

    getChats();


    //chat control

    //modal
    function actualizarMensajes(idUser, idArtista){
      //console.log(idUser);
     // console.log(idArtista);
    api.getMensajess(idUser, idArtista).then(function(response){

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
        actualizarMensajes($scope.idUsuarioEmisor, $scope.idReceptor);
        }  
        });
  }
}


$scope.abrirChat = function(idUsuario){

 $ionicLoading.show();

        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;
        $scope.idUsuarioEmisor = idUser;
        $scope.idReceptor =idUsuario;

if(idUser == 'wewew'){
  $ionicLoading.hide();
  mensajeAlerta('No puedes enviarte mensajes a ti mismo');
}
else{
$scope.openModalChat();

  
actualizarMensajes(idUsuario, idUser);

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

.controller('mensajesCtrl', function($scope, $ionicLoading, serverConfig, $ionicPopup, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

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

$scope.mensajesCero = false;
$scope.urlImagenes = serverConfig.imageStorageURL;
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


    // Set Ink
    ionicMaterialInk.displayEffect();

    function getChats(){


      $ionicLoading.show();


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;

      api.getChats(idUser).then(function(data) {
      $ionicLoading.hide();
      
      if(!data.error){
      
        if(data.chats.length==0){$scope.mensajesCero = true;}
        else{$scope.mensajesCero = false;}
      console.log(data.chats.length);
      $scope.chats = data.chats;

    
      }
      else{
         if(data.chats.length==0){$scope.mensajesCero = true;}
      //mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

    }

    getChats();


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
        actualizarMensajes($scope.idUsuarioEmisor, $scope.idReceptor);
        }  
        });
  }
}


$scope.abrirChat = function(idArtista){

 $ionicLoading.show();

        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;
        $scope.idUsuarioEmisor = idUser;
        $scope.idReceptor =idArtista;

if(idUser == $scope.idArtista){
  $ionicLoading.hide();
  mensajeAlerta('No puedes enviarte mensajes a ti mismo');
}
else{
$scope.openModalChat();

  
actualizarMensajes(idUser, idArtista);

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


.controller('notificacionesCtrl', function($scope, $ionicLoading, $ionicPopup, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

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

$scope.evaluacion={};
    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.notiAccion=function(noti){
      console.log(noti);




          $scope.showPopup = function() {
            $scope.data = {}
           var customTemplate2 ='<div style="color:white !important" > El artista desea cambiar la fecha de la serenata para el dia 24/04/2017 a las 14h:30min. <br><br>  <strong>Aceptas esta fecha?</strong></div> ';


            $ionicPopup.show({
              template: customTemplate2,
              title: '',
              subTitle: '',
              scope: $scope,
              buttons: [
                { text: 'No', onTap: function(e) { return false; } },
                {
                  text: '<b>Si</b>',
                  type: 'button-energized ',
                  onTap: function(e) {
                    return  true;
                  }
                },
              ]
              }).then(function(res) {

              
                console.log('Tapped!', res);

                if(res){

                      $ionicLoading.show();

                      api.confirmarEvento(noti.idAccion).then(function(response){

                      $ionicLoading.hide();

                      if(response.error==true){

                      mensajeAlerta('Ha ocurrido un error');

                      }
                      else{

                      mensajeAlerta('Has confirmado correctamente el evento');
                      //$state.reload();

                      }  
                      });


                }



              }, function(err) {
                console.log('Err:', err);
              }, function(msg) {
                console.log('message:', msg);
              });


          };


       if(noti.idTipoNotificacion == 9 ){

$scope.showPopup();

       }





      if(noti.idTipoNotificacion == 5 ){

        console.log('evaluacion');
        //if(noti.estado==2){ mensajeAlerta('Ya evaluaste este servicio');}
        if(noti.estado==1){

                var customTemplate =
        '<div style="    text-align: center; color: white; font-family: UbuntuM;">Evaluando el servicio de '+noti.nombre+'</div><div style="text-align:center"> <p style="margin-top:25px; color:white !important">¿Evalua del 1 al 5 el servicio brindado?</p>     <select style="    background-color: white;width: 100%;height: 35px;" ng-model="evaluacion.estrellas" > <option value="1" selected>Malo</option><option value="2" >Regular</option> <option value="3">Bueno</option><option value="4">Muy Bueno</option> <option value="5">Excelente</option></select> <div style="margin-top: 20px;margin-bottom: 5px;color: white;font-size: 15px;" >Agrega un comentario</div> <textarea ng-model="evaluacion.comentario" rows="4" style=" resize: none;"> </textarea></div>';

      $ionicPopup.show({
        template: customTemplate,
        title: '',
        subTitle: '',
        scope:$scope,
        buttons: [
        {
          text: 'Enviar',
          type: 'botn button-energized',
          onTap: function(e) {

            console.log($scope.evaluacion.comentario);
            console.log($scope.evaluacion.estrellas);

            if($scope.evaluacion.estrellas == undefined || $scope.evaluacion.estrellas == 'undefined' || 
              $scope.evaluacion.estrellas == '' || $scope.evaluacion.estrellas == null){

              console.log(noti);
            }

            else{


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;



                    $ionicLoading.show();
                    //console.log(idArtista);
                    // console.log(id);

                    api.agregarComentario(noti.idAccion, idUser, $scope.evaluacion.estrellas, $scope.evaluacion.comentario, noti.idNotificacion ).then(function(response){

                           if(!response.error){

                          mensajeAlerta('Tu calificacion ha sido agregada, gracias por utilizar nuestro servicio');

                        
                          }
                          else{
                          mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
                          }


                    });

            }

/*//borrar start
      $ionicLoading.show();
        console.log(idArtista);
       // console.log(id);

        api.confirmarArtista(idArtista, idPublicacion).then(function(response){

            $ionicLoading.hide();
            window.localStorage.setItem( 'estadoAppTS', 4);
            $state.go('app.inicio');


        });*/
//borrar ends
          }
        }]
      });


        }

        else{
          mensajeAlerta('Ya evaluaste este servicio');
        }
        
      }
    }

    function getNotificaciones(){


      $ionicLoading.show();


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;

      api.getNotificaciones(idUser).then(function(data) {
      $ionicLoading.hide();
      
      if(!data.error){

      console.log(data.notificaciones);
      $scope.notificaciones = data.notificaciones;

    
      }
      else{
      //mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      }
      });

    }

    getNotificaciones();


})

.controller('laPlayaCtrl', function($scope, $rootScope, $ionicPopup, $ionicNavBarDelegate, $ionicLoading, api, $state, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {
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



 $ionicNavBarDelegate.showBar(true);
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

    $scope.validarPost = function(listaIntere){
 var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;
 console.log(listaIntere);
        if(listaIntere == null || listaIntere == 'null'){
          console.log('false8888');
          return false}

          //console.log('TRUE8888');
      var myStringArray = listaIntere.split(",");
        var arrayLength = myStringArray.length;
        for (var i = 0; i < arrayLength; i++) {

             
            if(myStringArray[i] == idUser){ return true;}
           
            //Do something
        }

         return false; 
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

 $scope.cancelarPostularme = function(idPublicacion){

    var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
    var idUser = userData.idUsuario;
    var arrayDatos = {idArtista:idUser, idPublicacion: idPublicacion};


            api.cancelarPostularme(arrayDatos).then(function(data) {
console.log(data);
      $ionicLoading.hide();
      
      if(!data.error){


        $scope.closeModal();

        var mensaje = 'Has cancelado tu interes por participar'
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
            getPublicaciones();
           // if(borrar){ $scope.user.pin='';}
           //window.localStorage.setItem( 'estadoAppTS', 3);
           //$state.go('app.inicio');


          }
        }]
      });
     // $state.go('app.inicio', null, {reload: true});
    
      }
      else{
      mensajeAlerta('No ha sido posible cancelar');
      }
      });



 }



  $scope.postularme = function(idPublicacion, idUsuarioPropone){
$ionicLoading.show();
 
    var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
    var idUser = userData.idUsuario;
    var arrayDatos = {idArtista:idUser, idPublicacion: idPublicacion, idUsuarioPropone:idUsuarioPropone};

        api.postularArtista(arrayDatos).then(function(data) {
console.log(data);
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
           //window.localStorage.setItem( 'estadoAppTS', 3);
           //$state.go('app.inicio');
           getPublicaciones();

          }
        }]
      });
     // $state.go('app.inicio', null, {reload: true});
    
      }
      else{
      mensajeAlerta('No ha sido posible postularse');
      }
      });

  }


})




.controller('mapaCtrl', function($scope, $ionicPopup, $compile, NgMap, $state, $ionicSideMenuDelegate, $ionicNavBarDelegate, $ionicLoading, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {

console.log('mapa');


      $scope.lat = $stateParams.lat;
        $scope.lon = $stateParams.lon;


var vm = this; 
    $scope.$on('$ionicView.enter', function(e) {

      $scope.lat = $stateParams.lat;
        $scope.lon = $stateParams.lon;
console.log( $scope.lat);
console.log( $scope.lon);
                          NgMap.getMap().then(function(map) {
                    vm.map = map;
                  });

    $ionicNavBarDelegate.showBar(true);
      $ionicSideMenuDelegate.canDragContent(false)
});



 
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
console.log('mapa2');
    // Set Ink
    ionicMaterialInk.displayEffect();
       $ionicSideMenuDelegate.canDragContent(false);
/*
    $scope.$on('$ionicView.enter', function(e) {

   
    $ionicNavBarDelegate.showBar(true);
      
    });*/

    //mapa

    $scope.getAnunciosTodos = function(){

        api.getAnunciosTodos().then(function(data) {
$ionicLoading.show();
     
      if(!data.error){

       console.log(data);
       $scope.anunciosTodos = data.eventos;
        $ionicLoading.hide();
      }
      else{
         $ionicLoading.hide();
        mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });


    }


$scope.getAnunciosTodos();

console.log('mapa3');
      function initialize() {



console.log($scope.lon);
console.log('mapa4');

console.log(new google.maps.LatLng($scope.lat, $scope.lon));

        var myLatlng = new google.maps.LatLng($scope.lat, $scope.lon);
        var myLatlng2 = new google.maps.LatLng($scope.lat, $scope.lon);

        console.log(myLatlng);
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);

        var directionsService = new google.maps.DirectionsService();
        var directionsRequest = {
        origin: myLatlng,
        destination: myLatlng2,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
        };


      directionsService.route(
        directionsRequest,
        function(response, status)
        {
          if (status == google.maps.DirectionsStatus.OK)
          {
            new google.maps.DirectionsRenderer({
              map: map,
              directions: response
            });
             $scope.centerOnMe();
          }
          else
            console.log("Unable to retrieve your route<br />");
        }
      );



        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Floristeria Rosa'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      //google.maps.event.addDomListener(window, 'load', initialize);
     // initialize();
      $scope.centerOnMe = function() {
        console.log('ss');


        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {

console.log('ss');
console.log(pos);
         // $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          //    $scope.map.setZoom(16);
          $scope.loading.hide();


        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };

    //endMAp


})


.controller('anunciosCtrl', function($scope, $ionicPopup, $state, $ionicNavBarDelegate, $ionicLoading, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {
 
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

    $scope.$on('$ionicView.enter', function(e) {

   
    $ionicNavBarDelegate.showBar(true);
      
    });
$scope.anuncio={};

function getAnunucios(){

          
                var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
                var idUser = userData.idUsuario;

        api.getAnuncios(idUser).then(function(data) {
$ionicLoading.show();
     
      if(!data.error){

       console.log(data);
       $scope.anuncios = data.eventos;

 $scope.valorAnuncio = data.valorAnuncio;

        $ionicLoading.hide();
      }
      else{
         $ionicLoading.hide();
        mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });


}

getAnunucios();
    $scope.agregarAnuncio = function(){


   if($scope.anuncio.nombre == 'undefined' || $scope.anuncio.nombre == null || $scope.anuncio.nombre == '' ||
        $scope.anuncio.valor == 'undefined' || $scope.anuncio.valor == null || $scope.anuncio.valor == '' ||
         $scope.anuncio.tipo == 'undefined' || $scope.anuncio.tipo == null || $scope.anuncio.tipo == '' ||
                 $scope.anuncio.telefono == 'undefined' || $scope.anuncio.telefono == null || $scope.anuncio.telefono == ''){


        mensajeAlerta('Debes rellenar todos los campos');
      }

 else{


       $ionicLoading.show();
        navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
              //$scope.map.setZoom(16);
       



                
                var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
                var idUser = userData.idUsuario;


                $scope.anuncio.idUsuario =  idUser;
                $scope.anuncio.lat = pos.coords.latitude;
                $scope.anuncio.lon = pos.coords.longitude;

                  console.log($scope.anuncio);
                api.agregarAnuncio($scope.anuncio).then(function(data) {

                    if(!data.error){

                    $ionicLoading.hide();
                    console.log(data);
                    mensajeAlerta('Tu anuncio ha sido agregado');
                    $state.go('app.inicio');
                    
                    }
                    else{
                    $ionicLoading.hide();

                    if(data.saldo==false){
                      mensajeAlerta('No tienes suficientes puntos para esta compra');

                    }
                    else{mensajeAlerta('Ha ocurrido un error');}

                     
                    //$state.go('app.inicio');
                    }
                });


        }, function(error) {
           $ionicLoading.hide();
         mensajeAlerta('Debes activar el GPS para publicar un anuncio');

        });


    }
      //

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



})


.controller('puntosCtrl', function($scope, $ionicPopup, $state, $ionicNavBarDelegate, $ionicLoading, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {
 
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

    $scope.$on('$ionicView.enter', function(e) {

   
    $ionicNavBarDelegate.showBar(true);
      
    });

    $scope.dat={};
    function getPuntos(){

      $ionicLoading.show();

          var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
    var idUser = userData.idUsuario;


      api.getPuntos(idUser).then(function(data) {

     
      if(!data.error){

       console.log(data);
       $scope.puntosUser = data.puntos;
        $ionicLoading.hide();
      }
      else{
         $ionicLoading.hide();
        mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });

    }
getPuntos();


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


      $scope.activarCodigo = function(){

      if($scope.dat.codigo == 'undefine' || $scope.dat.codigo == null || $scope.dat.codigo == ''){


        mensajeAlerta('Debes rellenar todos los campos');
      }

 else{  
  console.log($scope.dat.codigo);


          var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
    var idUser = userData.idUsuario;



        api.activarCodigo(idUser, $scope.dat.codigo).then(function(data) {

      $ionicLoading.hide();
      if(!data.error){
       console.log(data);
       mensajeAlerta('Tus puntos han sido acreditados! Gracias por utilizar nuestro servicio');
       getPuntos();

      }
      else{
        mensajeAlerta('Codigo Invalido');
      }
      });



}

      

      }

 })
.controller('FriendsCtrl', function($scope, $ionicPopup, $state, $ionicNavBarDelegate, $ionicLoading, api, $rootScope, $stateParams, $ionicScrollDelegate, $timeout, $ionicModal, $ionicSlideBoxDelegate, ionicMaterialInk, ionicMaterialMotion, ionicTimePicker, ionicDatePicker) {
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


    $scope.$on('$ionicView.enter', function(e) {

   
    $ionicNavBarDelegate.showBar(true);
      
    });

         $scope.cont_dia= new Array(7);
  $scope.cont_dia[0]= 0;
  $scope.cont_dia[1]= 0;
  $scope.cont_dia[2]= 0;
  $scope.cont_dia[3]= 0;
  $scope.cont_dia[4]= 0;
  $scope.cont_dia[5]= 0;
  $scope.cont_dia[6]= 0;


    function getEventosArtista(){

      $ionicLoading.show();

          var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
    var idUser = userData.idUsuario;


      api.getEventosAgendados(idUser, 1).then(function(data) {

      $ionicLoading.hide();
      if(!data.error){

       console.log(data);

        

        for (var i = 0; i <7; i++) {

            console.log($scope.obt_fecha_dia2(i));

            for (var j = 0; j <data.eventos.length; j++) {

                if(data.eventos[j].fecha == $scope.obt_fecha_dia2(i)){

                $scope.cont_dia[i]=$scope.cont_dia[i]+1 ;
                
                }

            }


        }


       $scope.eventos=data.eventos;
console.log($scope.cont_dia)
      }
      else{
        mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });

    }
getEventosArtista();
//borrarlater
/*

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
//endsborrarlater*/

$scope.evento={};
$scope.tipoReservas = 'semana';



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
      console.log(value);
      $scope.obt_fecha_di3(value);
    //$scope.change_view(value,true);
    }
};

$scope.confirmarEvento = function(idEvento){
    $ionicLoading.show();

    api.confirmarEvento(idEvento).then(function(response){

    $ionicLoading.hide();

    if(response.error==true){

       mensajeAlerta('Ha ocurrido un error');

      }
    else{

       mensajeAlerta('Has confirmado correctamente el evento');
       $state.reload();

    }  
    });

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

$scope.cambiarFecha={};


$scope.cambiarFechaT = function(idEvento, idUsuario){
$scope.cambiarFecha.idEvento = idEvento;
$scope.cambiarFecha.idUsuario = idUsuario;
  $scope.openDatePicker22();


  //console.log(idEvento);
/*
    $ionicLoading.show();

    api.cambiarFecha(idEvento).then(function(response){

    $ionicLoading.hide();

    if(response.error==true){

       mensajeAlerta('Ha ocurrido un error');

      }
    else{

       mensajeAlerta('Has cancelado la reservacion');
       $state.reload();

    }  
    });
  */
}



$scope.cancelarEvento = function(idEvento){

    $ionicLoading.show();

    api.cancelarEvento(idEvento).then(function(response){

    $ionicLoading.hide();

    if(response.error==true){

       mensajeAlerta('Ha ocurrido un error');

      }
    else{

       mensajeAlerta('Has cancelado la reservacion');
       $state.reload();

    }  
    });
  
}



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

  $scope.obt_fecha_dia2 = function(i) {
    var day_r= $scope.fecha.getDay();
    var date= new Date();
    date.setDate($scope.fecha.getDate()+(i-day_r));
    $scope.fecha_m=date;
    var date = $scope.fecha_m;
   var ret = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
    console.log(ret);
    return ret;

  }
  


  $scope.obt_fecha_di3 = function(fecha) {
    $scope.eventosDia = [];
 //   var day_r= $scope.fecha.getDay();
    var date= fecha;
     $scope.fecha_m=date;
    var fechaStr = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
     // $scope.fechaComp=  datestring;

    
      var arrayLength = $scope.eventos.length;

      for (var i = 0; i < arrayLength; i++) {
        console.log($scope.eventos[i].fecha);
          if($scope.eventos[i].fecha == fechaStr){
             console.log('TRUE');
            $scope.eventosDia.push($scope.eventos[i]);

          }
          
      }

   // console.log($scope.fechaComp);
    $scope.nextSlide();
  }


  $scope.obt_fecha_dia = function(i) {
    $scope.eventosDia = [];
    var day_r= $scope.fecha.getDay();
    var date= new Date();
    date.setDate($scope.fecha.getDate()+(i-day_r));
    $scope.fecha_m=date;
    $scope.diaActual=i;

     var date = $scope.fecha_m;
      $scope.fechaComp = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
     // $scope.fechaComp=  datestring;

    
      var arrayLength = $scope.eventos.length;
      for (var i = 0; i < arrayLength; i++) {
        console.log($scope.eventos[i].fecha);
          if($scope.eventos[i].fecha == $scope.fechaComp){
             console.log('TRUE');
            $scope.eventosDia.push($scope.eventos[i]);

          }
          
      }

    console.log($scope.fechaComp);
    $scope.nextSlide();
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




    $scope.agregarEvento=function(){



   var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;
   console.log($scope.evento);

      if($scope.evento.nombre == 'undefine' || $scope.evento.nombre == null || $scope.evento.nombre == '' ||
        $scope.evento.hora == 'undefine' || $scope.evento.hora == null || $scope.evento.hora == '' ||
         $scope.evento.lugar == 'undefine' || $scope.evento.lugar == null || $scope.evento.lugar == '' ||
                 $scope.evento.telefono == 'undefine' || $scope.evento.telefono == null || $scope.evento.telefono == '' ||
        $scope.evento.fecha == 'undefine' || $scope.evento.fecha == null || $scope.evento.fecha == '' ){


        mensajeAlerta('Debes rellenar todos los campos');
      }

 else{
      $ionicLoading.show();

      $scope.evento.idArtista = idUser;
      $scope.evento.idUsuario = 0;
            $scope.evento.lat = null;
                $scope.evento.lon = null;

      api.agendarEvento($scope.evento).then(function(data) {
     
       $ionicLoading.hide();
      if(!data.error){

        mensajeAlerta('Tu serenata ha sido programada');
        $scope.evento={};
             $state.reload();
        //getEventosAgendados();

      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });
}



    }


    //calendario
  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.evento.fecha=  new Date(val);
        var date=$scope.evento.fecha;
     
       var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
      console.log(datestring);
      $scope.evento.fechaString=  datestring;
    //  $scope.evento.id=("" + (date.getMonth() + 1).toString()).substr(-2) + "" + (date.getDate().toString()).substr(-2)  + "" + (date.getFullYear().toString()).substr(2);
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


      var ipObj11 = {
      callback: function (val) {  //Mandatory
      //  console.log('Return value from the datepicker popup is : ' + val, new Date(val));

        var date = new Date(val);
     
       var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
   $scope.cambiarFecha.fecha=datestring;

      console.log(datestring);
       $scope.openTimePicker22();
    //  $scope.evento.id=("" + (date.getMonth() + 1).toString()).substr(-2) + "" + (date.getDate().toString()).substr(-2)  + "" + (date.getFullYear().toString()).substr(2);
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

        $scope.openDatePicker22 = function(){
      ionicDatePicker.openDatePicker(ipObj11);
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
       $scope.evento.horaNum=selectedTime.getUTCHours();
       $scope.evento.minutosNum=selectedTime.getUTCMinutes();

       console.log($scope.evento.hora);
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



  var ipTObj11 = {
    callback: function (val) {      //Mandatory
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
       $scope.cambiarFecha.hora=(selectedTime.getUTCHours()+ 'H :'+ selectedTime.getUTCMinutes()+ 'M');
       $scope.cambiarFecha.horaNum=selectedTime.getUTCHours();
       $scope.cambiarFecha.minutosNum=selectedTime.getUTCMinutes();

       ////////////////////console.log($scope.evento.hora);
       console.log($scope.cambiarFecha);

           $ionicLoading.show();

    api.actualizarFechaEvento($scope.cambiarFecha).then(function(response){

    $ionicLoading.hide();

    if(response.error==true){

       mensajeAlerta('La fecha esta ocupada');

      }
    else{

       mensajeAlerta('Fecha Cambiada Correctamente');
       $state.reload();

    }  
    });



      }
    },
    inputTime: 50400,   //Optional
    format: 12,         //Optional
    step: 15,           //Optional
    setLabel: 'Ok'    //Optional
  };

    $scope.openTimePicker22 = function(){
      ionicTimePicker.openTimePicker(ipTObj11);
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




.controller('contratarCtrl', function($scope, $state, $ionicNavBarDelegate, ionicDatePicker, ionicTimePicker, $stateParams, $sce, $ionicModal, $timeout, $ionicPopup, $ionicLoading, api, serverConfig, ionicMaterialMotion, $ionicSideMenuDelegate, ionicMaterialInk) {
   
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

 $scope.idArtista = $stateParams.idArtista;
$scope.evento={};
    $scope.$on('$ionicView.enter', function(e) {

   
    $ionicNavBarDelegate.showBar(true);
      
    });

    function getEventosAgendados(){
$ionicLoading.show();
            api.getEventosAgendados($scope.idArtista, 0).then(function(data) {
     
       $ionicLoading.hide();
      if(!data.error){

        console.log(data);
        $scope.eventos=data.eventos;
      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });

    }
getEventosAgendados();
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



    $scope.agregarEvento=function(){




   var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        var idUser = userData.idUsuario;
   

      if($scope.evento.nombre == 'undefine' || $scope.evento.nombre == null || $scope.evento.nombre == '' ||
        $scope.evento.hora == 'undefine' || $scope.evento.hora == null || $scope.evento.hora == '' ||
         $scope.evento.lugar == 'undefine' || $scope.evento.lugar == null || $scope.evento.lugar == '' ||
                 $scope.evento.telefono == 'undefine' || $scope.evento.telefono == null || $scope.evento.telefono == '' ||
        $scope.evento.fecha == 'undefine' || $scope.evento.fecha == null || $scope.evento.fecha == '' ){


        mensajeAlerta('Debes rellenar todos los campos');
      }

 else{
      $ionicLoading.show();

      //gps

        navigator.geolocation.getCurrentPosition(function(pos) {
         console.log(pos.coords.latitude+' Long: '+ pos.coords.longitude);
              //$scope.map.setZoom(16);
                $scope.evento.idArtista = $scope.idArtista;
                $scope.evento.idUsuario = idUser;

                $scope.evento.lat = pos.coords.latitude;
                $scope.evento.lon = pos.coords.longitude;

                console.log($scope.evento);
                api.agendarEvento($scope.evento).then(function(data) {

                $ionicLoading.hide();
                if(!data.error){

                mensajeAlerta('Tu serenata ha sido programada');
                $scope.evento={};
                getEventosAgendados();

                }
                else{
                mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
                //$state.go('app.inicio');
                }
                });


        }, function(error) {
          console.log('Unable to get location: ' + error.message);
                $scope.evento.idArtista = $scope.idArtista;
                $scope.evento.idUsuario = idUser;

                $scope.evento.lat = null;
                $scope.evento.lon = null;

                console.log($scope.evento);
                api.agendarEvento($scope.evento).then(function(data) {

                $ionicLoading.hide();
                if(!data.error){

                mensajeAlerta('Tu serenata ha sido programada');
                $scope.evento={};
                getEventosAgendados();

                }
                else{
                mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
                //$state.go('app.inicio');
                }
                });


        });

      //coordes
/*
      $scope.evento.idArtista = $scope.idArtista;
      $scope.evento.idUsuario = idUser;
     console.log($scope.evento);
      api.agendarEvento($scope.evento).then(function(data) {
     
       $ionicLoading.hide();
      if(!data.error){

        mensajeAlerta('Tu serenata ha sido programada');
        $scope.evento={};
        getEventosAgendados();

      }
      else{
      mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
      //$state.go('app.inicio');
      }
      });
      */
}



    }
    //calendario

  var ipObj1 = {
      callback: function (val) {  //Mandatory
        console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.evento.fecha=  new Date(val);
        var date=$scope.evento.fecha;
     
       var datestring = ("0" + (date.getMonth() + 1).toString()).substr(-2) + "/" + ("0" + date.getDate().toString()).substr(-2)  + "/" + (date.getFullYear().toString()).substr(2);
      console.log(datestring);
      $scope.evento.fechaString=  datestring;
    //  $scope.evento.id=("" + (date.getMonth() + 1).toString()).substr(-2) + "" + (date.getDate().toString()).substr(-2)  + "" + (date.getFullYear().toString()).substr(2);
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
       $scope.evento.horaNum=selectedTime.getUTCHours();
       $scope.evento.minutosNum=selectedTime.getUTCMinutes();

       console.log($scope.evento.hora);
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




})
.controller('ProfileArtistaCtrl', function($scope, $state, $ionicNavBarDelegate, $stateParams, $sce, $ionicModal, $timeout, $ionicPopup, $ionicLoading, api, serverConfig, ionicMaterialMotion, $ionicSideMenuDelegate, ionicMaterialInk) {


        var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
        $scope.idUs =  userData.idUsuario;


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


$scope.cambiarFoto = function(num){
getImage();
function getImage() {
 navigator.camera.getPicture(uploadPhoto, function(message) {
 console.log('getPic cancelled');
 }, {
 quality: 100,
 destinationType: navigator.camera.DestinationType.FILE_URI,
 sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
 });
}

function uploadPhoto(imageURI) {
  $ionicLoading.show();
 var options = new FileUploadOptions();
 options.fileKey = "file";
 //options.fileName = 'userP'+$scope.usuarioInfo.idUsuario;
 options.fileName = 'artista'+num+'_'+$scope.idUs;
 options.mimeType = "image/jpeg";
 console.log(options.fileName);
 var params = new Object();
 params.value1 = "test";
 params.value2 = "param";
 options.params = params;
 options.chunkedMode = false;

var ft = new FileTransfer();
 ft.upload(imageURI, serverConfig.imageStorageURL+"upload.php", function(result){
 console.log(JSON.stringify(result));
  $ionicLoading.hide();
  $state.reload();
  console.log('Foto cambiada correctamente');

  $scope.$apply(function () {
     $scope.valorF =4;
});


 }, function(error){
 console.log(JSON.stringify(error));
 $ionicLoading.hide();
 console.log('error al subir foto');
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

.controller('ProfileCtrl', function($scope, $state, $stateParams, $sce, $ionicModal, $timeout, $ionicPopup, $ionicLoading, api, serverConfig, ionicMaterialMotion, $ionicSideMenuDelegate, ionicMaterialInk) {
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


$scope.apuntarse = function(){

$state.go('app.contratar', { idArtista:$stateParams.idArtista });
  //  $ionicLoading.show();

    //    var userData = JSON.parse(window.localStorage.getItem('userInfoTS'));
      //  var idUser = userData.idUsuario;



/*
    api.agendarSerenata($stateParams.idArtista,).then(function(data) {
    $ionicLoading.hide();

    if(!data.error){

    console.log(data);
    $scope.infoPerfil = data.infoPerfil;
    $scope.comentarios = data.comentarios;
    }
    else{
    mensajeAlerta('Ha ocurrido un error. Verifique su conexion a internet');
    }
    });*/

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
