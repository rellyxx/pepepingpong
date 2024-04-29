import { Modal } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import { ReactNode } from 'react';
import Image from "next/image"
import close from "~~/public/img/close.svg";




interface Props {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    width?: number;
    title?: string;
    loading?: boolean
}

const CustomModal = (props: Props) => {

    const { open, onClose, children, width = 400, title, loading=false } = props;


    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            
        >
            <Box sx={
                {
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: width,
                    bgcolor: 'background.paper',
                    border: '0px solid #000',
                    boxShadow: 24,
                    p: 2,
                    borderRadius: 2
                }
            }>
                <div className='flex justify-between items-center pb-3'>
                    <div className='text-base font-bold'>{title}</div>
                    <div onClick={onClose} className='cursor-pointer'>
                        <Image src={close} alt="close"/>
                    </div>
                </div>
                <span style={{display: loading?'':'none'}} className="loading loading-dots loading-lg"></span>
                {children}

            </Box>
        </Modal>
    )
}

export default CustomModal;