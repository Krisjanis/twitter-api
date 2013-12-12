<?php
function _topwords() {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics/topwords.phtml');

    $words = new Words();
    $topWords = $words->getEachDayTopWords();
    $content->set('words', $topWords);

    $pageTitle = "Biežāk lietotie vārdi";
    $view->set('pageTitle', $pageTitle);
    $view->set('content', $content->fetch());
    $view->dump();
}