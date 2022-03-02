import PageTemplate from "../templates/Template";
import Response_MessagesTable from "./Response_MessagesTable";
import React from "react";

const Response_MessagesPage = (props) => {
    return(
    <PageTemplate title="Response_Messages List">
        <Response_MessagesTable/>
    </PageTemplate>)
}
export default Response_MessagesPage;
