import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import { LetterFormdata} from '../data/data'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import {getAccounts } from '../utils/Common';
import Memberfeemodel from '../models/Memberfeemodel';
import Depositmodel from '../models/Depositmodel';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "30px",
        marginBottom: "10px"
    },
    root: {
        flexGrow: 1,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

function Transactionform() {
    const custidfrom = useRef(null);
    const classes = useStyles();
    const [accounts, setAccounts] = useState(null);
    const [cust, setCust] = useState('');
    const date = new Date();

    useEffect(() => {
        const acc = getAccounts();
        console.log(acc);
        setAccounts(JSON.parse(acc));
        return () => {
        }
    }, [])

    function getUser() {
        const form = custidfrom.current;
        const id = form['customer_id'].value;
        const b = accounts.find((item) => item.id == id);
        if (b) {
            setCust(b);
            //alert(b.custName);
            form['customer_name'].value = b.custName + ', ' + b.custJobTitle + ', ' + b.ecBranch;
        } else {
            alert("Pleae enter valied id");
            form['customer_name'].value = '';
        }
    }

    return (
        <>
            <Paper style={{ marginBottom: 10, padding: 20 }} elevation={5}>

                <Typography variant="h6" gutterBottom>
                    {LetterFormdata.tran_title}
                </Typography>
                <form ref={custidfrom} className={classes.form} >
                    <Grid container >
                        <Grid item xs={12} sm={2}>
                            <TextField
                                id="customer_id"
                                name="customer_id"
                                label={LetterFormdata.customer_id}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 5, marginLeft: 10, marginBottom: 20 }}
                                size="large"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                                type="button"
                                onClick={getUser}

                            >
                                {LetterFormdata.get}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                style={{ marginBottom: 40, marginLeft: 10 }}
                                id="customer_name"
                                name="customer_name"
                                fullWidth
                                style={{ background: '#FFE082' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                        <Memberfeemodel cust={cust}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                           
                            <Depositmodel cust={cust}/>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

export default Transactionform
