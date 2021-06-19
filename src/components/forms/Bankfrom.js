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
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { getToken, getId } from '../utils/Common';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "30px"
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

function Bankfrom() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const date = new Date();
    const formatedDate = `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`

    let accSchema = yup.object().shape({
        //customer_id: yup.string(),
        customer_name: yup.string(),
        Customer_branch: yup.string(),
        Customer_job: yup.string()
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: accSchema
    });

    function onSubmit(data) {
        const apipath = Apidata.api;
        const token = getToken();
        const userId = getId();
        setError(null);
        setLoading(true);
        axios.post(apipath + 'v1/account', {
            id: data.customer_id,
            joinDate: data.reg_date,
            ecBranch: data.Customer_branch,
            custName: data.customer_name,
            custJobTitle: data.Customer_job,
            regFee: data.Customer_reg_fee
        }, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                setLoading(false);
                //alert("Saved");
                NotificationManager.success('Success, Account created',);
                document.getElementById("create-account").reset();
            }).catch(error => {
                setLoading(false);
                NotificationManager.success('Error, Account not created',);
                //if (error.response.status === 401) setError(error.response.data.message);
                //else setError("Something went wrong. Please try again later.");
            });
    }

    return (
        <>
         <NotificationContainer />
            <Paper className={classes.paper} elevation={5}>

                <Typography variant="h6" gutterBottom>
                    {LetterFormdata.bank_title}
                </Typography>
                <form id="create-account" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={3}>
                       
                        <Grid item xs={12} sm={12}>
                        <FormControl component="fieldset">
                                <RadioGroup row aria-label="tran_type" defaultValue="DEBIT" >
                                    <FormControlLabel
                                        name="tran_type"
                                        inputRef={register}
                                        value="DEBIT"
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.debit} />
                                    <FormControlLabel
                                        name="tran_type"
                                        inputRef={register}
                                        value="CREDIT"
                                        control={<Radio color="primary" />}
                                        label={LetterFormdata.credit} />
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={3}>
                             <TextField
                                id="reg_date"
                                name="reg_date"
                                inputRef={register}
                                label={LetterFormdata.bank_date}
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
                                required
                                id="Customer_job"
                                name="Customer_job"
                                inputRef={register}
                                label={LetterFormdata.amt}
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="Customer_branch"
                                name="Customer_branch"
                                inputRef={register}
                                label={LetterFormdata.comment}
                                fullWidth
                                autoComplete="shipping address-level2"
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <TextField
                                required
                                id="Customer_job"
                                name="Customer_job"
                                inputRef={register}
                                label={LetterFormdata.depositer_name}
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

export default Bankfrom
