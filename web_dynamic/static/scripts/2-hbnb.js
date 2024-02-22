// Wait for the DOM to be fully loaded
$(document).ready(function () {
    // Dictionary to store Amenity IDs
    var amenityIDs = {};

    // Listen for changes on each input checkbox
    $('input[type="checkbox"]').change(function () {
        // Get Amenity ID and Name from data attributes
        var amenityID = $(this).data('id');
        var amenityName = $(this).data('name');

        // Check if the checkbox is checked
        if ($(this).prop('checked')) {
            // Store Amenity ID in the dictionary
            amenityIDs[amenityID] = amenityName;
        } else {
            // Remove Amenity ID from the dictionary
            delete amenityIDs[amenityID];
        }

        // Update the h4 tag inside the div Amenities
        updateAmenitiesDisplay();
    });

    // Function to update the h4 tag with the list of Amenities checked
    function updateAmenitiesDisplay() {
        var amenitiesList = Object.values(amenityIDs).join(', ');
        $('div.Amenities h4').text(amenitiesList);
    }

    // Function to update the #api_status div based on the API status
    function updateApiStatus() {
        // Make an AJAX request to the API status endpoint
        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/status/',
            type: 'GET',
            success: function (data) {
                // Check if the status is "OK"
                if (data.status === 'OK') {
                    // Add the 'available' class to #api_status
                    $('#api_status').addClass('available');
                } else {
                    // Remove the 'available' class from #api_status
                    $('#api_status').removeClass('available');
                }
            },
            error: function () {
                // Handle error if the request fails
                console.log('Error fetching API status');
            }
        });
    }

    // Update the API status initially
    updateApiStatus();

    // Set an interval to update the API status every 5 seconds (adjust as needed)
    setInterval(updateApiStatus, 5000);
});
