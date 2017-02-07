<?php
$directory = "stylesheets";

require "scss.inc.php";
scss_server::serveFrom($directory);
?>