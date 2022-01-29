import { Typography, Modal as MuiModal, Button } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";

interface ModalProps {
    open: boolean;
    onClose?: ((event: {}, reason: "backdropClick" | "escapeKeyDown") => void) | undefined;
    id: number;
}


const Modal: FC<ModalProps> = ({ open, onClose, id }) => { 
    const dispatch = useDispatch();
    const { deleteUser } = bindActionCreators(actionCreators, dispatch); 

    const onDeleteUser = useCallback(() => {
      deleteUser(id);
      onClose?.({}, "backdropClick");
    }, [id, deleteUser, onClose]);

    return (
      <MuiModal open={open} onClose={onClose}>
        <>
          <Box>
            <Typography>{`Are you sure you want to delete user ${id}?`}</Typography>
          </Box>
          <Button onClick={onDeleteUser}>Delete</Button>
        </>
      </MuiModal>
    );
  }

export default Modal;
  