import PageTemplate from "../templates/Template";
import Activity_RequestsTable from "./Activity_RequestsTable";
import React from "react";

const Activity_RequestsPage = (props) => {
    return(
    <PageTemplate title="Activity_Requests List">
        <Activity_RequestsTable/>
    </PageTemplate>)
}
export default Activity_RequestsPage;
