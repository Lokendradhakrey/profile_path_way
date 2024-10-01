import React from "react";
import { User, Settings, Archive } from "lucide-react";
import userProfileImg from "../assets/images/userProfile.avif";
import Navbar from "./Navbar";

const Profile = () => {
        

  return (
    <>
    <Navbar/>
      <div className="max-w-xl mx-auto bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-semibold">loky_thakur_</h1>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-gray-200 rounded-md text-sm">
              Edit profile
            </button>
            <button className="px-3 py-1 bg-gray-200 rounded-md text-sm">
              View archive
            </button>
            <Settings className="w-6 h-6" />
          </div>
        </div>

        <div className="flex mb-4">
          <img
            src={userProfileImg}
            alt="Profile"
            className="w-20 h-20 rounded-full mr-8"
          />
          <div>
            <div className="flex space-x-8 mb-2">
              <span>
                <strong>3</strong> posts
              </span>
              <span>
                <strong>265</strong> followers
              </span>
              <span>
                <strong>162</strong> following
              </span>
            </div>
            <h2 className="font-semibold">Lokendra Dhakrey</h2>
            <p className="text-sm text-gray-500">loky_thakur_</p>
            <p className="text-sm">
              Be the best,
              <br />
              Because better is comparative. 👍
              <br />
              Time passes, passes every second so don't waste your time
              talking...
            </p>
          </div>
        </div>

        <div className="flex space-x-4 mb-4 overflow-x-auto">
          {[
            "#Brother_we...",
            "Holi in vrinda...",
            "_WeR 1",
            "🙂",
            "#selfO_bsess...",
            "Hola.",
            "Radhe Ram ...",
          ].map((story, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-14 h-14 bg-gray-300 rounded-full mb-1"></div>
              <span className="text-xs">{story}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-2">
          <div className="flex justify-around mb-4">
            <button className="font-semibold">POSTS</button>
            <button className="text-gray-400">REELS</button>
            <button className="text-gray-400">SAVED</button>
            <button className="text-gray-400">TAGGED</button>
          </div>

          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-200"></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
