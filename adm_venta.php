<?php
session_start();
if($_SESSION['us_tipo']==3||$_SESSION['us_tipo']==1){
include_once 'layouts/header.php';
?>

  <title>Adm | Gestion Ventas</title>
  <!-- tell the browser to be responsive to screen width -->
<?php
include_once 'layouts/nav.php';
?>
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Gestion Ventas </h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="adm_catalogo.php">Home</a></li>
              <li class="breadcrumb-item active">Gestion Ventas</li>
            </ol>
          </div>
        </div>
      </div><!-- /.container-fluid -->
    </section>
    <section>
        <div class="container-fluid">
            <div class="card card-secondary">
                <div class="card-header">
                   <h3 class="card-title">Buscar Ventas</h3>
                   
                </div>
                <div class="card-body">
                <table id="tabla_venta" class="display table table-hover text-nowrap" style="width:100%">
        <thead>
            <tr>
                <th>Codigo</th>
                <th>Fecha</th>
                <th>Cliente</th>
                <th>DNI.</th>
                <th>Total</th>
                <th>Vendedor</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
                </div>
                <div class="card-footer">

                </div>
            </div>
        </div>
   </section>
  </div>
  <!-- /.content-wrapper -->
<?php
include_once 'layouts/footer.php';
}
else{
    header('Location: ../index.php');
}
?>
<script src="../js/datatables.js"></script>
<script src="../js/Venta.js"></script>