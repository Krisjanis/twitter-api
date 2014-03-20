<?php
function _topwords() {
    $view = new View (APP_PATH . 'views/template.phtml');
    $content = new View (APP_PATH . 'views/statistics/topwords.phtml');

    $words = new Words();
    $topWords = $words->getEachDayTopWords();
    $content->set('words', $topWords);
    $content->set('usedWords', _getWords());

    $pageTitle = "Biežāk lietotie vārdi";
    $view->set('pageTitle', $pageTitle);
    $view->set('content', $content->fetch());
    $view->dump();
}

function _getWords() {
    return array('šodien', 'diena', 'tikai', 'tagad', 'viņa', 'viņš', 'labrīt', 'mājās', 'laikam', 'ļoti', 'miegs', 'atkal,
                         mamma', 'kāds', 'tomēr', 'būtu', 'līdz', 'beidzot', 'paldies', 'skolu', 'dienu', 'viņi', 'filma', 'nakts,
                         gribu', 'tikko', 'vakarā', 'varbūt', 'patīk', 'vairāk', 'varētu', 'jāiet', 'dienas', 'viņu', 'kādu', 'tāds,
                         vismaz', 'rīts', 'vispār', 'drīz', 'jūtos', 'vienmēr', 'tāda', 'laiks', 'skolā', 'vienkārši', 'rīga', 'rīta,
                         darīt', 'labāk', 'kāpēc', 'mīlu', 'tieši', 'cilvēki', 'tiešām', 'mūsu', 'kurš', 'kāda', 'brokastis', 'laikā,
                         domāju', 'nebūs', 'šovakar', 'latvija', 'izskatās', 'nekā', 'tāpēc', 'kopā', 'forši', 'tāpat', 'stundas,
                         cilvēks', 'protams', 'iešu', 'treniņš', 'cerams', 'latvijas', 'sajūta', 'tādu', 'rudens', 'reizi', 'darbu,
                         reizi', 'atpakaļ', 'viņam', 'mājas', 'būšu', 'gribas', 'stjuarts', 'taču', 'nenāk', 'garīgais', 'galīgi,
                         rīgu', 'pēdējā', 'skolas', 'rīgas', 'vakariņas', 'gandrīz', 'iespējams', 'lūdzu', 'piektdien', 'tētis,
                         negribu', 'ātri', 'cilvēku', 'nakti', 'treniņu', 'viņai', 'pirmā', 'kādam', 'braucu', 'normāli', 'mazliet,
                         māsa', 'rīgā', 'pusdienas', 'dienā', 'viņas', 'pārāk', 'mājām', 'piektdiena', 'latvijā', 'domā', 'kamēr,
                         vakara', 'ātrāk', 'pilnīgi', 'jautri', 'spēle', 'nesaprotu', 'braukt', 'manā', 'šķiet', 'nedēļas', 'vietā,
                         nebūtu', 'sestdien', 'draugi', 'skatīties', 'brālis', 'cilvēkiem', 'dzīve', 'klāt', 'pirmdiena', 'sapratu,
                         viņiem', 'jābūt', 'jāsāk', 'nopietni', 'interesanti', 'ziņas', 'brauc', 'bildes', 'nedēļa', 'sēžu', 'tādi,
                         redzēt', 'slikts', 'reāli', 'dzimšanas', 'šeit', 'īpaši', 'gadu', 'pāris', 'grūti', 'vakaru', 'vētra', 'arlabunakti,
                         tajā', 'negribas', 'iespēja', 'vēlāk', 'meitenes', 'jābrauc', 'tādas', 'stundu', 'nepatīk', 'jūtu', 'ielā,
                         brīvdienas', 'īsti', 'valsts', 'ciemos', 'šajā', 'naktī', 'savādāk', 'lāčplēša', 'nedēļu', 'kādas', 'savā,
                         pirmdien', 'dzīvē', 'dziesmu', 'liels', 'jauns', 'telefonu', 'latviešu', 'uzreiz', 'sāku', 'krievu', 'mācīties,
                         vajadzētu', 'mācos', 'izmēģini', 'iedomājieties', 'forša', 'vārda', 'virtuālā', 'lekcija', 'reisā', 'tevis,
                         tālāk', 'dzīvi', 'pavisam', 'priekš', 'mammu', 'dziesma', 'itkā', 'saprotu', 'draugiem', 'jauna', 'gultā,
                         joprojām', 'besī', 'māju', 'runā', 'pirmais', 'spēlē', 'saprast', 'tiekamies', 'tūlīt', 'sākas', 'šobrīd,
                         pareizi', 'jautājums', 'darbā', 'galvenais', 'priekšā', 'jaunu', 'šonakt', 'citi', 'angļu', 'gribētu,
                         šodienas', 'gribās', 'bijām', 'vienā', 'varēšu', 'ejam', 'šoreiz', 'māsu', 'spēles', 'reizes', 'gāja', 'kurā,
                         augšā', 'neiet', 'spēli', 'pagaidām', 'pavadīta', 'paši', 'trīs', 'filmas', 'galā', 'jūsu', 'mūzika', 'izrādās,
                         kādi', 'lieliska', 'līdzi', 'cikos', 'sanāca', 'lieliski', 'gribēju', 'meitene', 'jaunā', 'aizmigt', 'šodiena,
                         jāceļas', 'šorīt', 'ziņu', 'izdevusies', 'pasaules', 'brīvlaiks', 'vakardienas', 'vajadzēja', 'labākais,
                         dzīvot', 'kādreiz', 'nozīmē', 'garām', 'beigās', 'mūziku', 'naudu', 'jādodas', 'lekciju', 'likās', 'gultas,
                         vaļā', 'dzīves', 'twitterspēks', 'kārtīgi', 'redzēju', 'dziesmas', 'cilvēkus', 'sirds', 'varēs', 'tātad,
                         vienīgais', 'pašu', 'piemēram', 'rakstīt', 'valodā', 'kājas', 'sanāk', 'kapēc', 'būsi', 'liela', 'koncerts,
                         vārdu', 'zināt', 'brāli', 'ziema', 'pasaulē', 'ideāli', 'nogurums', 'agrāk', 'skaidrs', 'vējš', 'negrib,
                         ceturtdien', 'skaisti', 'šito', 'izdarīt');
}