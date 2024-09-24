import React from "react";
import {useRecoilValue} from "recoil";
import {backendUserState} from "../utils/atoms";
import {getAuth} from "firebase/auth";

type MiniProfileProps = {};

const MiniProfile: React.FC<MiniProfileProps> = () => {
  const user = useRecoilValue(backendUserState);

    const signOut = () => {
        const auth = getAuth();
        auth.signOut().then(() => {
            console.log("Sign out successful");
        }).catch((error) => {
            console.error("Sign out error", error);
        });
    };

  return (
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        className="w-16 h-16 rounded-full border p-[2px]"
        src={user?.photoURL!}
        alt=""
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold">{user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
      </div>
      <button
        onClick={() => signOut()}
        className="text-blue-400 text-sm font-semibold"
      >
        Sign Out
      </button>
    </div>
  );
};
export default MiniProfile;
