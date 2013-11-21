<?php
if (isset($_GET['img'])) {
	$sImage = $_GET['img'];
	$aImage = explode('.',urldecode($sImage));
	$aSize = getimagesize($sImage);
	$sMime = $aSize['mime'];
}
$oImage = fopen($sImage, 'rb');
header("Content-Type: ".$sMime);
header("Content-Length: " . filesize($sImage));
fpassthru($oImage);
exit;
?>