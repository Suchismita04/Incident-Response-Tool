
import React from "react";
import Modal from "@mui/material/Modal";
import LogIn from "../pages/User/LogIn";
import { Box } from "@mui/material";




const ModalComponent = ({ open, handleClose, component }) => {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "transparent",
    };


    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    {component}

                </Box>
            </Modal>


        </>)
}

export default ModalComponent