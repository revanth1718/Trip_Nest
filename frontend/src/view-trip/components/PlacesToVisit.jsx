import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl">Places To Visit</h2>
      <div>
        {/* Check if itinerary exists and loop through the days */}
        {trip?.trip?.tripData?.itinerary &&
          trip.trip.tripData.itinerary.map((dayData, index) => (
            <div key={index} className="mt-5">
              {/* Display the day name */}
              <h2 className="font-medium text-lg">{dayData.day}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Loop through the plan array for each place */}
                {dayData.plan.map((place, placeIndex) => (
                  <div key={placeIndex} className="my-3">
                    <h2 className="font-medium text-sm text-orange-500">
                      🕟 {place.timeToTravel}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
