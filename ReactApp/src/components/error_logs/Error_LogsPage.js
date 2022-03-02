import PageTemplate from "../templates/Template";
import Error_LogsTable from "./Error_LogsTable";
import React from "react";

const Error_LogsPage = (props) => {
    return(
    <PageTemplate title="Error_Logs List">
        <Error_LogsTable/>
    </PageTemplate>)
}
export default Error_LogsPage;
