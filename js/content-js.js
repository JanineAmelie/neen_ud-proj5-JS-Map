//Places of interest
// Buffalo's Wings and Things
// Nemoto Japanese Restaurant
// Jus & Jerry's
// Suzhou Dimsum
// Ippudo Manila
// Cafe Travel
// Ping Yang Hot Pot & Dimsum
// Bistro Ravioli

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
// iwRating
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
        '        <span class="iw-subTitle blk">Rating</span>' + '<span class="blk"><img height="22" src="'+ yelpObj.iwRating +'" alt="Yelp"></span>' +
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

/* UI CODE */
var isFocused = false;
var searchPos = $('#the-search').offset();

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
