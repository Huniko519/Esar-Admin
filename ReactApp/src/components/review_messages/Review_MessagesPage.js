import PageTemplate from "../templates/Template";
import Review_MessagesTable from "./Review_MessagesTable";
import React from "react";

const Review_MessagesPage = (props) => {
    return(
    <PageTemplate title="Review_Messages List">
        <Review_MessagesTable/>
    </PageTemplate>)
}
export default Review_MessagesPage;
