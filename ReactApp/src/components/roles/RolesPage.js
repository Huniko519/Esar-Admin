import PageTemplate from "../templates/Template";
import RolesTable from "./RolesTable";
import React from "react";

const RolesPage = (props) => {
    return(
    <PageTemplate title="Roles List">
        <RolesTable/>
    </PageTemplate>)
}
export default RolesPage;
