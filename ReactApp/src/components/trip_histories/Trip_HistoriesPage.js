import PageTemplate from "../templates/Template";
import Trip_HistoriesTable from "./Trip_HistoriesTable";
import React from "react";

const Trip_HistoriesPage = (props) => {
    return(
    <PageTemplate title="Trip_Histories List">
        <Trip_HistoriesTable/>
    </PageTemplate>)
}
export default Trip_HistoriesPage;
