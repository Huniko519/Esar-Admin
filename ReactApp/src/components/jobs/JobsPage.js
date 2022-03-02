import PageTemplate from "../templates/Template";
import JobsTable from "./JobsTable";
import React from "react";

const JobsPage = (props) => {
    return(
    <PageTemplate title="Jobs List">
        <JobsTable/>
    </PageTemplate>)
}
export default JobsPage;
