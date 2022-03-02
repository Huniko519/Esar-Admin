import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const Loading = () => <Backdrop open><CircularProgress color="primary" /></Backdrop>