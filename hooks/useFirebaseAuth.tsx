import {useEffect} from "react";
import {getAuth, onAuthStateChanged} from "@firebase/auth";
import {useRecoilState} from "recoil";
import {backendUserState, userState} from "../utils/atoms";
import {getUserFromBack} from "../pages/api/userApi";

export const useFirebaseAuth = () => {
    const [user, setUser] = useRecoilState(userState);
    const [backendUser, setBackendUser] = useRecoilState(backendUserState);
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            console.log("Firebase user changed: ", firebaseUser)

            if (firebaseUser) {
                const idToken = await firebaseUser.getIdToken();

                const userCopy = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    idToken: idToken
                }
                setUser(userCopy);

                try {
                    console.log("fetching backend with user token", idToken);
                    const backendUser = await getUserFromBack(idToken);
                    setBackendUser(backendUser);
                    console.log("Backend user fetched: ", backendUser);
                } catch (error) {
                    console.error("Error fetching backendUserData: ", error);
                }
            } else {
                setUser(null);
                setBackendUser(null);
            }
        });

        return () => unsubscribe();
    }, [auth, setUser, setBackendUser]);

    return { user, backendUser };
};