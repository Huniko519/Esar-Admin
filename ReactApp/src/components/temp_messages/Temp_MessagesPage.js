import PageTemplate from "../templates/Template";
import Temp_MessagesTable from "./Temp_MessagesTable";
import React from "react";

const Temp_MessagesPage = (props) => {
    return(
    <PageTemplate title="Temp_Messages List">
        <Temp_MessagesTable/>
    </PageTemplate>)
}
export default Temp_MessagesPage;
