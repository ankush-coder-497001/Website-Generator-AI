import { useEffect, useState } from "react";

const Profile = ({User})=>{
  return(
    <>
      <div class="profile-section">
            <div class="profile-picture">
                <img src={User.picture}/>
            </div>
            <span class="profile-name">{User?.name?.split(" ")[0]}</span>
        </div>
    </>
  )
}
export default Profile;