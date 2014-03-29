<div class="content-1">
    <div class="uk-container uk-container-center">
        <h2 class="uk-h1">Vispārējā informācija</h2>
        <p class="statistic">
            Letiņš Tvītiņš ir sistēma, kas veic
            <span class="highlight-badge">Latvijas</span>
            <span class="highlight-badge">twitter</span>
            verses analīzi un
            <span class="highlight-badge">statistiku</span>
        </p>
        <p class="statistic">
            Sistēma ir atradusi
            <span class="highlight-badge"><?php echo isset($totalUsersCount) ? $totalUsersCount : '' ?></span>
            latviešu
            <span class="highlight-badge">lietotājus</span>
        </p>
        <p class="statistic">
            Pēdējā mēnesī sistēma ir savākusi
            <span class="highlight-badge"><?php echo isset($lastMonthTweetCount) ? $lastMonthTweetCount : '' ?></span>
            unikālu <span class="highlight-badge">tvītu</span>
        </p>
        <p class="statistic">
            Kopā savākti
            <span class="highlight-badge"><?php echo isset($totalTweetCount) ? $totalTweetCount : '' ?></span>
            unikālu tvītu
        </p>
        <p class="statistic">
            Visaktīvākā diena ir bijusi
            <span class="highlight-badge"><?php echo isset($maxTweets['date']) ? $maxTweets['date'] : '' ?></span>
            ar <span class="highlight-badge"><?php echo isset($maxTweets['count']) ? $maxTweets['count'] : '' ?></span>
            tvītiem
        </p>
        <p class="statistic">
            Ņem vērā, ka sistēma māk meklēt tikai
            <span class="highlight-badge">publiskus</span>
            lietotājus!
        </p>
    </div>
</div>
<div class="content-2">
    <div class="uk-container uk-container-center">
        <h2 class="uk-h1">Pēdējo nedēļu aktivitāte</h2>
        <script type="text/javascript">
            $(function() {
                $('#chartContainerWeek').dxChart({
                    dataSource: [
                        <?php foreach ($tweetCountByTwoWeeks as $day): ?>
                        { day: "<?php echo $day['day'] ?>",
                          count: <?php echo $day['count_this'] ?>,
                          count_previous: <?php echo $day['count_previous'] ?> },
                        <?php endforeach; ?>

                    ],
                    commonSeriesSettings: {
                        type: 'spline',
                        argumentField: 'day',
                        width: 5,
                        hoverStyle: {
                            width: 7
                        }
                    },
                    commonAxisSettings: {
                        grid: {
                            visible: true
                        }
                    },
                    series: [
                        { valueField: 'count', name: 'Šī nedēļa', color: '#0779A6' },
                        { valueField: 'count_previous', name: 'Iepriekšējā nedēļa', color: '#3BA9D3' }
                    ],
                    tooltip:{
                        enabled: true
                    },
                    legend: {
                        verticalAlignment: 'bottom',
                        horizontalAlignment: 'center'
                    },
                    commonPaneSettings: {
                        border:{
                            visible: true,
                            bottom: true
                        }
                    }
                });
            });
        </script>
        <div id="chartContainerWeek"></div>
    </div>
</div>
<div class="content-1">
    <div class="uk-container uk-container-center">
        <h2 class="uk-h1">Lietotāju aktivitāte no sistēmas sākuma</h2>
        <script type="text/javascript">
            $(function() {
                $('#chartContainer').dxChart({
                    dataSource: [
                        <?php foreach ($tweetCountByDay as $key => $day): ?>
                        {day: "<?php echo $day['date'] ?>", count: <?php echo $day['count'] ?>},
                        <?php endforeach; ?>

                    ],
                    series: {
                        argumentField: 'day',
                        valueField: 'count',
                        name: 'Tvītu skaits',
                        type: 'bar',
                        color: '#0779A6'
                    },
                    legend: {
                        verticalAlignment: 'bottom',
                        horizontalAlignment: 'center'
                    },
                    tooltip:{
                        enabled: true
                    }
                });
            });
        </script>
        <div id="chartContainer"></div>
    </div>
</div>
