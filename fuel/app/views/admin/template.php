<html>
    <head>
        <title>Letiņš tvīto<?php echo isset($title) ? $title : '' ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <?php echo Asset::css('uikit.css') ?>
        <?php echo Asset::css('style.css') ?>
        <?php echo Asset::css('admin.css') ?>
        <?php echo Asset::js('jquery-1.9.1.min.js') ?>
        <?php echo Asset::js('charts/knockout-2.2.1.js') ?>
        <?php echo Asset::js('charts/globalize.min.js') ?>
        <?php echo Asset::js('charts/dx.chartjs.js') ?>
        <?php echo Asset::js('functions.js') ?>
    </head>
    <body>
        <div class="wrapper <?php echo isset($customClass) ? $customClass : '' ?>">
            <!-- HEADER -->
            <noscript><i class="uk-icon-warning-sign"></i> Nu Tu gan iebrauci auzās, Tev nestrādā javascript, tāpēc arī mūsu lapa nestrādās <i class="uk-icon-frown"></i></noscript>
            <nav class="uk-navbar uk-navbar-attached">
                <div class="uk-container uk-container-center">
                    <ul class="main-nav uk-float-left">
                        <li><?php echo Html::anchor('admin', 'Panelis', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('/', 'Vietne', array('class' => 'nav-item last')) ?></li>
                    </ul>
                    <ul class="main-nav uk-float-right">
                        <li><?php echo Html::anchor('admin/logout', 'Iziet', array('class' => 'nav-item last')) ?></li>
                        <li><span class="nav-username"><?php echo \Auth::get('username') ?></span></li>
                    </ul>
                </div>
            </nav>
            <!-- CONTENT -->
            <?php if (isset($content)): ?>
                <div class="content">
                    <?php echo $content ?>
                </div>
            <?php endif; ?>
            <!-- FOOTER -->
            <div class="footer">
                <div class="uk-container uk-container-center">
                    <span>Letiņš tvīto @ 2014</span><br />
                    <span class="footer-item"><i class="uk-icon-linux"></i></span>
                    <a class="footer-item last" href="https://github.com/Krisjanis/twitter-api"><i class="uk-icon-github"></i></a>
                </div>
            </div>
        </div>
    </body>
</html>
