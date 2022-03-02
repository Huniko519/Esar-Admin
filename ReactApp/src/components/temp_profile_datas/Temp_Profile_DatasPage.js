import PageTemplate from "../templates/Template";
import Temp_Profile_DatasTable from "./Temp_Profile_DatasTable";
import React from "react";

const Temp_Profile_DatasPage = (props) => {
    return(
    <PageTemplate title="Temp_Profile_Datas List">
        <Temp_Profile_DatasTable/>
    </PageTemplate>)
}
export default Temp_Profile_DatasPage;
