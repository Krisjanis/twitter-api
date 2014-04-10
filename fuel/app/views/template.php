<html>
    <head>
        <title>Letiņš tvīto<?php echo isset($title) ? $title : '' ?></title>
        <meta charset="UTF-8">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <?php echo Asset::css('uikit.css') ?>
        <?php echo Asset::css('style.css') ?>
        <?php echo Asset::js('jquery-1.9.1.min.js') ?>
        <?php echo Asset::js('charts/knockout-2.2.1.js') ?>
        <?php echo Asset::js('charts/globalize.min.js') ?>
        <?php echo Asset::js('charts/dx.chartjs.js') ?>
        <?php echo Asset::js('functions.js') ?>
        <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>
        <?php echo Asset::js('markerclusterer.js') ?>
        <?php echo Asset::js('uikit.min.js') ?>
        <?php if ( ! Auth::check()): ?>
            <script>
              (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

              ga('create', 'UA-49317104-1', 'www.tvito.lv');
              ga('send', 'pageview');
            </script>
        <?php endif; ?>
    </head>
    <body>
        <div class="wrapper <?php echo isset($customClass) ? $customClass : '' ?>">
            <!-- HEADER -->
            <noscript><i class="uk-icon-warning-sign"></i> Nu Tu gan iebrauci auzās, Tev nestrādā javascript, tāpēc arī mūsu lapa nestrādās <i class="uk-icon-frown"></i></noscript>
            <nav class="uk-navbar uk-navbar-attached">
                <div class="uk-container uk-container-center">
                    <?php echo Html::anchor('/', 'Letiņš tvīto', array('class' => 'uk-navbar-brand uk-float-left')) ?>
                    <ul class="main-nav uk-float-right">
                        <li><?php echo Html::anchor('/', 'Sākums', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('coordinates', 'Vietas', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('tops', 'Topi', array('class' => 'nav-item')) ?></li>
                        <li><?php echo Html::anchor('statistics', 'Statistika', array('class' => 'nav-item')) ?></li>
                    </ul>
                </div>
            </nav>
            <!-- CONTENT -->
            <?php if (isset($content)): ?>
                <div class="content">
                    <?php if ($error = Session::get_flash('error')): ?>
                        <div class="uk-container uk-container-center">
                            <div class="uk-alert uk-alert-danger"><?php echo $error ?></div>
                        </div>
                    <?php endif; ?>
                    <?php if ($success = Session::get_flash('success')): ?>
                        <div class="uk-container uk-container-center">
                            <div class="uk-alert uk-alert-success"><?php echo $success ?></div>
                        </div>
                    <?php endif; ?>
                    <?php if ($notices = Session::get_flash('notice')): ?>
                        <div class="uk-container uk-container-center">
                            <?php foreach($notices as $notice): ?>
                                <div class="uk-alert"><?php echo $notice ?></div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
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
