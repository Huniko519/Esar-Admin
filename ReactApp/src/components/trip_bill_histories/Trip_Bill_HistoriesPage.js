import PageTemplate from "../templates/Template";
import Trip_Bill_HistoriesTable from "./Trip_Bill_HistoriesTable";
import React from "react";

const Trip_Bill_HistoriesPage = (props) => {
    return(
    <PageTemplate title="Trip_Bill_Histories List">
        <Trip_Bill_HistoriesTable/>
    </PageTemplate>)
}
export default Trip_Bill_HistoriesPage;
