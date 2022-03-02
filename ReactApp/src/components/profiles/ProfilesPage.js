import PageTemplate from "../templates/Template";
import ProfilesTable from "./ProfilesTable";
import React from "react";

const ProfilesPage = (props) => {
    return(
    <PageTemplate title="Profiles List">
        <ProfilesTable/>
    </PageTemplate>)
}
export default ProfilesPage;
