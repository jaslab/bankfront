import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { LetterFormdata, Apidata } from '../data/data'
import Dipositform from '../forms/Dipositform';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function Depositmodel(props) {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Dipositform cust={props.cust} onChange={handleClose}/>
        </div>
    );

    return (
        <div>
                                <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 30, marginLeft: 10 }}
                                size="large"
                                className={classes.button}
                                startIcon={<AddIcon />}
                                type="button"
                                onClick={handleOpen}
                            >
                                {LetterFormdata.diposit_fee}
                            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                
            >
                {body}
            </Modal>
        </div>
    )
}

export default Depositmodel
