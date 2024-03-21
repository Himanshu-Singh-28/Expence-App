import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Container
} from "@mui/material";

const DeleteHandle = ({ isDelete, setIsDelete, deleteHandler, deleteId }) => {
  return (
    <Dialog open={isDelete} onClose={() => setIsDelete((prev) => !prev)} hideBackdrop>
      <DialogContent>
        <DialogContentText>Do you want to Delete?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Container sx={{
            display: 'flex',
            gap:"2rem"
        }}>
          <Button
            onClick={() => deleteHandler(deleteId)}
            color="success"
            variant="contained"
            sx={{
                alignSelf:"flex-start"
            }}
          >
            Yes
          </Button>
          <Button
            onClick={() => setIsDelete((prev) => !prev)}
            color="error"
            variant="outlined"
            sx={{
                alignSelf:"flex-end"
            }}
          >
            Cancle
          </Button>
        </Container>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteHandle;
