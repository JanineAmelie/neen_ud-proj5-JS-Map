
    // ON SUCCESS
 console.log(response)

                var yelpObj = {
                    iwUrl: response.url,
                    iwTitle: response.name,
                    iwAddress: arrayToString(response.location.display_address),
                    iwPic: response.image_url,
                    iwHtmlStars: response.rating,
                    iwPhone: response.display_phone,
                    iwReviews: response.review_count,
                    iwCuisines: response.categories[0]
                }

                var finalHTML = createContent(zomatoDataObj);

               //infowindow.setContent('<div>' + finalHTML + '</div>');
                infowindow.setContent('<div>' + 'poop' + '</div>');

                map.panTo(marker.getPosition())
                infowindow.open(map, marker);

                // Make sure the marker property is cleared if the infowindow is closed.
                infowindow.addListener('closeclick', function() {
                    console.log(1)
                    infowindow.marker = null;
                });
