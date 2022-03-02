import PageTemplate from "../templates/Template";
import SupportsTable from "./SupportsTable";
import React from "react";

const SupportsPage = (props) => {
    return(
    <PageTemplate title="Supports List">
        <SupportsTable/>
    </PageTemplate>)
}
export default SupportsPage;
