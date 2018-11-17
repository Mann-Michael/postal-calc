var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/getRate', calculateRate);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function calculateRate(request, response) {
	var originalWeight = Number(request.query.weight);
	var weight = Math.ceil(Number(request.query.weight));
	var type = Number(request.query.type);
	var sLetter = {1: "$0.50", 2: "$0.71", 3: "$0.92", 3.5: "$1.13"};
	var mLetter = {1: "$0.47", 2: "$0.68", 3: "$0.89", 3.5: "$1.10"};
	var lEnvelope = {1: "$1.00", 2: "$1.21", 3: "$1.42", 4: "$1.63", 5: "$1.84", 6: "$2.05", 7: "$2.26", 8: "$2.47", 9: "$2.68", 10: "$2.89", 11: "$3.10", 12: "$3.31", 13: "$3.52"};
	var fClassPackage = {1: "$3.50", 2: "$3.50", 3: "$3.50", 4: "$3.50", 5: "$3.75", 6: "$3.75", 7: "$3.75", 8: "$3.75", 9: "$4.10", 10: "$4.45", 11: "$4.80", 12: "$5.15", 13: "$5.50"};
	var price = 0;
	var maxWeight = 0;
	
	if (type == 0) {
		maxWeight = 3.5;
		if (weight > maxWeight) {
			weight = maxWeight;
		}
		price = sLetter[weight];
		packageType = "Letters (Stamped)";
	} else if (type == 1) {
		maxWeight = 3.5;
		if (weight > maxWeight) {
			weight = maxWeight;
		}
		price = mLetter[weight];
		packageType = "Letters (Metered)";
	} else if (type == 2) {
		maxWeight = 13;
		if (weight > maxWeight) {
			weight = maxWeight;
		}
		price = lEnvelope[weight];
		packageType = "Large Envelopes (Flats)";
	} else if (type == 3) {
		maxWeight = 13;
		if (weight > maxWeight) {
			weight = maxWeight;
		}
		price = fClassPackage[weight];
		packageType = "First-Class Package Service—Retail";
	} else {
		// The previous asignment said to direct them to an error page, but this app does not have one! 
	}
	
	// Create JSON to pass to results page
	var params = {packageType: packageType, originalWeight: originalWeight, price: price};

	// Send results and params to results page 
	response.render('pages/result', params);
}