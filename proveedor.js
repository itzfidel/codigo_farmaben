$(document).ready(function(){
    var funcion;

    $('#form-crear').submit(e=>{
        let nombre= $('#nombre').val();
        let telefono= $('#telefono').val();
        let movil= $('#movil').val();
        let correo= $('#correo').val();
        let direccion= $('#direccion').val();
        funcion='crear';
        $.post('../controlador/ProveedorController.php',{nombre,telefono,movil,correo,direccion,funcion},(response)=>{
            console.log(response);
        });
        e.preventDefault();
    });
});