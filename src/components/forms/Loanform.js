import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import { LetterFormdata, Apidata } from '../data/data'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import Functions from '@material-ui/icons/Functions';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../utils/Common';
import LoanDetails from '../contents/LoanDetails';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';


const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "30px",
        marginBottom: 10

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

function Loanform() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loanstate, setLoanstate] = useState(true);
    const [loan, setLoan] = useState(null);
    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    let loanSchema = yup.object().shape({
        //customer_id: yup.string(),
        loan_type: yup.string(),
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: loanSchema
    });

    function calculateIntrest() {
        alert("Calculate");
    }

    function onSubmit(data) {
        const apipath = Apidata.api;
        const token = getToken();
        const userId = getId();
        setError(null);
        setLoading(true);
        axios.post(apipath + 'v1/loan', {
            loanAccount: data.customer_id,
            loanDate: data.reg_date,
            loan_Title: data.loan_type,
            loanAmount: data.loan_amt,
            rate: data.loan_interest,
            periods: data.loan_period,
            loanComment: data.loan_comment,
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                setLoading(false);
                document.getElementById("create-account").reset();
                NotificationManager.success('Success, Loan was created',);
                setLoan(response.data);
                setLoanstate(false);
                //console.log(loan);
            }).catch(error => {
                setLoading(false);
                NotificationManager.success('Error, Loan was not created',);
                
                //if (error.response.status === 401) setError(error.response.data.message);
               // else setError("Something went wrong. Please try again later.");
            });
    }
    return (
        <>
            <NotificationContainer />
            {loanstate &&
                <Paper className={classes.paper} elevation={5}>

                    <Typography variant="h6" gutterBottom>
                        {LetterFormdata.loan_title}
                    </Typography>
                    <form id="create-account" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="reg_date"
                                    name="reg_date"
                                    inputRef={register}
                                    label={LetterFormdata.reg_date}
                                    type="date"
                                    defaultValue={formatedDate}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={3}>
                                <TextField
                                    id="customer_id"
                                    name="customer_id"
                                    inputRef={register}
                                    label={LetterFormdata.customer_id}
                                    fullWidth
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="customer_name"
                                    name="customer_name"
                                    inputRef={register}
                                    label={LetterFormdata.customer_name}
                                    fullWidth
                                    autoComplete="given-name"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="loan_type"
                                    name="loan_type"
                                    inputRef={register}
                                    label={LetterFormdata.loan_type}
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="loan_amt"
                                    name="loan_amt"
                                    inputRef={register}
                                    label={LetterFormdata.loan_amt}
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="loan_interest"
                                    name="loan_interest"
                                    inputRef={register}
                                    label={LetterFormdata.loan_interest}
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>
                            <Grid item xs={12} sm={3}>
                                <TextField
                                    required
                                    id="loan_period"
                                    name="loan_period"
                                    inputRef={register}
                                    label={LetterFormdata.loan_period}
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                />
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <TextField
                                    required
                                    id="loan_comment"
                                    name="loan_comment"
                                    inputRef={register}
                                    label={LetterFormdata.loan_comment}
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
            }

            { !loanstate && <LoanDetails {...loan} />}

        </>

    )
}

export default Loanform
