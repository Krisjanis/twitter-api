<div class="venueInfo">
    <h2>
        <?php if (isset($venue['categories'][0]['icon']['prefix']) && isset($venue['categories'][0]['icon']['suffix'])): ?>
            <img class="category" src="<?php echo $venue['categories'][0]['icon']['prefix'] . 'bg_32' . $venue['categories'][0]['icon']['suffix']; ?>"/>
        <?php endif; ?>
        <?php if (isset($venue['name'])) echo $venue['name']; ?>
    </h2>
    <p>
        <span><?php if (isset($venue['location']['city'])) echo $venue['location']['city']; ?></span>
        <span><?php if (isset($venue['location']['state'])) echo $venue['location']['state']; ?></span>
        <span><?php if (isset($venue['location']['country'])) echo $venue['location']['country']; ?></span>
    </p>
    <p><?php if (isset($venue['categories'][0]['name'])) echo $venue['categories'][0]['name']; ?></p>
    <p><?php echo 'Tweets: ' . $venue['pointCount'] ?></p>
    <?php if (isset($venue['stats']['checkinsCount'])): ?>
        <p><?php echo 'Foursquare checkins: ' . $venue['stats']['checkinsCount']; ?></p>
    <?php endif; ?>
    <?php if (isset($venue['stats']['usersCount'])): ?>
        <p><?php echo 'Foursquare users: ' . $venue['stats']['usersCount']; ?></p>
    <?php endif; ?>
    <?php if (isset($venue['venueId'])): ?>
        <?php $venueName = (isset($venue['name']) ? $venue['name'] : $venue['latlng']); ?>
        <p><?php echo Html::anchor('coordinates/venueinfo/?pointid=' .
                      $venue['venueId'] . '&name=' . urlencode($venueName) .
                      '&users=10&tweets=10', 'Statistika par šo vietu') ?></p>
    <?php endif; ?>
    <?php if(isset($venue['id'])): ?>
        <p><a href="https://foursquare.com/v/<?php echo $venue['id'] ?>">foursquare</a></p>
    <?php endif; ?>
    <?php if (isset($venue['url'])): ?>
        <p><a href="<?php echo $venue['url'] ?>"><?php echo $venue['url'] ?></a></p>
    <?php endif; ?>
</div>