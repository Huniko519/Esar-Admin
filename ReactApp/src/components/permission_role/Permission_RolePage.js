import PageTemplate from "../templates/Template";
import Permission_RoleTable from "./Permission_RoleTable";
import React from "react";

const Permission_RolePage = (props) => {
    return(
    <PageTemplate title="Permission_Role List">
        <Permission_RoleTable/>
    </PageTemplate>)
}
export default Permission_RolePage;
