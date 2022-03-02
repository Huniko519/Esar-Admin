import PageTemplate from "../templates/Template";
import Trip_CancellationsTable from "./Trip_CancellationsTable";
import React from "react";

const Trip_CancellationsPage = (props) => {
    return(
    <PageTemplate title="Trip_Cancellations List">
        <Trip_CancellationsTable/>
    </PageTemplate>)
}
export default Trip_CancellationsPage;
