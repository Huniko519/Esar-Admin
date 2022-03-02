import PageTemplate from "../templates/Template";
import Trip_BillsTable from "./Trip_BillsTable";
import React from "react";

const Trip_BillsPage = (props) => {
    return(
    <PageTemplate title="Trip_Bills List">
        <Trip_BillsTable/>
    </PageTemplate>)
}
export default Trip_BillsPage;
