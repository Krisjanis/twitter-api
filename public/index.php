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
</head>
<body>
<?php
$con = new mysqli('127.0.0.1', 'twitter', 'CvjWToO7', 'twitter');
$con->set_charset('utf8');
?>
<div class="wrapper">
    <nav class="uk-navbar uk-navbar-attached">
        <div class="uk-container uk-container-center">
            <ul class="main-nav uk-float-right">
                <li><a href="" class="uk-button uk-button-primary uk-button-large">Pagaidām</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">te</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">nekā</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">vēl</a></li>
                <li><a href="" class="uk-button uk-button-primary uk-button-large">nav</a></li>
            </ul>
        </div>
    </nav>
    <div class="content uk-container uk-container-center">
        <h2 class="uk-h1">Vispārējā statistika</h2>
        <?php
        $existingCoord = $con->query("SELECT COUNT( DISTINCT user_id ) FROM tweets");
        $row = $existingCoord->fetch_row();
        ?>
        <p>Līdz šim sistēma ir savākusi <span class="uk-badge uk-badge-success"><?php echo $row[0] ?></span> unikālu lieotāju</p>

        <?php
        $existingCoord = $con->query("SELECT COUNT(id) FROM tweets");
        $row = $existingCoord->fetch_row();
        ?>
        <p>Līdz šim sistēma ir savākusi <span class="uk-badge uk-badge-success"><?php echo $row[0] ?></span> unikālu tvītu</p>

        <h2 class="uk-h1">Lietotāju aktivitāte no sistēmas sākuma</h2>
        <?php
            $existingCoord = $con->query("SELECT DATE( FROM_UNIXTIME( created_at ) ) AS DATE, COUNT( id ) AS id FROM tweets WHERE DATE( FROM_UNIXTIME( created_at ) ) < '2013-11-14' GROUP BY 1");
            $rows = $existingCoord->fetch_all();
        ?>
        <script type="text/javascript">
            $(function ()
                {
                    $("#chartContainer").dxChart({
                        dataSource: [
                            <?php foreach ($rows as $key => $row): ?>
                            {day: "<?php echo $row[0] ?>", oranges: <?php echo $row[1] ?>},
                            <?php endforeach; ?>
                            ],

                        series: {
                            argumentField: "day",
                            valueField: "oranges",
                            name: "Tvīti",
                            type: "bar",
                            color: '#45ada8'
                        }
                    });
                }

            );
        </script>
        <div id="chartContainer" style="width: 100%; height: 440px;"></div>
    </div>
</div>
</body>
</html>