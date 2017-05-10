//Declare variable for global use.
var map;
var infoWindow;
var myLatLng;
var markersArray = [];

//centerMap function called on resize and load
//and also called when the user clicks the little
//refresh button in the lower right corner
function centerMap() {
    map.setCenter({ lat: 14.560517, lng: 120.989446 });
    map.setZoom(13);
}

//Create Instance of a map from the Google maps api
//Grab the reference to the "map-canvas" id to display map
//Set the map options object properties
function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: 14.560517, lng: 120.989446 },
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    //bind the viewModel to the View after the gmaps has been created.
    bind();
    //create only one infowindow to display at a time when called, this is re assigned to different locations or markers upon click.
    infoWindow = new google.maps.InfoWindow();

    //adds event listeners to the google maps
    //only want the event listeners to be created after
    //a successful creation of a map
    google.maps.event.addDomListener(window, 'resize', centerMap);
    google.maps.event.addDomListener(window, 'load', centerMap);
};

//Map Pin Constructor Function
var Pin = function(data) {
    var self = this;
    var pin;

    //createing ko.observable values from the data that is passed.
    this.title = ko.observable(String(data.title));
    this.lat = ko.observable(data.location.lat);
    this.lng = ko.observable(data.location.lng);
    this.id = ko.observable(data.id)
    this.bizId = ko.observable(data.bizId);

    pin = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat(), self.lng()),
        title: this.title(),
        animation: google.maps.Animation.DROP,
    });

    //creates a method that is called later when the pin is clicked
    this.toggleBounce = function() {
        pin.setAnimation(google.maps.Animation.BOUNCE);
        //Ends the animation after 2 bounces
        //One bounce is roughly 700ms
        setTimeout(function() { pin.setAnimation(null); }, 1400);
    };

    //when the pin is clicked it toggles the animation
    pin.addListener('click', this.toggleBounce);

    //bI is the businessID that will be passed through
    //the populateInfoWindow to be used in the Ajax call
    //to grab relevant data
    var bI = data.bizId;

    //create an onClick event to open an infowindow at this pin.
    pin.addListener('click', function() {
        populateInfoWindow(this, infoWindow, bI);
    });

    //property that will be used to hide pins from the map
    this.isVisible = ko.observable(false);

    //method that will be used in filtering of the map
    this.isVisible.subscribe(function(currentState) {
        if (currentState) {
            //setMap will display the pins on the map
            pin.setMap(map);
        } else {
            pin.setMap(null);
        }
    });
    //sets the initial value of all pins to true
    //on load the pins are all visible
    this.isVisible(true);

    //finally pushes the pin with all its methods
    //and properties into an array to be used later for
    //filtering
    markersArray.push(pin);
};

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow, bI) {
    //gets the title of the restaurant
    var thisMarkerTitle = marker.title;

    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {

        infowindow.marker = marker;

        //function to generate a 'number-used-once'
        //this is required by yelp API for security
        function nonce_generate() {
            return (Math.floor(Math.random() * 1e12).toString());
        }

        var yelp_url = 'https://api.yelp.com/v2/business/' + bI;
        //parameters to be passed into the URL
        var parameters = {
            cc: 'PH',
            oauth_consumer_key: 'hnJCok1xdi_Asm54Xqe2Xw',
            oauth_token: 'SsV8QvBUxHd22qVxqLvFJzv4YV7Sybkp',
            oauth_nonce: nonce_generate(),
            oauth_timestamp: Math.floor(Date.now() / 1000), //unix epoc
            oauth_signature_method: 'HMAC-SHA1',
            callback: 'cb'
        };

        var consumer_secret = 'JwVEkZdkAEL7h8Yq2mP0jD0dvSs',
            token_secret = 'Erp2WtAM_h_larpVREiyP7oPG_g';

        //generate the secure oauth signature using
        // google's oauth libraries https://github.com/sytelus/CryptoJS
        var encodedSignature = oauthSignature.generate('GET', yelp_url, parameters, consumer_secret, token_secret);
        //after generating the secure signature
        //add the property oauth-sig to parameters object.
        parameters.oauth_signature = encodedSignature;

        //settings object to be passed into the ajax call
        var settings = {
            url: yelp_url,
            data: parameters,
            cache: true,
            jsonpCallback: 'cb',
            dataType: 'jsonp',
            success: function(response) {
                //console.log("SUCCCESS! %o", response);//debug

                //Create the object to be passed into the html
                //generator function from the response.
                var yelpObj = {
                    iwUrl: response.url,
                    iwTitle: response.name,
                    iwAddress: arrayToString(response.location.display_address),
                    iwPic: response.image_url,
                    iwRating: response.rating_img_url_large,
                    iwPhone: response.display_phone,
                    iwReviews: response.review_count,
                    iwCuisines: response.categories[0][0]
                }

                //create the html that will be put into the infoWindow
                //this is called from data.js
                var finalHTML = createContent(yelpObj);
                //insert the finalHtml into the infoWindow
                infowindow.setContent('<div>' + finalHTML + '</div>');

                map.panTo(marker.getPosition())
                infowindow.open(map, marker);
                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            },
            error: function(e) {
                var yelpObj = {
                    iwTitle: thisMarkerTitle,
                }

                //generate the 'failed'Html that shows an error message
                var finalHTML = createFailedContent(yelpObj);
                infowindow.setContent('<div>' + finalHTML + '</div>');

                //mapActions
                map.panTo(marker.getPosition())
                infowindow.open(map, marker);
                infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                });
            }
        }
        $.ajax(settings);
    }
}

//Handles the databinding between the lists
//Handles search bar functionality
//Creates the markers(Pins) for google maps
var mapViewModel = function() {

    //ensures that 'self-this maps to the current method'
    var self = this;
    //Create a new blank array for all the listing markers.
    self.pins = ko.observableArray([]);

    //iterates through the mapModel and creates a new pin for each item in the mapmodel and pushes them into the markers array.
    this.createPins = function() {
        //TODO  turn into for loop to allow 'i' to use as
        for (var i = 0; i < mapModel.length; i++) {
            var markerItem = mapModel[i];
            var x = new Pin(markerItem);
            self.pins.push(x);
        };

        //console.log("pinsCreated")//debug
    }

    createPins();

    //when a list item is clicked this function gets called
    //and passes in its data
    this.getPlace = function(data) {
        var thisPlaceID = data.id();
        var thisPlaceBizID = data.bizId();

        var thisMarker = markersArray[thisPlaceID]

        thisMarker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() { thisMarker.setAnimation(null); }, 1400);

        populateInfoWindow(thisMarker, infoWindow, thisPlaceBizID);
    }


    this.match = ko.observable(true);
    //sets the initial value of the search bar query
    //to an empty string
    this.query = ko.observable('');

    //Search bar functionality
    this.filterPins = ko.computed(function() {
        var search = self.query().toLowerCase();

        //this array filter checks if the condition is true or false; function(pin) is the condition, what matches.
        //loops through the pins and returns true or false depending if the search string is part of the pin.title()
        //filter is an array containing pins that match your search term
        var filter = ko.utils.arrayFilter(self.pins(), function(pin) {
            var doesMatch = pin.title().toLowerCase().indexOf(search) >= 0;

            pin.isVisible(doesMatch)
            return doesMatch;
        });
        //empty location to display
        var emptyLocation = {
            title: 'No Matched Location Found',
            location: {
                lat: 40.7713024,
                lng: -73.9632393
            },
            map: null,
            id: 999
        };

        //if there is no matched letter (=== 0)
        // then an empty location will display in the list box
        if (filter.length === 0) {
            self.match(false);
            return [emptyLocation];
        } else {
            self.match(true);
            return filter;
        }

    });

};

//binds the mapViewModel to the view
//called only after the map has finished loading to ensure
//that google.maps is defined and the pins can begin being
//created
function bind() {
    ko.applyBindings(mapViewModel);
}
