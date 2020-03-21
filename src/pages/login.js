import React, { Component } from 'react';
import PropTypes from 'prop-types';

// MATERIAL UI
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import reactLogo from '../img/logo192.png'

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

    handleSubmit = () => {
        console.log('submitted');
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { classes } = this.props;
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
                            value={this.state.email}
                            onChange={this.handleChange} />
                        <TextField 
                            fullWidth
                            id="password" 
                            name="password" 
                            type="password" 
                            label="Password" 
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange} />
                        <Button type="submit" variant="contained" color="primary" className={classes.button}>
                            Login
                        </Button>
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