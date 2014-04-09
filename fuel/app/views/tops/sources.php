<table class="hidden uk-table uk-width-1-2 uk-table-hover">
    <thead>
        <tr>
            <th>Vieta</th>
            <th>Nosaukums</th>
            <th>Skaits</th>
        </tr>
    </thead>
    <tbody>
        <?php $i = 1; foreach ($sources as $source): ?>
            <tr>
                <td class="uk-width-1-10"><?php echo $i; $i++; ?>.</td>
                <td class="uk-width-7-10"><?php echo $source["source"]; ?></td>
                <td class="uk-width-2-10"><?php echo $source["count"]; ?></td>
            </tr>
        <?php endforeach; ?>
    </tbody>
</table>