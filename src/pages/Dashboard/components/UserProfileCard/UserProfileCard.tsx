import ImageComponent from "src/components/ImageComponent";
import styles from "./userprofilecard.module.css";
import profilePicture from "src/assets/images/user-dp.png";
import { ReactComponent as IconAngleDown } from "src/assets/icons/icon-angle-down.svg";
import capitalize from "src/utils/capitalize";
import { useUserState, userInitState } from "src/features/user/state";
import { useState } from "react";

import { authInitState, useAuthState} from "src/features/auth/state";
import FormStateModal from "src/components/FormComponents/FormStateModal/FormStateModal";
import { useNavigate } from "react-router-dom";

export default function UserProfileCard({
  extraStyles,
}: {
  extraStyles: string;
}) {
    const navigate = useNavigate();
  const [userState, setUserState] = useUserState();
  const [authState, setAuthState] = useAuthState();
  const [showLogoutDropdown, setShowLogoutDropdown] = useState(false);

  const toggleLogoutDropdown = () => {
    setShowLogoutDropdown(!showLogoutDropdown);
  };
  function LogOut() {
    LogOutAction()
      .then(() => {
        localStorage.removeItem('sid.set')
        setUserState(userInitState);
        setAuthState(authInitState)
        navigate({pathname: "/"})
      })
      .catch((error: { message: any; }) => {
        setAuthState((state)=> {
            return {
                ...state,
                error: true,
                message: error.message,
                status:'FAILED'
            }
        })
      });
  }

  return (
    <div
      className={`${styles.user_profile_card} ${extraStyles}`}
      onClick={toggleLogoutDropdown}
    >
      <ImageComponent
        src={userState.details.personal.profileImage ?? profilePicture}
        extraStyles={styles.profile_picture}
      />

      <div className={styles.info}>
        <div className={styles.name}>
          {capitalize(userState.details.personal.firstname)},{" "}
          {capitalize(userState.details.personal.lastname)}
        </div>
        <div className={styles.role}>
          {capitalize(userState.details.role.title)}
        </div>
      </div>
      <FormStateModal 
                    status={authState.status} 
                    error={authState.error} 
                    message={authState.message}
                    reset={()=> (setAuthState(authInitState))}
                />
      <IconAngleDown className={styles.arrow} />

      {showLogoutDropdown && (
        <div className={styles.logoutDropdown}>
          <p onClick={LogOut}>Log Out</p>
        </div>
      )}
    </div>
  );
}
function LogOutAction() {
    throw new Error("Function not implemented.");
}

