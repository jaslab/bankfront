import React, { useState } from 'react'
import { loginformdata, Apidata } from '../data/data'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { setUsers, setUserSession, getToken } from '../utils/Common';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Accountform from '../forms/Accountform'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: "30px"
    },
}));

function AccountCont() {
    const clases=makeStyles();
    return (
        <>
        <Paper className={clases.paper}>
            <Accountform/>
        </Paper>
        </>
    )
}

export default AccountCont
