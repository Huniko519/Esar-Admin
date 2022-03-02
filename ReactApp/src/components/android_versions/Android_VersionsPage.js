import PageTemplate from "../templates/Template";
import Android_VersionsTable from "./Android_VersionsTable";
import React from "react";

const Android_VersionsPage = (props) => {
    return(
    <PageTemplate title="Android_Versions List">
        <Android_VersionsTable/>
    </PageTemplate>)
}
export default Android_VersionsPage;
