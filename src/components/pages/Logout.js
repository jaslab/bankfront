import React from 'react'
import { Redirect } from 'react-router-dom';
import { removeUserSession } from '../utils/Common';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { appbardata } from '../data/data';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    links: {
        color: "#fff",
    }
}));

function Logout() {
    const classes = useStyles();
    const history = useHistory();
    
    function loadLogin() {
        removeUserSession();
        history.push('/');
    }

    return (
        <>
            <Button  className={classes.links} variant="" color="#fff" onClick={loadLogin}>
                {appbardata.logout}
            </Button>
        </>
    )
}

export default Logout;
