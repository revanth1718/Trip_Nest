import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
    console.log("trip",trip.trip)
  const [photoUrl, setPhotoUrl] = useState();
  useEffect(() => {
    if(trip?.trip)
        GetPlacePhoto();

  }, [trip.trip]);
  
  const GetPlacePhoto = async () => {
    const data = {
      textQuery: trip?.trip.userSelection.location.label,
    };

    const result = await GetPlaceDetails(data).then((resp) => {
      //   console.log(resp.data.places[0].photos[3].name);
      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[4].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <Link to={"/view-trip/" + trip?.trip.id} className={"text-gray-950"}>
      <div className="hover:scale-105 transition-all cursor-pointer px-5 w-full rounded-lg">
        <img
          src={photoUrl ? photoUrl : "/placeholder.jpg"}
          className="object-cover rounded-xl min-w-full h-[200px]"
        />
        <div className="mt-4">
          <h2 className="font-bold text-lg">
            📍 {trip?.trip.userSelection?.location.label}
          </h2>
          <h2 className="text-sm text-gray-500">
            🏞️ {trip?.trip.userSelection.noOfDays}-day trip with{" "}
            {trip?.trip.userSelection.budget} budget{" "}
          </h2>
        </div> 
      </div>
    </Link>
  );
}

export default UserTripCardItem;