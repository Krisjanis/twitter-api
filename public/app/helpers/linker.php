<?php
class linker {
    function replaceUrl($string) {
        $regex = '!(http|ftp|scp)(s)?:\/\/[a-zA-Z0-9.?&_/]+!';
        $linkString = '<a href="\\0">\\0</a>';
        return preg_replace($regex, $linkString, $string);
    }
}