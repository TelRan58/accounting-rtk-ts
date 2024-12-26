import ProfileData from "./ProfileData.tsx";
import UpdateUser from "../UpdateUser.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {deleteToken} from "../../features/slices/tokenSlice.ts";

const Profile = () => {
    const dispatch = useAppDispatch();

    const handleClickLogout = () => {
        dispatch(deleteToken());
    }

    return (
        <div>
            <ProfileData/>
            <button onClick={handleClickLogout}>Logout</button>
            <UpdateUser/>
        </div>
    );
};

export default Profile;