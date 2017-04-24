angular.module('starter.services', [])

.factory('api', function($http, $q, $window, serverConfig) {

    return {

    


        loginUser:function(user, pass){  
            console.log(user);
             console.log(pass);

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/loginUser',{user:user, pass:pass})
            .then(function(response) {
                response.data.error=false;
            console.log(response);

            return response.data;

            }, function(response) {
            // something went wrong
            console.log('error');
             console.log(response);
             response.data.error=true;
            return response.data;
            });
        },

        addLaPlaya:function(reservaObj){  
console.log(reservaObj);
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/addLaPlaya',reservaObj)
            .then(function(response) {
            console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
            response.data.error = true;
            return response.data.error;
            });
        },


        getPublicaciones:function(idUser){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getPublicaciones',{idUsuario:idUser})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },

                cancelarBusqueda:function(idUser, idPublicacion){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/cancelarBusqueda',{idPublicacion:idPublicacion,idUsuario:idUser})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


        getEstado:function(idUser){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getEstado',{idUsuario:idUser})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


        getPuntos:function(idUser){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getPuntos',{idUsuario:idUser})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },

                activarCodigo:function(idUser, codigo){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/activarCodigo',{idUsuario:idUser, codigo:codigo})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


                cancelarSerenataUser:function(idUser){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/cancelarSerenataUser',{idUsuario:idUser})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


        getNotificaciones:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getNotificaciones',{idUsuario: data})
            .then(function(response) {

                console.log(response);

            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },



        agregarComentario:function(idArtista, idUsuario, estrellas, comentarios, idNotificacion){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/agregarComentario',{idArtista:idArtista, idUsuario:idUsuario, estrellas:estrellas, comentarios:comentarios, idNotificacion:idNotificacion})
            .then(function(response) {

                console.log(response);

            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },



        agregarAnuncio:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/agregarAnuncio',data)
            .then(function(response) {

                console.log(response);

            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },



                getChats:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getChats',{idUsuario: data})
            .then(function(response) {

                console.log(response);
                
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },

                        getChatsArtista:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getChatsArtista',{idUsuario: data})
            .then(function(response) {

                console.log(response);
                
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },



        

                     removePush:function(id){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/removePush',{idPush: id})
            .then(function(response) {

                console.log(response);

            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.recuperacionOK =false;}

           
            return e;
            });
        },



                recuperarContra:function(email){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/recuperarContra',{email: email})
            .then(function(response) {

                console.log(response);

            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.recuperacionOK =false;}

           
            return e;
            });
        },



        registrarUsuario:function(datosUser){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/registrarUsuario',datosUser)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.error =true;}

           
            return e;
            });
        },

        addPush:function(datos){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/addPush',datos)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.error =true;}

           
            return e;
            });
        },


            cancelarSerenata:function(id,tipo,idUsuario,idUsuarioArtista){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/cancelarSerenata',{idPublicacion:id, tipo:tipo, idUsuario:idUsuario, idUsuarioArtista:idUsuarioArtista })
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.error =true;}

           
            return e;
            });
        },

                    terminarSerenata:function(id,idArtista,idUsuario){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/terminarSerenata',{idPublicacion:id, idArtista: idArtista, idUsuario:idUsuario})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
               var e = response;
               e.error =true;
                //var r.data.error=true;

               if(response.status==404){  e.error =true;}

           
            return e;
            });
        },


        registrarArtista:function(datosArtista){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/registrarArtista',datosArtista)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


                notificarLlegada:function(idUsuario){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/notificarLlegada', {idUsuario:idUsuario})
            .then(function(response) {
                console.log(response);
            return response;
            }, function(response) {
            // something went wrong
              // console.log(response);
            //response.data.error = true;
            return response;
            });
        },


            getInfoSerenata:function(idUsuario){  

                return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getInfoSerenata', {idUsuario:idUsuario})
                .then(function(response) {
                console.log(response);
                return response.data;
                }, function(response) {
                // something went wrong
                console.log(response);
                response.data.error = true;
                return response.data;
                });
            },





        getItemsCategoria:function(idCategoria){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getItemsCategoria',{idCategoria:idCategoria})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


        getMensajes:function(idUser, idArtista){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getMensajes',{idUsuario:idUser, idArtista : idArtista, tipo: 1})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },




        getMensajess:function(idUser, idArtista){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getMensajes',{idUsuario:idUser, idArtista : idArtista, tipo: 2})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },



        enviarMensaje:function(idEmisor, idReceptor, texto){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/enviarMensaje',{idEmisor:idEmisor, idReceptor : idReceptor, textoMensaje: texto})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


     
            cancelarPostularme:function(datos){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/cancelarPostularme',datos)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
           // response.data.error = true;
            return response;
            });
        },



                postularArtista:function(datos){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/postularArtista',datos)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
           // response.data.error = true;
            return response;
            });
        },


                confirmarArtista:function(idArtista, idPublicacion,idUsuario){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/confirmarArtista',{idArtista:idArtista, idPublicacion:idPublicacion, idUsuario:idUsuario })
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
           // response.data.error = true;
            return response;
            });
        },


        

                        verificarInteresados:function(datos){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/verificarInteresados',{idPublicacion : datos})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },

            confirmarEvento:function(idEvento){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/confirmarEvento',{idEvento : idEvento})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },


            cancelarEvento:function(idEvento){  

            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/cancelarEvento',{idEvento : idEvento})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
            response.data.error = true;
            return response.data;
            });
        },





            getEventosAgendados:function(idArtista,tipo){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getEventosAgendados',{idArtista : idArtista, tipo:tipo})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },


            getAnuncios:function(idUsuario){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getAnuncios',{idUsuario : idUsuario})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },


                    getAnunciosTodos:function(){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getAnunciosTodos')
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },

            getInfoPerfil:function(idArtista){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/getInfoPerfil',{idArtista : idArtista})
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },

                            agendarEvento:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/agendarEvento',data)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },

                    actualizarPerfil:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/actualizarPerfil',data)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        },


        actualizarFechaEvento:function(data){
            return  $http.post(serverConfig.url+'/TUSERENATA/v1/index.php/actualizarFechaEvento',data)
            .then(function(response) {
                console.log(response);
            return response.data;
            }, function(response) {
            // something went wrong
               console.log(response);
          //  response.data.error = true;
            var ew = {};
            ew.error=true;
            return ew;
            });
        }








    }

    })


