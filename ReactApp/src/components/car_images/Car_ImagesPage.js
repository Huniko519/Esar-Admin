import PageTemplate from "../templates/Template";
import Car_ImagesTable from "./Car_ImagesTable";
import React from "react";

const Car_ImagesPage = (props) => {
    return(
    <PageTemplate title="Car_Images List">
        <Car_ImagesTable/>
    </PageTemplate>)
}
export default Car_ImagesPage;
