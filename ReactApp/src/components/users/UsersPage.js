import PageTemplate from "../templates/Template";
import UsersTable from "./UsersTable";
import React from "react";

const UsersPage = (props) => {
    return(
    <PageTemplate title="Users List">
        <UsersTable/>
    </PageTemplate>)
}
export default UsersPage;
