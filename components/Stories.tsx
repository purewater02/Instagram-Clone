import { faker } from "@faker-js/faker";
import React, { useEffect, useState } from "react";

import Story from "./Story";
import {useRecoilValue} from "recoil";
import {backendUserState} from "../utils/atoms";

type StoriesProps = {};

const Stories: React.FC<StoriesProps> = () => {
  const user = useRecoilValue(backendUserState);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div
      className="
    flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black"
    >
      {user && (
        <Story img={user?.photoURL!} username={user?.name!} />
      )}

      {suggestions.map((profile) => (
        <Story
          key={profile.id}
          img={profile.avatar}
          username={profile.username}
        />
      ))}
    </div>
  );
};
export default Stories;
