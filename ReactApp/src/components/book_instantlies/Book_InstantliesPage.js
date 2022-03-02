import PageTemplate from "../templates/Template";
import Book_InstantliesTable from "./Book_InstantliesTable";
import React from "react";

const Book_InstantliesPage = (props) => {
    return(
    <PageTemplate title="Book_Instantlies List">
        <Book_InstantliesTable/>
    </PageTemplate>)
}
export default Book_InstantliesPage;
