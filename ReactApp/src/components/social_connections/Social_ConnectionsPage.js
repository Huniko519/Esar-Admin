import PageTemplate from "../templates/Template";
import Social_ConnectionsTable from "./Social_ConnectionsTable";
import React from "react";

const Social_ConnectionsPage = (props) => {
    return(
    <PageTemplate title="Social_Connections List">
        <Social_ConnectionsTable/>
    </PageTemplate>)
}
export default Social_ConnectionsPage;
