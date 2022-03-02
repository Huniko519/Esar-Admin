import PageTemplate from "../templates/Template";
import Country_ListsTable from "./Country_ListsTable";
import React from "react";

const Country_ListsPage = (props) => {
    return(
    <PageTemplate title="Country_Lists List">
        <Country_ListsTable/>
    </PageTemplate>)
}
export default Country_ListsPage;
