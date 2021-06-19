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
import Moment from 'moment';
import LoanPayPlan from './LoanPayPlan';


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
function LoanDetails(props) {

    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loan, setLoan] = useState(null);
    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    return (
        <>
            <Paper className={classes.paper} elevation={5}>
                <Typography variant="h6" gutterBottom>
                    {LetterFormdata.loan_detail}
                </Typography>
                <Grid container>
                    <Grid item xs={1}>
                        <Typography>
                            {LetterFormdata.loan_id}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>
                            {props.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>
                            {LetterFormdata.loan_date}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {Moment(props.loanDate).format('MMMM Do YYYY, h:mm:ss a')}
                        </Typography>
                    </Grid>

                    <Grid item xs={2}>
                        <Typography>
                            {LetterFormdata.loan_type}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {props.loan_Title}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>
                            {LetterFormdata.customer_name}
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography>
                            {props.loanAccount.custName}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>
                            {LetterFormdata.Customer_job}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography>
                            {props.loanAccount.custJobTitle}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>
                            {LetterFormdata.loan_amt}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>
                            {props.loanAmount}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography>
                            {LetterFormdata.loan_interest}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>
                            {props.rate}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>
                            {LetterFormdata.loan_period}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography>
                            {props.periods}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.paper} elevation={5}>
                <Typography variant="h6" gutterBottom>
                    {LetterFormdata.pay_plan}
                </Typography>
                <LoanPayPlan loanId={props.id}/>
            </Paper>
        </>
    )
}

export default LoanDetails
