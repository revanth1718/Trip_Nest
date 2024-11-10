import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "@/service/firebaseConfig";
import InfoSection from "./components/InfoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "@/components/custom/Footer";
function View() {
    const { tripId } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    if (tripId) {
      GetTripData();
    }
  }, [tripId]);


  const GetTripData = async () => {
    const docRef = doc(db, "users", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setTrip(docSnap.data());
      
    } else {
      console.log("No such document");
      toast.error("No trip found");
    }
  };


  return (
     <>
     
       
      
      { trip ?
       <div className="p-10">
        <InfoSection trip={{trip}} />
       <Hotels trip={{trip}} />
       <PlacesToVisit trip={{trip}} />
       </div>
    :""
    }
     
     <Footer />
     </>
  )
}

export default View