<table class="uk-table uk-width-1-2 uk-table-hover">
    <thead>
        <tr>
            <th>Vieta</th>
            <th>Hashtag</th>
            <th>Skaits</th>
        </tr>
    </thead>
    <tbody>
        <?php $i = 1; foreach ($hashtags as $hashtag): ?>
            <tr>
                <td class="uk-width-1-10"><?php echo $i++; ?>.</td>
                <td class="uk-width-7-10"><?php echo $hashtag["hashtag"] ?></td>
                <td class="uk-width-2-10"><?php echo $hashtag["count"] ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>