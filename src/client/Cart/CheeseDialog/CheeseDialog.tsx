import React from 'react';
//Material UI Components
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import { makeStyles } from '@material-ui/styles';
import { CartItemType } from '../../App';

const useStyles = makeStyles({
    root: {
        textAlign: 'center',
    },
});

type DialogProps = {
    onClose: () => void;
    open: boolean;
    item: CartItemType;
}

const CheeseDialog: React.FC<DialogProps> = (props) => {
    const { onClose, open, item } = props;
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog
            onClose={handleClose}
            open={open}
        >
            <DialogTitle className='dialog-title'
                style={{ textAlign: 'center' }}
            >
                {item.title}
            </DialogTitle>
            <div className={classes.root}>
                <img src={item.image} alt={item.title}
                    height='200'
                    width='200'
                />
                <DialogContentText>Description: {item.description}</DialogContentText>
                <DialogContentText>Category: {item.category}</DialogContentText>
                <DialogContentText>Price: ${item.price}</DialogContentText>
            </div>
        </Dialog>
    );
}

export default CheeseDialog
