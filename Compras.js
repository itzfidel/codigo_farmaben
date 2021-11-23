$(document).ready(function() {
    listar_compras();
    $('.select2').select2();
    rellenar_estado_pago();
    var datatable;

    function rellenar_estado_pago(){
        funcion = 'rellenar_estado';
        $.post('../controlador/EstadoController.php',{funcion},(response) => {
          //console.log(response);
          let estados = JSON.parse(response);
          let template ='';
          estados.forEach(estado=> {
            template += `
              <option value="${estado.id}" >${estado.nombre}</option>
            `
              }
  
          );
          $('#estado_compra').html(template);
        })
      }

    function listar_compras() {
        funcion = 'listar_compras';
        $.post('../controlador/ComprasController.php', {funcion}, (response) => {
            console.log(response);
            let datos = JSON.parse(response);
            datatable = $('#compras').DataTable({
                data: datos,
                "columns": [
                    { "data": "numeracion" },
                    { "data": "codigo" },
                    { "data": "fecha_compra" },
                    { "data": "fecha_entrega" },
                    { "data": "total" },
                    { "data": "estado" },
                    { "data": "proveedor" },
                    { "defaultContent": `<button class="imprimir btn btn-secondary"><i class="fas fa-print"></i></button>
                                        <button class="ver btn btn-info" type="button" data-toggle="modal" data-target="#vista_venta"><i class="fas fa-search"></i></button>
                                        <button class="editar btn btn-success" type="button" data-toggle="modal" data-target="#cambiarEstado"><i class="fas fa-pencil-alt"></i></button>` }
                ],
                "destroy": true,
                "language": espanol
            });
        })
    }
    $('#compras tbody').on('click', '.editar', function() {
        let datos = datatable.row($(this).parents()).data();
        let codigo = datos.codigo;
        codigo = codigo.split(' | ');
        let id = codigo[0];
        let estado = datos.estado;
        funcion = 'cambiarEstado';
        $('#id_compra').val(id);
        $.post('../controlador/EstadoController.php', {funcion, estado}, (response) => {
                let id_estado = JSON.parse(response);
                console.log(id_estado);
                $('#estado_compra').val(id_estado[0]['id']).trigger('change');
        })

    })
    $('#form-editar').submit(e => {
        let id_compra = $('#id_compra').val();
        let id_estado = $('#estado_compra').val();
        funcion = 'editarEstado';
        $.post('../controlador/ComprasController.php', {funcion, id_compra, id_estado}, (response) => {
            if (response == 'edit') {
                $('#form-editar').trigger('reset');
                $('#estado_compra').val('').trigger('change');
                $('#edit').hide('Slow');
                $('#edit').show(1000);
                $('#edit').hide(2000);
                listar_compras();
            } else {
                $('#noedit').hide('Slow');
                $('#noedit').show(1000);
                $('#noedit').hide(2000);
            }
        })
        e.preventDefault();
    })
    $('#compras tbody').on('click','.ver',function(){
        let datos = datatable.row($(this).parents()).data();
        let codigo = datos.codigo;
        codigo = codigo.split(' | ');
        let id = codigo[0];
        funcion="ver";
        $('#codigo_compra').html(datos.codigo);
        $('#fecha_compra').html(datos.fecha_compra);
        $('#fecha_entega').html(datos.fecha_entrega);
        $('#estado').html(datos.estado);
        $('#proveedor').html(datos.proveedor);
        $('#total').html(datos.total);
        $.post('../controlador/LoteController.php',{funcion,id},(response)=>{
            console.log(response);
            let registros = JSON.parse(response);
            let template="";
            $('#detalles').html(template);
            registros.forEach(registro => {
                template+=`
                <tr>
                    <td>${registro.numeracion}</td>
                    <td>${registro.codigo}</td>
                    <td>${registro.cantidad}</td>
                    <td>${registro.vencimiento}</td>
                    <td>${registro.precio_compra}</td>
                    <td>${registro.producto}</td>
                    <td>${registro.laboratorio}</td>
                    <td>${registro.presentacion}</td>
                    <td>${registro.tipo}</td>
                    
                </tr>
                `;
                $('#detalles').html(template);
            });
        })
    })
    $('#compras tbody').on('click','.imprimir',function(){
        let datos = datatable.row($(this).parents()).data();
        let codigo = datos.codigo;
        codigo = codigo.split(' | ');
        let id = codigo[0];
        funcion = 'imprimir';
        $.post('../controlador/ComprasController.php',{id, funcion},(response)=>{
          console.log(response);
          window.open('../pdf/pdf-compra-'+id+'.pdf','_blank');
        })
    }) 

    })
            let espanol = {
                "sProcessing": "Procesando...",
                "sLengthMenu": "Mostrar _MENU_ registros",
                "sZeroRecords": "No se encontraron resultados",
                "sEmptyTable": "Ningún dato disponible en esta tabla",
                "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                "sInfoPostFix": "",
                "sSearch": "Buscar:",
                "sUrl": "",
                "sInfoThousands": ",",
                "SLoadingRecords": "Cargando...",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                },
                "oAria": {
                    "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                    "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                },
                "buttons": {
                    "copy": "Copiar",
                    "colvis": "Visibilidad"
                }
            }; 
