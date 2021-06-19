import React, { useState } from 'react'
import '../css/loginform.css';
import { loginformdata, Apidata } from '../data/data'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { setUsers, setUserSession, getToken, setAccounts, setLoans } from '../utils/Common';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "30px"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


function Loginform() {
    const classes = useStyles();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let loginSchema = yup.object().shape({
        username: yup.string().required(),
        password: yup.string().required()
    });

    const { register, handleSubmit, errors } = useForm({
        validationSchema: loginSchema
    });

    function initData(path,awt){
        axios.get(path + 'v1/account/all',  { headers: { "Authorization": `Bearer ${awt}` }})
        .then(response => {
            const result = response.data;
            setAccounts(JSON.stringify(result))
            console.log(result);
        })
        .catch(err=>{
        });
        axios.get(path + 'v1/loan/all',  { headers: { "Authorization": `Bearer ${awt}` }})
        .then(response => {
            const result1 = response.data;
            setLoans(JSON.stringify(result1));
            console.log(result1);
        })
        .catch(err=>{
        })
    }
   
    
    function onSubmit(data) {
        const apipath = Apidata.api;
        // display form data on success
        setError(null);
        setLoading(true);
        axios.post(apipath + 'api/auth/signin', { username: data.username, password: data.password }).then(response => {
            setLoading(false);
            setUserSession(response.data.jwt, response.data.username, response.data.id, response.data.nic, response.data.email, response.data.mobileno, response.data.district, response.data.fullName, response.data.roles);
            initData(apipath,response.data.jwt);
            history.push("/dashboard");

        }).catch(error => {
            setLoading(false);
            
           // if (error.response.status === 401) setError(error.response.data.message);
           // else setError("Something went wrong. Please try again later.");
        });
    }


    return (
        <>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h5" variant="h5">
                        {loginformdata.title}
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            inputRef={register}
                            id="username"
                            label={loginformdata.username}
                            name="username"
                            autoFocus
                            error={errors.username ? true : false}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register}
                            required
                            fullWidth
                            name="password"
                            label={loginformdata.password}
                            type="password"
                            id="password"
                            error={errors.password ? true : false}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {loginformdata.login}
                        </Button>

                    </form>
                </div>

            </Container>
        </>
    )
}

export default Loginform;
