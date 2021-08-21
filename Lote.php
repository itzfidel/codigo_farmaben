<?php
include 'Conexion.php';
class Lote{
     var $objetos;
     public function __construct(){
         $db= new Conexion();
         $this->acceso=$db->pdo;
     }
     function crear($id_producto,$proveedor,$stock,$vencimiento){
        $sql="INSERT INTO lote(stock,vencimiento,lote_id_prod,lote_id_prov) values (:stock,:vencimiento,:id_producto,:id_proveedor)";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':stock'=>$stock,'vencimiento'=>$vencimiento,'id_producto'=>$id_producto,'id_proveedor'=>$proveedor));
        echo 'add';
     }
     function buscar(){
        if(!empty($_POST['consulta'])){
           $consulta=$_POST['consulta'];
           $sql="SELECT id_lote,stock, vencimiento, concentracion, adicional, producto.nombre as prod_nom, laboratorio.nombre as lab_nom, tipo_producto.nombre as tip_nom, presentacion.nombre as pre_nom, proveedor.nombre as proveedor, producto.avatar as logo
           FROM lote
           join proveedor on lote_id_prov=id_proveedor
           join producto on lote_id_prod=id_producto
           join laboratorio on prod_lab=id_laboratorio
           join tipo_producto on prod_tip_prod=id_tip_prod
           join presentacion on prod_present=id_presentacion and producto.nombre like :consulta order by producto.nombre limit 25;";
           $query = $this->acceso->prepare($sql);
           $query->execute(array(':consulta'=>"%$consulta%"));
           $this->objetos=$query->fetchall();
           return $this->objetos;
        }
        else{ 
            $sql="SELECT id_lote,stock, vencimiento, concentracion, adicional, producto.nombre as prod_nom, laboratorio.nombre as lab_nom, tipo_producto.nombre as tip_nom, presentacion.nombre as pre_nom, proveedor.nombre as proveedor, producto.avatar as logo
            FROM lote
            join proveedor on lote_id_prov=id_proveedor
            join producto on lote_id_prod=id_producto
            join laboratorio on prod_lab=id_laboratorio
            join tipo_producto on prod_tip_prod=id_tip_prod
            join presentacion on prod_present=id_presentacion and producto.nombre not like '' order by producto.nombre limit 25;";
            $query = $this->acceso->prepare($sql);
            $query->execute();
            $this->objetos=$query->fetchall();
            return $this->objetos;
        
        }
    }
    function editar($id,$stock){
        $sql="UPDATE lote SET stock=:stock where id_lote=:id";
        $query = $this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id,':stock'=>$stock));
        echo 'edit';
    }
    function borrar($id){
        $sql="DELETE FROM lote where id_lote=:id";
        $query=$this->acceso->prepare($sql);
        $query->execute(array(':id'=>$id));
        if(!empty($query->execute(array(':id'=>$id)))){
            echo 'borrado';
        }
        else{
            echo 'noborrado'; 
        }
    }
}
