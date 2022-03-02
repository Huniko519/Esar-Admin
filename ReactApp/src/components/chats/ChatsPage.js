import PageTemplate from "../templates/Template";
import ChatsTable from "./ChatsTable";
import React from "react";

const ChatsPage = (props) => {
    return(
    <PageTemplate title="Chats List">
        <ChatsTable/>
    </PageTemplate>)
}
export default ChatsPage;
