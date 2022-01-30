import { Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { FC, useCallback } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
import CloseIcon from '@mui/icons-material/Close';

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

    const closeCallback = useCallback(() => {
      onClose?.({}, "backdropClick");
    }, [onClose]);

    return (
      <Dialog open={open} onClose={onClose} fullWidth>
        <DialogTitle>Delete
          {
            <IconButton
              onClick={closeCallback}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
              }}>
              <CloseIcon />
            </IconButton>
          }
        </DialogTitle>
        <DialogContent dividers>
          <Box>
            <Typography>{`Are you sure you want to delete user ${id}?`}</Typography>
          </Box>
          <DialogActions>
            <Button onClick={closeCallback} color="neutral" variant="contained" sx={{ textTransform: 'none' }} >Cancel</Button>
            <Button onClick={onDeleteUser} color="error" variant="contained" sx={{ textTransform: 'none' }} >Delete</Button>
        </DialogActions>
        </DialogContent>
      </Dialog>
    );
  }

export default Modal;
  