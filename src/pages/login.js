import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// MATERIAL UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import reactLogo from '../img/logo192.png'
import { CircularProgress } from '@material-ui/core';

const styles = {
    form: {
        textAlign: 'center'
    },
    image: {
        margin: '20px auto'
    },
    pageTitle: {
        fontSize: '3rem',
        margin: '20px auto'
    },
    textField: {
        margin: '10px auto'
    },
    button: {
        position: 'relative'
    },
    progreee: {
        position: 'absolute'
    },
    customError: {
        color: 'red',
        margin: '1rem auto'
    }
}

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loading: false,
            error: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        axios.post('/login', userData)
            .then((res) => {

                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({ error: error.response.data, loading: false })
            })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;
        const { error, loading } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={reactLogo} alt='react logo' className={classes.image} />
                    <Typography variant="h1" className={classes.pageTitle}>Login</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                            fullWidth
                            id="email" 
                            name="email" 
                            type="email" 
                            label="Email" 
                            className={classes.textField}
                            helperText={error.email}
                            error={error.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange} />
                        <TextField 
                            fullWidth
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            helperText={error.password}
                            error={error.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange} />
                        { error.general && (
                            <Typography variant="body2" className={classes.customError}>
                                { error.general }
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            {loading ? (
                                <CircularProgress size={30} className={classes.progress} />
                            ) : 'Login'}
                        </Button>
                        <br /><small>Don't have an account? Sign up <Link to="/signup">here</Link></small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login);