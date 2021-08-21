$(document).ready(function(){
    let funcion="listar";
    

    $('#tabla_venta').dataTable( {
            "ajax":{
                "url": "../controlador/VentaController.php",
                "method": "POST",
                "data":{funcion:funcion}
            },
            "columns": [
                { "data": "id_venta" },
                { "data": "fecha" },
                { "data": "cliente" },
                { "data": "dni" },
                { "data": "total" },
                { "data": "vendedor" }
            ]
        } );
})