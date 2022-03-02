import PageTemplate from "../templates/Template";
import Trip_ImagesTable from "./Trip_ImagesTable";
import React from "react";

const Trip_ImagesPage = (props) => {
    return(
    <PageTemplate title="Trip_Images List">
        <Trip_ImagesTable/>
    </PageTemplate>)
}
export default Trip_ImagesPage;
