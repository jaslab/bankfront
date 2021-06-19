import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import { LetterFormdata, Apidata } from '../data/data'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId, getAccounts } from '../utils/Common';
import { NotificationContainer, NotificationManager } from 'react-notifications';

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

function Memberfee(props) {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let memberFeeSchema = yup.object().shape({
        tran_year: yup.string(),
        tran_month: yup.string(),
        tran_amt1: yup.string(),
        tran_amt2: yup.string(),
        tran_amt3: yup.string(),
        tran_total: yup.string()
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: memberFeeSchema
    });

    function onSubmit(data) {
        const apipath = Apidata.api;
        const token = getToken();
        const userId = getId();
        setError(null);
        setLoading(true);
        axios.post(apipath + 'v1/member_fee', {
            accId: props.cust.id,
            year:data.tran_year,
            month:data.tran_month,
            amt1:data.tran_amt1,
            amt2:data.tran_amt2,
            amt3:data.tran_amt3,
            total:data.tran_total,
            enterUserId:userId,
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                setLoading(false);
                NotificationManager.success('Success, Member fee saved',);
                console.log(response.data);
            }).catch(error => {
                setLoading(false);
                NotificationManager.success('Error, Member not saved',);
                
               // if (error.response.status === 401) setError(error.response.data.message);
               // else setError("Something went wrong. Please try again later.");
            });

    }

    return (
        <>
        <NotificationContainer/>
            <Paper className={classes.paper} elevation={5}>
                        <Typography variant="h6" gutterBottom>
                            {LetterFormdata.member_fee} : {props.cust.id}{props.cust.custName}
                        </Typography>
                        <form id="create-account" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={1}>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="tran_year"
                                        name="tran_year"
                                        inputRef={register}
                                        label={LetterFormdata.year}
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="tran_month"
                                        name="tran_month"
                                        inputRef={register}
                                        label={LetterFormdata.month}
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}></Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        
                                        id="tran_amt1"
                                        name="tran_amt1"
                                        inputRef={register}
                                        label={LetterFormdata.tran_amt}
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        
                                        id="tran_amt2"
                                        name="tran_amt2"
                                        inputRef={register}
                                        label={LetterFormdata.tran_amt}
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        
                                        id="tran_amt3"
                                        name="tran_amt3"
                                        inputRef={register}
                                        label={LetterFormdata.tran_amt}
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        required
                                        id="tran_total"
                                        name="tran_total"
                                        inputRef={register}
                                        label={LetterFormdata.total}
                                        fullWidth
                                        autoComplete="shipping address-level2"
                                    />
                                </Grid>

                                <Grid container justify="flex-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        startIcon={<SaveIcon />}
                                        type="submit"
                                    >
                                        {LetterFormdata.save}
                                    </Button>
                                </Grid>

                            </Grid>
                        </form>

                    </Paper>
        </>
    )
}

export default Memberfee
