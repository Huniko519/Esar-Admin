import PageTemplate from "../templates/Template";
import AdminsTable from "./AdminsTable";
import React from "react";

const AdminsPage = (props) => {
    return(
    <PageTemplate title="Admins List">
        <AdminsTable/>
    </PageTemplate>)
}
export default AdminsPage;
