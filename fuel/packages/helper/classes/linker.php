<?php
/**
 * Helper class for link replacing with anchors
 */
?>
<?php

namespace Helper;

class Linker
{
    /**
     * Finds links in text and changes them to anchors
     * @param string $text
     * @return string
     */
    public function _getFormatText($text)
    {
        $regex = '!(http|ftp|scp)(s)?:\/\/[a-zA-Z0-9.?&_/]+!';
        $linkString = '<a href="\\0">\\0</a>';
        return preg_replace($regex, $linkString, $text);
    }

}