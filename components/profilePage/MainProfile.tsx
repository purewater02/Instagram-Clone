import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Intro from "./Intro";
import ProfileFeed from "./ProfileFeed";
import ProfileHeader from "./ProfileHeader";
import Tag from "./Tag";
import {useRecoilValue} from "recoil";
import {backendUserState} from "../../utils/atoms";
import {LoginResponse} from "../../pages/api/types/responseTypes";

type Props = {};

export default function MainProfile({}: Props) {
  const user = useRecoilValue(backendUserState);
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState({});
  const [userDetails, setUserDetails] = useState<any[]>([]);
  const [isShow, setIsShow] = useState(false);

  const filterUserData = () => {
    try {
      userDetails.map((data) => {
        if (user?.uid === userId) {
          setUserData(data.data());

          if (data.data().username === user?.name) {
            setIsShow(true);
          }
        }
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    filterUserData();
  }, [userDetails]);

  return (
    <main className="bg-gray-100 bg-opacity-25">
      <div className="lg:w-8/12 lg:mx-auto mb-8">
        <ProfileHeader isShow={isShow} userData={userData as LoginResponse} />
        <Tag />
        <div className="px-px md:px-3">
          <Intro />
          <ProfileFeed userId={user?.uid as string} setUserData={setUserDetails} />
        </div>
      </div>
    </main>
  );
}
