import React, { Component } from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';

// MATERIAL UI COMPONENTS
import Button from '@material-ui/core/Button';

// ICONS

class Profile extends Component {
    render() {

        const { classes, user: { credentials: { handle, createdAt, imageUrl, bio, website, location }, loading } } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={ classes.paper }>
                <div className={classes.profile}>
                    <div className="profile-image"></div>
                </div>
            </Paper>
        ) : ()) : (<p>Loading...</p>);

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.PropTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
