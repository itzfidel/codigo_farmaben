$(document).ready(function(){
    $('#aviso').hide();
    $('#aviso1').hide();
    $('#form-recuperar').submit(e=>{
        $('#aviso').hide();
        $('#aviso1').hide();
        Mostrar_Loader('Recuperar_password');
        let email = $('#email-recuperar').val();
        let dni = $('#dni-recuperar').val();
        if(email==''|| dni==''){
            $('#aviso').show();
            $('#aviso').text('Rellene todos los campos');
            Cerrar_Loader("");
        }
        else{
            $('#aviso').hide();
            let funcion='verificar';
            $.post('../controlador/recuperar.php',{funcion,email,dni},(response)=>{
                response = response.trim();
                
                if(response=='encontrado'){
                    let funcion='recuperar';
                    $('#aviso').hide();
                    $.post('../controlador/recuperar.php',{funcion,email,dni},(response2)=>{
                        response = response.trim()

                        $('#aviso').hide();
                        $('#aviso1').hide();
                                          
                        if(response2=='enviado'){
                            Cerrar_Loader('exito_envio');
                            $('#aviso1').show();
                            $('#aviso1').text('se restablecio la contrasena');
                            $('#form-recuperar').trigger('reset');
                        }
                        else{
                            Cerrar_Loader('error_envio');
                            $('#aviso').show();
                            $('#aviso').text('no se pudo restablecer');
                            $('#form-recuperar').trigger('reset');
                        }
                    })
                }
                else{
                    Cerrar_Loader('error_usuario');
                    $('#aviso').hide();
                    $('#aviso1').hide();
                    $('#aviso').show();
                    $('#aviso').text('El correo y el dni no se encuentran asociados o no estan registrados en el sistema');
                }
            })
        }
        e.preventDefault();
    })

    function Mostrar_Loader(Mensaje){
        var texto = null;
        var mostrar = false;
        switch (Mensaje) {
            case 'Recuperar_password':
            texto = 'Se esta enviando el correo, por favor espere...';
            mostrar = true;
            break;
        }
        if(mostrar){
            Swal.fire({
                
                title: 'Enviando correo',
                text: texto,
                showConfirmButton: false
              })
        }
    }
    function Cerrar_Loader(Mensaje){
        var tipo = null;
        var texto = null;
         var mostrar = false;
        switch (Mensaje) {
            case 'exito_envio':
                tipo='success';
                texto = 'El correo fue enviado correctamente.';
                mostrar = true;
                break;
                case 'error_envio':
                tipo='error';
                texto = 'El correo no puede enviarse, por favor intente de nuevo.';
                mostrar = true;
                break;
                case 'error_usuario':
                    tipo='error';
                    texto = 'El usuario perteneciente a estos datos no fue encontrado.';
                    mostrar = true;
                    break;

            default:
                swal.close();
                break;
            }
            if(mostrar){
                Swal.fire({
                    position: 'center',
                    icon: tipo,
                    text: texto,
                    showConfirmButton: false
                  })
            }
    }
})