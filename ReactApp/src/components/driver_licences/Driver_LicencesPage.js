import PageTemplate from "../templates/Template";
import Driver_LicencesTable from "./Driver_LicencesTable";
import React from "react";

const Driver_LicencesPage = (props) => {
    return(
    <PageTemplate title="Driver_Licences List">
        <Driver_LicencesTable/>
    </PageTemplate>)
}
export default Driver_LicencesPage;
