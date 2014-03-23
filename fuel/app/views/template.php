<html>
    <head>
        <title>Letiņš tvīto<?php echo isset($title) ? $title : '' ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <?php echo Asset::css('uikit.css') ?>
        <?php echo Asset::css('style.css') ?>
        <?php echo Asset::js('jQuery-1.9.1.min.js') ?>
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
                    <?php echo Html::anchor('welcome', 'Letiņš tvīto', array('class' => 'uk-navbar-brand uk-float-left')) ?>
                    <ul class="main-nav uk-float-right">
                        <li><?php echo Html::anchor('welcome', 'Sākums', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('coordinates', 'Vietas', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('tops', 'Topi', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('statistics', 'Statistika', array('class' => 'nav-item')) ?></li>
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
                    <span>Letiņš @ 2014</span><br />
                    <span class="footer-item">Lepni darbojas uz Ubuntu <i class="uk-icon-linux"></i></span>
                    <a class="footer-item last" href="https://github.com/Krisjanis/twitter-api"><i class="uk-icon-code-fork"></i> Sadur ar dakšiņu mūs Githubā <i class="uk-icon-github"></i></a>
                </div>
            </div>
        </div>
    </body>
</html>