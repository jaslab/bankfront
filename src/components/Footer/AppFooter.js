import React from 'react'
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#4A148C',
        marginTop: theme.spacing.unit * 2,
        padding: `${theme.spacing.unit * 1}px 0`,
        color:'#fff',
        position:'fixed',
        bottom: 0,
        width:'100%'
    }
}));

function AppFooter() {

    const classes = useStyles();
    return (
        <footer className={classes.footer} elevation={3}>
            <Grid item xs={12} style={{ textAlign: "center" }}>
            <Typography component="p">
                @2021 All right received by Election Commission of Sri Lanka
          </Typography>
            </Grid>
        
        </footer>
    )
}

export default AppFooter
