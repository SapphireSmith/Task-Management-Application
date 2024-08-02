
import React from 'react';
import Modal from 'react-modal';
import { Button, Typography, Box } from '@mui/material';

Modal.setAppElement('#root');

interface ConfirmationModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onRequestClose, onConfirm, message }) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmation"
            style={{
                content: {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '90%',
                    maxWidth: '400px',
                    height: "170px",
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                },
            }}
        >
            <Typography variant="h6" gutterBottom>
                {message}
            </Typography>
            <Box display="flex" justifyContent="space-between" mt={2}>
                <Button variant="contained" color="primary" onClick={onConfirm}>
                    Confirm
                </Button>
                <Button variant="outlined" color="secondary" onClick={onRequestClose}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
};

export default ConfirmationModal;
