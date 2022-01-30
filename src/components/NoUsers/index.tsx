import { Alert } from "@mui/material";
import { FC } from "react";

const NoUsers: FC = () => {
    return (
        <Alert severity="error">No Users.</Alert>
    )
}

export default NoUsers;