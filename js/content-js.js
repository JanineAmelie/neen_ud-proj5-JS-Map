//Places of interest
// Buffalo's Wings and Things
// Nemoto Japanese Restaurant
// Jus & Jerry's
// Suzhou Dimsum
// Ippudo Manila
// Cafe Travel
// Ping Yang Hot Pot & Dimsum
// Bistro Ravioli
//

var mapModel = [{
    title: 'Nemoto',
    location: {
        lat: 14.5546690000,
        lng: 120.9983580000
    },
    bizId: 'nemoto-pasay',
    id: 0
}, {
    title: 'Jus & Jerry\'s',
    location: {
        lat: 14.5664400000,
        lng: 120.9933050000
    },
    bizId: 'jus-and-jerrys-manila',
    id: 1
}, {
    title: 'Suzhou Dimsum',
    location: {
        lat: 14.5711590000,
        lng: 120.9844130000
    },
    bizId: 'suzhou-dimsum-manila-2',
    id: 2
}, {
    title: 'Ippudo Manila',
    location: {
        lat: 14.5750999071,
        lng: 120.9844491058
    },
    bizId: 'ippudo-manila',
    id: 3
}, {
    title: 'Cafe Travel',
    location: {
        lat: 14.5645638889,
        lng: 120.9941416667
    },
    bizId: 'cafe-travel-mannila',
    id: 4
}, {
    title: 'Project Pie',
    location: {
        lat: 14.537277,
        lng: 120.989823
    },
    bizId: 'project-pie-pasay',
    id: 5

}, {
    title: 'Ucc Clockwork',
    location: {
        lat: 14.537218,
        lng: 120.989483
    },
    bizId: 'ucc-3rd-wave-clockwork-pasay',
    id: 5
},{
    title: 'Samgyupsalamat',
    location: {
        lat: 14.5656304,
        lng: 120.993024
    },
    bizId: 'samgyupsalamat-manila',
    id: 5
}];


var styles = [{
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [{
        "color": "#618fba"
    }]
}, {
    "featureType": "administrative.locality",
    "elementType": "labels.text.stroke",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text",
    "stylers": [{
        "color": "#66b6c5"
    }]
}, {
    "featureType": "administrative.neighborhood",
    "elementType": "labels.text.fill",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#d0b8e9"
    }]
}, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "poi",
    "elementType": "geometry.fill",
    "stylers": [{
        "visibility": "on"
    }, {
        "color": "#f0e1f6"
    }]
}, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
        "lightness": 100
    }, {
        "visibility": "simplified"
    }]
}, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "road.local",
    "elementType": "all",
    "stylers": [{
        "visibility": "on"
    }]
}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
        "visibility": "on"
    }, {
        "lightness": 700
    }]
}, {
    "featureType": "transit.station",
    "elementType": "all",
    "stylers": [{
        "visibility": "off"
    }]
}, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
        "color": "#7dcdcd"
    }]
}];

// iwUrl
// iwTitle
// iwAddress
// iwPic
// iwHtmlStars
// iwCost
// iwReviews
// iwCuisines
function arrayToString(anArray) {
    var stringToReturn = '';
    for (var i = 0; i < anArray.length; i++) {
        stringToReturn = stringToReturn + anArray[i].toString() + ' ';
    }
    return stringToReturn;
};


function createContent(yelpObj) {
    function createStarHtml(reviewNum) {
        var starsLi =
            '  <i class="star-1">★</i>' +
            '  <i class="star-2">★</i>' +
            '  <i class="star-3">★</i>' +
            '  <i class="star-4">★</i>' +
            '  <i class="star-5">★</i>' +
            '</div>'

        function starHtmlChanger(num) {
            var theHtml = '<div class="rating rating-' + num + ' "> ' + starsLi;
            return theHtml;
        }

        switch (reviewNum) {
            case 1:
                return starHtmlChanger('1')
                break
            case 1.5:
                return starHtmlChanger('1-half')
                break
            case 2:
                return starHtmlChanger('2')
                break
            case 2.5:
                return starHtmlChanger('2-half')
                break
            case 3:
                return starHtmlChanger('3')
                break
            case 3.5:
                return starHtmlChanger('3-half')
                break
            case 4:
                return starHtmlChanger('4')
                break
            case 4.5:
                return starHtmlChanger('4-half')
                break
            case 5:
                return starHtmlChanger('5')
                break
        }
    }

    var starHtml = createStarHtml(yelpObj.iwHtmlStars);

    console.log('-----------------------------------');

    var contentHtml = '<div id="iw-container">' +
        '    <div class="iw-title blk">' +
        '      <a class="main-title" href="' + yelpObj.iwUrl + '">' + yelpObj.iwTitle + '</a>' +
        '      <span class="location-span blk">' + yelpObj.iwAddress +
        '            </span>' +
        '    </div>' +
        '    <div class="iw-content">' +
        '      <div class="col-xs-4 iw-left">' +
        '        <div class="blk">' +
        '          <div class="iw-img-container blk">' +
        '            <a href=""><img class="" src="' + yelpObj.iwPic + '"></a>' +
        '          </div>' +
        '        </div>' +
        '        <div class="blk">' +
        '          <span class="iw-logo blk">Powered by</span>' +
        '          <div class="yelplogo">' +
        '            <a href="www.yelp.com">' +
        '              <img height="22" src="images/logo_yelp.png" alt="Yelp">' +
        '            </a>' +
        '          </div>' +
        '        </div>' +
        '      </div>' +
        '      <div class="col-xs-8 iw-right">' +
        '        <span class="iw-subTitle blk">Rating</span>' + starHtml +
        '        <span class="iw-subText"> Based on </span> <span class="iw-subText">' + yelpObj.iwReviews + '</span> <span class="iw-subText">reviews </span>' +
        '        <span class="iw-subTitle blk">Phone</span>' +
        '        <div class="blk">' +
        '          <span class="iw-subText">' + yelpObj.iwPhone + '</span>' +
        '        </div>' +
        '        <span class="iw-subTitle blk"> Cuisine</span>' +
        '        <span class="h4 iw-subText blk">' + yelpObj.iwCuisines + '</span>' +
        '      </div>' +
        '    </div>' +
        '  </div>';

    return contentHtml;
}


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
            return s + 'left: 50px !important;'
        });

        // Moves the arrow 76px to the left margin.
        iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
            return s + 'left: 50px !important;'
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