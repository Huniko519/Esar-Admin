import PageTemplate from "../templates/Template";
import MigrationsTable from "./MigrationsTable";
import React from "react";

const MigrationsPage = (props) => {
    return(
    <PageTemplate title="Migrations List">
        <MigrationsTable/>
    </PageTemplate>)
}
export default MigrationsPage;
