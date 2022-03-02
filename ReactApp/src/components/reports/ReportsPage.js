import PageTemplate from "../templates/Template";
import ReportsTable from "./ReportsTable";
import React from "react";

const ReportsPage = (props) => {
    return(
    <PageTemplate title="Reports List">
        <ReportsTable/>
    </PageTemplate>)
}
export default ReportsPage;
