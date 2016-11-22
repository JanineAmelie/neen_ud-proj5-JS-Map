//Declare variable for global use.
var map;
var infoWindow;
var myLatLng;
var bounds;

//Create Instance of a map from the Google maps api
//Grab the reference to the "map-canvas" id to display map
//Set the map options object properties

function startMap() {
    initMap();
    google.maps.event.addDomListener(window, 'resize', centerMap);
    google.maps.event.addDomListener(window, 'load', centerMap);
    infoWindowEdit()
}

function centerMap() {
    map.setCenter({ lat: 14.560517, lng: 120.989446 });
    map.setZoom(13);

}

function initMap() {
    map = new google.maps.Map(document.getElementById('map-canvas'), {
        center: { lat: 14.560517, lng: 120.989446 },
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    //bind the viewModel to the View after the gmaps has been created.
    bind();
    //create only one infowindow to display at a time when called, this is re
    //assigned to different locations or markers upon click.
    infoWindow = new google.maps.InfoWindow();
};
var markersArray = [];
//Map Pin Constructor Function
var Pin = function(data) {
    var self = this;
    var pin;

    this.title = ko.observable(String(data.title));
    this.lat = ko.observable(data.location.lat);
    this.lng = ko.observable(data.location.lng);

    this.id = ko.observable(data.id)

    pin = new google.maps.Marker({
        position: new google.maps.LatLng(self.lat(), self.lng()),
        title: this.title(),
        animation: google.maps.Animation.DROP,
    });

    markersArray.push(pin);
    //create an onClick event to open an infowindow at this pin.
    pin.addListener('click', function() {
        populateInfoWindow(this, infoWindow);
    });

    this.isVisible = ko.observable(false);

    this.isVisible.subscribe(function(currentState) {
        if (currentState) {
            pin.setMap(map);
        } else {
            pin.setMap(null);
        }
    });

    this.isVisible(true);
};

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {

        infowindow.marker = marker;

        var consumerKey = 'hnJCok1xdi_Asm54Xqe2Xw'
        var consumerSecret = 'JwVEkZdkAEL7h8Yq2mP0jD0dvSs'
        var token = 'SsV8QvBUxHd22qVxqLvFJzv4YV7Sybkp'
        var tokenSecret = 'Erp2WtAM_h_larpVREiyP7oPG_g '

        var auth = {
            consumerKey: consumerKey,
            consumerSecret: consumerSecret,
            accessToken: token,
            // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
            // You wouldn't actually want to expose your access token secret like this in a real application.
            accessTokenSecret: tokenSecret,
            serviceProvider: {
                signatureMethod: "HMAC-SHA1"
            }
        };

        var trimmedQuery = encodeURIComponent(marker.title);
        var lt =  marker.position.lat();
        var lg = marker.position.lng();
        var terms = trimmedQuery;
        var near = 'Manila';

        var accessor = {
            consumerSecret: auth.consumerSecret,
            tokenSecret: auth.accessTokenSecret
        };

        parameters = [];

        parameters.push(['latitude', lt]);
        parameters.push(['longitude', lg]);
        parameters.push(['locale', 'en_PH']);
        parameters.push(['radius', 100]);
        parameters.push(['limit', 1]);
        parameters.push(['term', terms]);
        parameters.push(['location', near]);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            'action': 'http://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);
        parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
        console.log(parameterMap);

        $.ajax({
            'url': message.action,
            'data': parameterMap,
            'cache': true,
            'dataType': 'jsonp',
            'jsonpCallback': 'cb',
            'success': function(data, textStats, XMLHttpRequest) {
                console.log(data);
            }
        });
    }
}

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

        console.log("pinsCreated")
    }

    createPins();

    this.getPlace = function(data) {
        var thisPlaceID = data.id();

        var thisMarker = markersArray[thisPlaceID]
        populateInfoWindow(thisMarker, infoWindow);
    }

    //Search bar functionality
    this.match = ko.observable(true);
    this.query = ko.observable('');

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

        if (filter.length === 0) {
            self.match(false);
            return [emptyLocation];
        } else {
            self.match(true);
            return filter;
        }

    });

};



function infoWindowEdit() {
    // *
    // START INFOWINDOW CUSTOMIZE.
    // The google.maps.event.addListener() event expects
    // the creation of the infowindow HTML structure 'domready'
    // and before the opening of the infowindow, defined styles are applied.
    // *
    google.maps.event.addListener(infoWindow, 'domready', function() {

        // Reference to the DIV that wraps the bottom of infowindow
        var iwOuter = $('.gm-style-iw');

        /* Since this div is in a position prior to .gm-div style-iw.
         * We use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Removes background shadow DIV
        iwBackground.children(':nth-child(2)').css({ 'display': 'none' });

        // Removes white background DIV
        iwBackground.children(':nth-child(4)').css({ 'display': 'none' });

        // Moves the infowindow 115px to the right.
        iwOuter.parent().parent().css({ left: '115px' });

        // Moves the shadow of the arrow 76px to the left margin.
        iwBackground.children(':nth-child(1)').attr('style', function(i, s) {
            return s + 'left: 76px !important;'
        });

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
            return s + 'left: 76px !important;'
        });

        // Changes the desired tail shadow color.
        iwBackground.children(':nth-child(3)').find('div').children().css({ 'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index': '1' });

        // Reference to the div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.addClass('close-iw');
        $('.close-iw').html('<span>x</span>');
        // Apply the desired effect to the close button

        // If the content of infowindow not exceed the set maximum height, then the gradient is removed.
        if ($('.iw-content').height() < 140) {
            $('.iw-bottom-gradient').css({ display: 'none' });
        }


    });
}

/* UI CODE */
var isFocused = false;
var searchPos = $('#the-search').offset();

//binds the mapViewModel to the view
//is only called after the gmaps API url callback
function bind() {
    ko.applyBindings(mapViewModel);
}

//on focus of the search bar:
$("#main-search-bar").focus(function() {
    isFocused = true;
    $(".results-container").slideToggle(300, function() {});

    checkSize();
});


$("#main-search-bar").focusout(function() {
    isFocused = false;
    $(".results-container").slideToggle(600, function() {});

    checkSize();
});

function checkSize() {
    searchPos = $('#the-search').offset();
    if ($(document).width() > 992 && isFocused == true) {
        //code to set search bar left
        $('#the-search').css('float', 'left');

        //change infobtn size
        $('.info-btn').css('height', '80');
        $('.info-btn').css('width', '80');

        $('.results-container').css('margin', '')
        $('.results-container').css('position', '')
        $('.results-container').css('left', searchPos.left);


    } else if ($(document).width() > 992 && isFocused == false) {
        //code to set search bar left
        $('#the-search').css('float', 'left');

        //change infobtn size
        $('.info-btn').css('height', '80');
        $('.info-btn').css('width', '80');


    } else if ($(document).width() <= 992 && isFocused == true) {
        //centers the searchbar
        $('#the-search').css('float', 'none');
        $('.search-bar-container').removeClass('col-xs-6');
        $('.search-bar-container').addClass('col-xs-12');

        //hide the info-btn
        $('.info-btn-container').css('display', 'none');

        //center search results
        $('.results-container').css('left', '')
        $('.results-container').css('margin', '0 auto')
        $('.results-container').css('position', 'relative')

    } else if ($(document).width() <= 992 && isFocused == false) {
        $('#the-search').css('float', 'right');

        $('.search-bar-container').removeClass('col-xs-12');
        $('.search-bar-container').addClass('col-xs-6');

        //shows the round info-btn (i)
        $('.info-btn-container').css('display', 'unset');
        $('.info-btn').css('height', '40px');
        $('.info-btn').css('width', '40px');

    }
}
$(function() {
    $('[data-toggle="tooltip"]').tooltip()
})

// checkSize();

$(window).resize(function() {
    checkSize();
});



//TODO:
/*

* Pin Colors
*ajax call for data inside pins

*/
