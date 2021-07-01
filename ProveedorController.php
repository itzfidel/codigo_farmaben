<?php
include '../modelo/Proveedor.php';
$proveedor = new Proveedor();
if($_POST['funcion']=='crear'){
    $nombre = $_POST['nombre'];
    $telefono = $_POST['telefono'];
    $movil = $_POST['movil'];
    $correo = $_POST['correo'];
    $direccion = $_POST['direccion'];
    $avatar = 'prov_default.png';

    $proveedor->crear($nombre,$telefono,$movil,$correo,$direccion,$avatar);
}
?>