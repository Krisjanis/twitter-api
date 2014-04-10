<?php $url = Uri::current() . '/?' . $_SERVER['QUERY_STRING'] ?>
<div class="content-1">
    <div class="uk-container uk-container-center">
        <h2 class="uk-h1"><?php echo $venueName ?></h2>
        <div class="uk-grid venue-info">
            <div class="uk-width-3-10">
                <div class="uk-panel uk-panel-box">
                    <table class="uk-table users">
                        <thead>
                            <tr>
                                <th>Tvītu skaits</th>
                                <th>Lietotājs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php $count = 0; foreach ($users as $user): ?>
                                <tr class="<?php echo $user['user_id'] ?>">
                                    <td class="count"><?php echo $user['count'] ?></td>
                                    <?php $screenName = $user['screen_name'] ?>
                                    <td>
                                        <a href="https://twitter.com/<?php echo $screenName ?>">
                                            <img src="<?php echo $user['image_url'] ?>"/>
                                            <span><?php echo $screenName ?></span>
                                        </a>
                                    </td>
                                </tr>
                                <?php $count++; ?>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                    <button class="uk-button" type="button" onclick="loadVenueData(this, 'usersfrom', 'users')"
                            data-count="<?php echo $count ?>"
                            data-load-link="<?php echo $url ?>"
                            data-max-count="<?php echo $usersCount ?>">Ielādēt vēl
                    </button>
                    <button class="uk-button to-top" onclick="scrollToTop()">Uz augšu</button>
                </div>
            </div>
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
                            <?php $linker = new Helper\Linker; ?>
                            <?php $count = 0; foreach ($tweets as $tweet): ?>
                                <tr class="<?php echo $tweet['has_coordinates']['user_id'] ?>">
                                    <td>
                                        <span><?php echo date('d.m.Y', $tweet['created_at']) ?></span>
                                        <span><a href="https://twitter.com/<?php echo $tweet['user']['screen_name'] ?>">
                                                <?php echo $tweet['user']['screen_name'] ?></a>
                                        </span>
                                    </td>
                                    <td><?php echo $linker->_getFormatText($tweet['text']) ?></td>
                                </tr>
                                <?php $count++; ?>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                    <button class="uk-button" type="button" onclick="loadVenueData(this, 'tweetsfrom', 'tweets')"
                            data-count="<?php echo $count ?>"
                            data-load-link="<?php echo $url ?>"
                            data-max-count="<?php echo $tweetsCount ?>">Ielādēt vēl
                    </button>
                    <button class="uk-button to-top" onclick="scrollToTop()">Uz augšu</button>
                </div>
            </div>
        </div>
    </div>
</div>