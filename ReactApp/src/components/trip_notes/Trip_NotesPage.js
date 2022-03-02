import PageTemplate from "../templates/Template";
import Trip_NotesTable from "./Trip_NotesTable";
import React from "react";

const Trip_NotesPage = (props) => {
    return(
    <PageTemplate title="Trip_Notes List">
        <Trip_NotesTable/>
    </PageTemplate>)
}
export default Trip_NotesPage;
