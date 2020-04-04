import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

// REDUX
import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userActions';

// MATERIAL UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import reactLogo from '../img/logo192.png'
import { CircularProgress } from '@material-ui/core';

const styles = (theme) => ({
    ...theme.formPalette
});

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history);
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes, UI: { loading } } = this.props;
        const { error } = this.state;
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
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))