<div class="content-1">
    <div class="uk-container uk-container-center">
        <h2 class="uk-h1"><?php //echo $pageTitle ?></h2>
        <div class="uk-grid venue-info">
            <div class="uk-width-7-10">
                <div class="uk-panel uk-panel-box">
                    <table class="uk-table tweets">
                        <thead>
                            <tr>
                                <th>Laiks/autors</th>
                                <th>Tvīts</th>
                            </tr>
                        </thead>
                        <tbody>
                        <?php $count = 0; foreach ($tweets as $tweet): ?>
                            <tr class="<?php echo $tweet['has_coordinates']['user_id'] ?>">
                                <td>
                                    <span><?php echo date('d.m.Y', $tweet['created_at']) ?></span>
                                    <span><a href="https://twitter.com/<?php echo $tweet['user']['screen_name'] ?>">
                                            <?php echo $tweet['user']['screen_name'] ?></a>
                                    </span>
                                </td>
                                <td><?php echo $tweet['has_coordinates']['user_id'] ?> <?php echo $tweet['text'] ?></td>
                            </tr>
                            <?php $count++; ?>
                        <?php endforeach; ?>
                        </tbody>
                    </table>
                    <button class="uk-button to-top" onclick="scrollToTop()">Uz augšu</button>
                </div>
            </div>
        </div>
    </div>
</div>