import PageTemplate from "../templates/Template";
import Ios_VersionsTable from "./Ios_VersionsTable";
import React from "react";

const Ios_VersionsPage = (props) => {
    return(
    <PageTemplate title="Ios_Versions List">
        <Ios_VersionsTable/>
    </PageTemplate>)
}
export default Ios_VersionsPage;
