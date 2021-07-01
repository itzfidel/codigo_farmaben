<?php
include 'Conexion.php';
class Proveedor{
     var $objeto;
     public function __construct(){
         $db= new Conexion();
         $this->acceso=$db->pdo;
     }
     function crear($nombre,$telefono,$movil,$correo,$direccion,$avatar){
        $sql="SELECT id_proveedor FROM proveedor where nombre=:nombre";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':nombre'=>$nombre));
        $this->objetos=$query->fetchall();
        if(!empty($this->objetos)){
            echo 'noadd';
        }
        else{
            $sql="INSERT INTO proveedor(nombre,telefono,movil,correo,direccion,avatar) values (:nombre,:telefono,:movil,:correo,:direccion,:avatar);";
            $query = $this->acceso->prepare($sql);
            $query->execute(array(':nombre'=>$nombre,':avatar'=>$avatar,':telefono'=>$telefono,':movil'=>$movil,':correo'=>$correo,':direccion'=>$direccion));    
            echo 'add';
        }
    } 
    function buscar(){
        if(!empty($_POST['consulta'])){
           $consulta=$_POST['consulta'];
           $sql="SELECT * FROM laboratorio where nombre LIKE :consulta";
           $query = $this->acceso->prepare($sql);
           $query->execute(array(':consulta'=>"%$consulta%"));
           $this->objetos=$query->fetchall();
           return $this->objetos;
        }
        else{
            $sql="SELECT * FROM laboratorio where nombre NOT LIKE '' ORDER BY id_laboratorio LIMIT 25";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        
        }
    }
}
?>