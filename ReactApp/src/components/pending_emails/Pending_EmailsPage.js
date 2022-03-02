import PageTemplate from "../templates/Template";
import Pending_EmailsTable from "./Pending_EmailsTable";
import React from "react";

const Pending_EmailsPage = (props) => {
    return(
    <PageTemplate title="Pending_Emails List">
        <Pending_EmailsTable/>
    </PageTemplate>)
}
export default Pending_EmailsPage;
