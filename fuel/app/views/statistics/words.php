<div class="content-1">
    <div class="uk-container uk-container-center">
        <h2 class="uk-h1">Biežāk lietotie vārdi</h2>
        <div class="clear top-words-wrapper">
            <div>
                <?php foreach($words as $day): ?>
                    <div class="top-words uk-panel-box">
                        <?php $top = 1 ?>
                        <span class="uk-text-info"><?php echo date('d-m-Y', $day['date']) ?></span>
                        <?php foreach (unserialize(html_entity_decode($day['words'])) as $word => $count): ?>
                            <span top="<?php echo $top ?>"
                                  data-uk-tooltip title="<?php echo $count ?>"
                                  class="word<?php if (in_array($word, $usedWords)) { echo ' used'; } ?>">
                                <?php echo $word ?>
                            </span>
                            <?php $top++; ?>
                        <?php endforeach; ?>
                        <div class="count"></div>
                    </div>
                <?php endforeach; ?>
            </div>
            <button class="btn prev" type="button"><i class="uk-icon-chevron-left"></i> Atpakaļ</button>
            <button class="btn next" type="button" disabled>Tālāk <i class="uk-icon-chevron-right"></i></button>
        </div>
    </div>
</div>