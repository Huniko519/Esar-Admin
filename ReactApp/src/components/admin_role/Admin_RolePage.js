import PageTemplate from "../templates/Template";
import Admin_RoleTable from "./Admin_RoleTable";
import React from "react";

const Admin_RolePage = (props) => {
    return(
    <PageTemplate title="Admin_Role List">
        <Admin_RoleTable/>
    </PageTemplate>)
}
export default Admin_RolePage;
