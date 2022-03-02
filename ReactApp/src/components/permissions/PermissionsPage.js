import PageTemplate from "../templates/Template";
import PermissionsTable from "./PermissionsTable";
import React from "react";

const PermissionsPage = (props) => {
    return(
    <PageTemplate title="Permissions List">
        <PermissionsTable/>
    </PageTemplate>)
}
export default PermissionsPage;
