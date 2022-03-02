import PageTemplate from "../templates/Template";
import Sent_EmailsTable from "./Sent_EmailsTable";
import React from "react";

const Sent_EmailsPage = (props) => {
    return(
    <PageTemplate title="Sent_Emails List">
        <Sent_EmailsTable/>
    </PageTemplate>)
}
export default Sent_EmailsPage;
