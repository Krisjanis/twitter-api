<table class="hidden uk-table uk-width-1-2 uk-table-hover">
    <thead>
        <tr>
            <th>Vieta</th>
            <th>Ziņa</th>
            <th>Skaits</th>
        </tr>
    </thead>
    <tbody>
        <?php $linker = new Helper\Linker; ?>
        <?php $i = 1; foreach ($retweets as $retweet): ?>
            <tr>
                <td class="uk-width-1-10"><?php echo $i; $i++; ?>.</td>
                <td class="uk-width-7-10"><?php echo $linker->_getFormatText($retweet["text"]) ?></td>
                <td class="uk-width-2-10"><?php echo $retweet["count"] ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>