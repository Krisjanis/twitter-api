<table class="hidden uk-table uk-width-1-2 uk-table-hover">
    <thead>
        <tr>
            <th>Vieta</th>
            <th>Ziņa</th>
            <th>Skaits</th>
        </tr>
    </thead>
    <tbody>
    <?php $counter = 1; foreach ($retweets as $retweet): ?>
        <tr>
            <td class="uk-width-1-10"><?php echo $counter; $counter++; ?>.</td>
            <td class="uk-width-7-10"><?php echo $retweet["text"] ?></td>
            <td class="uk-width-2-10"><?php echo $retweet["count"] ?></td>
        </tr>
    <?php endforeach; ?>
    </tbody>
</table>