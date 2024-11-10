import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectedBudgetOptions, SelectedTravelList } from "@/constants/options";
import { chatSession } from "@/service/AiModel";
import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import toast, { Toaster } from "react-hot-toast";
import {FcGoogle} from 'react-icons/fc'


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { db } from "@/service/firebaseConfig";

import { grid } from 'ldrs'
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  grid.register()

  const handleInputChange=(name,value)=>{

   

    setFormData({...formData,[name]:value})
  }
   
  const OnGenerateTrip= async ()=>{

    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);
      return;
    }
 
    if(formData){
      if(!formData?.noOfDays||!formData?.location||!formData?.budget||!formData?.traveler){
        toast.error("Please fill all details")
        return
    }
    if(formData?.noOfDays<0){
        toast.error("Please Enter valid days")
        return
    }
    if(formData?.noOfDays>5){
        toast.error("Please enter <5")
        return
    }
    }

    else {
      setLoading(true);
    }

    const FINAL_PROMTS=AI_PROMPT.replace('{location}',formData?.location?.label)
    .replace('{noOfDays}',formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{noOfDays}',formData?.noOfDays)

    const result=await chatSession.sendMessage(FINAL_PROMTS)
    
    setLoading(false);
    saveAiTrip(result?.response?.text());
  }

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log("Login Failed:", error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrip();
      });
  };

  const saveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "users", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };


  return (
    
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <Toaster />
      <h2 className="font-bold text-3xl">
        Tell us your travel preferences 🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="tex-xl my-3 font-medium">
            What is destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) =>{ setPlace(v);
              handleInputChange('location',v)}
            }}
          />
        </div>
        <div>
          <h2 className="tex-xl my-3 font-medium">
            How many days are you planning your trip?{" "}
          </h2>
          <Input placeholder={"Ex.3"} type="number" 
          onChange={(e)=>handleInputChange('noOfDays',e.target.value)} />
        </div>
      </div>

      <div>
        <h2 className="tex-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectedBudgetOptions.map((item, index) => (
            <div
            onClick={()=>handleInputChange('budget',item.title)}
              key={index}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData?.budget==item.title && 'shadow-lg border-black'} `}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title} </h2>
              <h2 className="text-sm text-gray-500">{item.desc} </h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="tex-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectedTravelList.map((item, index) => (
            <div
            onClick={()=>handleInputChange('traveler',item.people)}
              key={index}
              className={` p-4 cursor-pointer border rounded-lg hover:shadow-lg ${formData?.traveler==item.people && 'shadow-lg border-black'}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title} </h2>
              <h2 className="text-sm text-gray-500">{item.desc} </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-5 items-center justify-center flex">
        <Button disabled={loading} onClick={OnGenerateTrip} size="lg">
          {loading ? (
            <l-grid
            size="35"
            speed="0.5" 
            color="white" 
          ></l-grid>
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

   <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/Logo.png" alt="Logo" className="w-14 md:w-16 lg:w-18 h-auto p-2"/>
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in to the app with Google authentication</p>
              <Button onClick={login} className="mt-5 w-full flex gap-4 items-center">
                <FcGoogle className="h-7 w-7" /> Sign In With Google
              </Button> 
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;
