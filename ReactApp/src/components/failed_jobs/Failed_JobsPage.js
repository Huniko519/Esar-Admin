import PageTemplate from "../templates/Template";
import Failed_JobsTable from "./Failed_JobsTable";
import React from "react";

const Failed_JobsPage = (props) => {
    return(
    <PageTemplate title="Failed_Jobs List">
        <Failed_JobsTable/>
    </PageTemplate>)
}
export default Failed_JobsPage;
