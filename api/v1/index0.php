<?php
	require_once 'dbHelper.php';
	require_once 'Slim/Slim.php';

	\Slim\Slim::registerAutoloader();

	$app = new \Slim\Slim();
	$db = new dbHelper();

	// News
	$app->get('/news', function() {
		global $db;
		$rows = $db->select("news", "*", array());


		echoResponse(200, $rows);
	});

	// Distinct producers
	$app->get('/distinctProducers', function() {
		global $db;
		$rows = $db->select("producers", "producer", array());
		echoResponse(200, $rows);
	});

	// Distinct Vintages
	$app->get('/distinctVintages', function() {
		global $db;
		$orderByStr = "ORDER BY vintage";
		$rows = $db->select2("reviews", "DISTINCT vintage", array(), $orderByStr);
		echoResponse(200, $rows);
	});

	// Distinct scores
	$app->get('/distinctScores', function() {
		global $db;
		$orderByStr = "ORDER BY score";
		$rows = $db->select2("reviews r join scores s on r.scoreID = s.scoreID", "DISTINCT score", array(), $orderByStr);
		echoResponse(200, $rows);
	});

	// Articles
	$app->get('/articles', function() {
		global $db;
		$orderByStr = "ORDER BY hotItem DESC, myDate DESC LIMIT 4";
		$rows = $db->select2("news", "*", array(), $orderByStr);
		echoResponse(200, $rows);
	});

	// reviews
	$app->get('/reviews', function() {
		global $db;
		//$selectStr = "c.country, c.countryID, r.region, r.regionID, p.producer, p.producerID, p.folderName, w.wine, w.wineID, w.description, w.image, rev.vintage, rev.theDate, rev.link, rev.reviewID, sco.scoreID, sco.value, sco.score, pub.publication, pub.publicationID";
		// ADDED WINE IMAGE ABOVE $selectStr = "c.country, c.countryID, r.region, r.regionID, p.producer, p.producerID, p.folderName, w.wine, w.wineID, w.description, rev.vintage, rev.theDate, rev.link, rev.reviewID, sco.scoreID, sco.value, sco.score, pub.publication, pub.publicationID";
		//$fromStr = "countries c LEFT JOIN regions r ON c.countryID = r.countryID LEFT JOIN producers p ON r.regionID = p.regionID LEFT JOIN wines w ON p.producerID = w.producerID LEFT JOIN reviews rev ON w.wineID = rev.wineID LEFT JOIN scores sco ON rev.scoreID = sco.scoreID LEFT JOIN publications pub ON pub.publicationID = rev.publicationID";
		//$orderByStr = "ORDER BY reviewID";
		//$orderByStr = "ORDER BY rev.theDate";

		/*$selectStr = "p.producer, w.wine, r.vintage, s.score, pub.publication, r.theText, b.preview, r.theDate";
		$fromStr = "reviews r LEFT JOIN wines w ON w.wineID=r.wineID LEFT JOIN bottleshots b ON w.wineID=b.index LEFT JOIN producers p ON w.producerID=p.producerID LEFT JOIN scores s ON r.scoreID=s.scoreID LEFT JOIN publications pub ON r.publicationID=pub.publicationID";
		*/
		$selectStr = "c.country, c.countryID, r.region, r.regionID, p.producer, p.producerID, p.folderName, w.wine, w.wineID, w.image, rev.vintage, rev.theDate, rev.link, rev.reviewID, sco.scoreID, sco.value, sco.score, pub.publication, pub.publicationID";
		$fromStr = "countries c LEFT JOIN regions r ON c.countryID = r.countryID LEFT JOIN producers p ON r.regionID = p.regionID LEFT JOIN wines w ON p.producerID = w.producerID LEFT JOIN reviews rev ON w.wineID = rev.wineID LEFT JOIN scores sco ON rev.scoreID = sco.scoreID LEFT JOIN publications pub ON pub.publicationID = rev.publicationID";
		$orderByStr = "ORDER BY reviewID DESC LIMIT 10";
		$rows = $db->select2($fromStr, $selectStr, array(), $orderByStr);
		echoResponse(200, $rows);
	});

	// Latest reviews
	$app->get('/latestReviews', function() {
		global $db;
		$selectStr = "c.country, c.countryID, r.region, r.regionID, p.producer, p.producerID, p.folderName, w.wine, w.wineID, w.image, rev.vintage, rev.theDate, rev.link, rev.reviewID, sco.scoreID, sco.value, sco.score, pub.publication, pub.publicationID";
		$fromStr = "countries c LEFT JOIN regions r ON c.countryID = r.countryID LEFT JOIN producers p ON r.regionID = p.regionID LEFT JOIN wines w ON p.producerID = w.producerID LEFT JOIN reviews rev ON w.wineID = rev.wineID LEFT JOIN scores sco ON rev.scoreID = sco.scoreID LEFT JOIN publications pub ON pub.publicationID = rev.publicationID";
		$orderByStr = "ORDER BY reviewID DESC LIMIT 12";
		$rows = $db->select2($fromStr, $selectStr, array(), $orderByStr);
		echoResponse(200, $rows);
	});

	// Pulls Winery Information
	$app->get('/winery/:id', function($id) {
		global $db;
		$selectStr = "w.websiteLink, p.producerID, p.producer, p.folderName, pi.description, pi.quickFacts, r.region, c.country, wv.address, wv.contact, wv.directions, wv.email, wv.phone, wv.tastings, wv.days, wv.appointment, wv.fees, wv.english, wv.city";
		$fromStr = "whatsvisible w LEFT JOIN producers p ON w.producerID = p.producerID LEFT JOIN wineryvisits wv on wv.producerID = p.producerID LEFT JOIN pageindex pi on p.producerID = pi.producerID LEFT JOIN regions r ON r.regionID = p.regionID LEFT JOIN countries c ON c.countryID = r.countryID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls wines for a winery Information
	$app->get('/wines/:id', function($id) {
		global $db;
		//$selectStr = "*";
		$selectStr = "DISTINCT p.*, vi.grape, vi.region, vi.vineyard, vi.exposure, vi.altitude, vi.soil, vi.vtrain, vi.production, vi.vinproc, alc.alc, m.notes, m.maker, m.cellaring, m.closure, m.pairing, b.volume, bs.*";
		//$fromStr = "producers p LEFT JOIN wines2 w on p.producerID = w.ProducerID LEFT JOIN vintage vi on w.wineid = vi.wineID left join alc on w.wineid = alc.wineID left join maker m on w.wineid = m.wineID left join bottles b on w.wineid = b.wineID left join supplier s on w.wineid = s.wineid left join bottleshots bs on w.bs = bs.index";
		$fromStr = "producers p LEFT JOIN wines2 w on p.producerID = w.ProducerID LEFT JOIN vintage vi on w.wineid = vi.wineID left join alc on w.wineid = alc.wineID left join maker m on w.wineid = m.wineID left join bottles b on w.wineid = b.wineID left join supplier s on w.wineid = s.wineid left join bottleshots bs on w.bs = bs.index";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls reviews for a winery Information
	$app->get('/reviews/:id', function($id) {
		global $db;
		$selectStr = "c.country, c.countryID, r.region, r.regionID, p.producer, p.producerID, p.folderName, w.wine, w.wineID, w.description, rev.vintage, rev.theDate, rev.link, rev.reviewID, sco.scoreID, sco.value, sco.score, pub.publication, pub.publicationID";
		$fromStr = "countries c LEFT JOIN regions r ON c.countryID = r.countryID LEFT JOIN producers p ON r.regionID = p.regionID LEFT JOIN wines w ON p.producerID = w.producerID LEFT JOIN reviews rev ON w.wineID = rev.wineID LEFT JOIN scores sco ON rev.scoreID = sco.scoreID LEFT JOIN publications pub ON pub.publicationID = rev.publicationID";
		$orderByStr = "ORDER BY theDate limit 7";
		$rows = $db->select2($fromStr, $selectStr, array('producer'=>$id), $orderByStr);
		echoResponse(200, $rows);
	});

	// Pulls Labels for a winery Information
	$app->get('/labels/:id', function($id) {
		global $db;
		$selectStr = "p.producer, l.*";
		$fromStr = "producers p LEFT JOIN labels l on p.producerID = l.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls BottleShots for a winery Information
	$app->get('/bottleshots/:id', function($id) {
		global $db;
		$selectStr = "p.producer, b.*";
		$fromStr = "producers p LEFT JOIN bottleshots b on p.producerID = b.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls Images for a winery Information
	$app->get('/images/:id', function($id) {
		global $db;
		$selectStr = "p.producer, i.*";
		$fromStr = "producers p LEFT JOIN images i on p.producerID = i.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls Sell Sheets for a winery Information
	$app->get('/sellsheets/:id', function($id) {
		global $db;
		$selectStr = "p.producer, s.*";
		$fromStr = "producers p LEFT JOIN sellsheets s on p.producerID = s.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls training cards for a winery Information
	$app->get('/trainingcards/:id', function($id) {
		global $db;
		$selectStr = "p.producer, s.*";
		$fromStr = "producers p LEFT JOIN stafftraining s on p.producerID = s.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls Videos for a winery Information
	$app->get('/videos/:id', function($id) {
		global $db;
		$selectStr = "p.producer, v.*";
		$fromStr = "producers p LEFT JOIN videos v on p.producerID = v.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});
	// Pulls Videos for a winery Information
	$app->get('/miscpos/:id', function($id) {
		global $db;
		$selectStr = "p.producer, m.*";
		$fromStr = "producers p LEFT JOIN miscpos m on p.producerID = m.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls Videos for a winery Information
	$app->get('/bios/:id', function($id) {
		global $db;
		$selectStr = "p.producer, b.*";
		$fromStr = "producers p LEFT JOIN bios b on p.producerID = b.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls Maps for a winery Information
	$app->get('/maps/:id', function($id) {
		global $db;
		$selectStr = "p.producer, m.*";
		$fromStr = "producers p LEFT JOIN maps m on p.producerID = m.producerID";
		//$whereStr = array('w.producerID'=>$id);
		$rows = $db->select($fromStr, $selectStr, array('producer'=>$id));
		echoResponse(200, $rows);
	});

	// Pulls All Winery Visits records
	$app->get('/wineryVisits', function() {
		global $db;
		$selectStr = "*";
		$fromStr = "whatsvisible w LEFT JOIN producers p ON w.producerID = p.producerID LEFT JOIN wineryvisits wv on p.producerID = wv.producerID LEFT JOIN regions r ON r.regionID = p.regionID LEFT JOIN countries c ON c.countryID = r.countryID";
		$orderByStr = "ORDER BY p.producer ASC";
		$rows = $db->select2($fromStr, $selectStr, array(), $orderByStr);
		echoResponse(200, $rows);
	});

	// regions
	$app->get('/regions', function() {
		global $db;
		$rows = $db->select("regions", "*", array());
		echoResponse(200, $rows);
	});

	// producers
	$app->get('/producers', function() {
		global $db;
		$rows = $db->select2("producers p LEFT JOIN regions r ON p.regionID = r.regionID LEFT JOIN countries c ON r.countryID = c.countryID", "*", array(), "ORDER BY p.producer ASC");
		echoResponse(200, $rows);
	});

	// wines
	$app->get('/wines', function() {
		global $db;
		$sqlFrom = "wines w LEFT JOIN bottleshots b ON w.wineID = b.wineID LEFT JOIN producers p ON w.producerID = p.producerID LEFT JOIN regions r ON p.regionID = r.regionID LEFT JOIN countries c ON r.countryID = c.countryID";
		$sqlWhere = "WHERE c.country = 'Italy'";
		$sqlOrderBy = "ORDER BY p.producer ASC";
		$rows = $db->select($sqlFrom, "w.wine as wine, w.image as image, w.description as description, p.producer as producer, r.region as region, c.country as country", array());
		echoResponse(200, $rows);
	});

	function echoResponse($status_code, $response) {
		global $app;
		$app->status($status_code);
		$app->contentType('application/json');
		echo json_encode($response,JSON_NUMERIC_CHECK);
	}

	$app->run();
?>
