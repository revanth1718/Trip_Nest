import React, { useState, useEffect } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import { LiaDoorOpenSolid } from "react-icons/lia";
import { MdAddLocationAlt } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

function Header() {
  // State to manage authentication, user profile data, and dialog visibility
  const [user, setUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // Check localStorage for an existing user when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle Google Login
  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // Fetch the user's profile information
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v1/userinfo",
          {
            headers: {
              Authorization: `Bearer ${codeResponse.access_token}`,
            },
          }
        );

        const userData = res.data;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Save user data to localStorage
        setOpenDialog(false); // Close the dialog after successful login
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  // Handle logout
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null); // Reset the user state after logout
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <img
          src="/Logo.png"
          alt="Logo"
          className="cursor-pointer w-14 md:w-16 lg:w-18 h-auto p-2"
        />
      </a>
      <div>
        {user ? (
          // Display user's profile picture when signed in
          <div className="flex flex-row gap-3">
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full text-gray-700">
                <span className="block sm:hidden">
                  <MdAddLocationAlt size={22} />
                </span>
                <span className="hidden sm:block">Create Trip</span>
              </Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full text-gray-700">
                History
              </Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>
                <img
                  src={user.picture}
                  alt="User Profile"
                  className="rounded-full w-9 h-9"
                />
              </PopoverTrigger>
              <PopoverContent className="w-40 mx-4 my-2 pl-3 bg-transparent border-transparent">
                <Button onClick={handleLogout} className="flex items-center">
                  Log Out
                  <LiaDoorOpenSolid size={20} className="ml-2" />
                </Button>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          // Display the sign-in button when not signed in
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}

        {/* Sign-In Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/Logo.png" alt="Logo" className="w-14 md:w-16 lg:w-18 h-auto p-2" />
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
    </div>
  );
}

export default Header;
