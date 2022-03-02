import PageTemplate from "../templates/Template";
import User_NotesTable from "./User_NotesTable";
import React from "react";

const User_NotesPage = (props) => {
    return(
    <PageTemplate title="User_Notes List">
        <User_NotesTable/>
    </PageTemplate>)
}
export default User_NotesPage;
