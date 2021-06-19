import React, { useState, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import { LetterFormdata, Apidata } from '../data/data'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId, getLoans } from '../utils/Common';
import Loanfrommodel from '../models/Loanfrommodel';
import Loanpaymentplanmodel from '../models/Loanpaymentplanmodel';
import Loanpaidmodel from '../models/Loanpaidmodel';

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

function LoanTransactionForm() {
    const loanform = useRef(null);
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loans, setLoans] = useState(null);
    const [loan, setLoan] = useState('');
    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    let accSchema = yup.object().shape({
        //customer_id: yup.string(),
        loan_details: yup.string(),
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: accSchema
    });

    useEffect(() => {
        const loans = getLoans();
        console.log(loans);
        setLoans(JSON.parse(loans));
        return () => {
        }
    }, [])

    function getUser() {
        const form = loanform.current;
        const id = form['loan_id'].value;
        const b = loans.find((item) => item.id == id);
        if (b) {
            setLoan(b);
            alert(b.id);
            form['loan_details'].value ='Loan Id: '+ b.id + ', ' + 'Loan Amount: '+b.loanAmount + ', ' + 'Loan Periods: '+ b.periods;
        } else {
            alert("Pleae enter valied loan id");
            form['loan_details'].value = '';
        }
    }

    return (
        <>
            <Paper style={{ marginBottom: 10, padding: 20 }} elevation={5}>

                <Typography variant="h6" gutterBottom>
                    {LetterFormdata.tran_loan_title}
                </Typography>
                <form ref={loanform} className={classes.form} >
                    <Grid container >
                        <Grid item xs={12} sm={2}>
                            <TextField
                                id="loan_id"
                                name="loan_id"
                                inputRef={register}
                                label={LetterFormdata.loan_id}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
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
                                {LetterFormdata.get_details}
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                style={{ marginBottom: 40, marginLeft: 10 }}
                                id="loan_details"
                                name="loan_details"
                                inputRef={register}
                                fullWidth
                                style={{ background: '#FFE082' }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Loanpaymentplanmodel loanid={loan.id}/>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Loanpaidmodel loanid={loan.id} />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Loanfrommodel />
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </>
    )
}

export default LoanTransactionForm
