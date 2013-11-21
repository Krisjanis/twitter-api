<html>
<head>
    <title>Tvitstat</title>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="../assets/css/uikit.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/style.css">
    <script src="../assets/js/charts/jquery-1.9.1.min.js"></script>
    <script src="../assets/js/charts/knockout-2.2.1.js"></script>
    <script src="../assets/js/charts/globalize.min.js"></script>
    <script src="../assets/js/charts/dx.chartjs.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
</head>
<body>
<?php
// Find out what file to load
$base_uri = $_SERVER['REQUEST_URI'];
if (($base_uri == '') || $base_uri == '/' || $base_uri == '/public/') $base_uri = 'default';
$file = $base_uri . '.php';

$con = new mysqli('127.0.0.1', 'root', 'CvjWToO7', 'twitter');
$con->set_charset('utf8');

$base_url = 'http://'. $_SERVER['SERVER_ADDR'] . $_SERVER['REQUEST_URI'];
?>
<div class="wrapper">
    <!-- HEADER -->
    <nav class="uk-navbar uk-navbar-attached">
        <div class="uk-container uk-container-center">
            <ul class="main-nav uk-float-right">
                <li><a href="<?php echo $base_url ?>coordinates" class="uk-button uk-button-primary uk-button-large">Vietas</a></li>
            </ul>
        </div>
    </nav>
    <!-- CONTENT -->
    <div class="content uk-container uk-container-center">
    <?php
        if (file_exists($file))
        {
            include_once($file);
        }
        else
        {
            include_once('default.php');
        }
    ?>
    </div>
    <!-- FOOTER -->

</div>
</body>
</html>
