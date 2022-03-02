import PageTemplate from "../templates/Template";
import Chat_MessagesTable from "./Chat_MessagesTable";
import React from "react";

const Chat_MessagesPage = (props) => {
    return(
    <PageTemplate title="Chat_Messages List">
        <Chat_MessagesTable/>
    </PageTemplate>)
}
export default Chat_MessagesPage;
