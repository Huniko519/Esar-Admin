import PageTemplate from "../templates/Template";
import Permission_UserTable from "./Permission_UserTable";
import React from "react";

const Permission_UserPage = (props) => {
    return(
    <PageTemplate title="Permission_User List">
        <Permission_UserTable/>
    </PageTemplate>)
}
export default Permission_UserPage;
