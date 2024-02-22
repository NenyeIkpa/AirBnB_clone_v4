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
});

