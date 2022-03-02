import PageTemplate from "../templates/Template";
import Transaction_LogsTable from "./Transaction_LogsTable";
import React from "react";

const Transaction_LogsPage = (props) => {
    return(
    <PageTemplate title="Transaction_Logs List">
        <Transaction_LogsTable/>
    </PageTemplate>)
}
export default Transaction_LogsPage;
