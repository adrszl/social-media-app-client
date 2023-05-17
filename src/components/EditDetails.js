import React, { Component } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from 'react-redux';
import { editUserDetails } from "../redux/actions/userActions";

// Material UI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

// Icons
import EditIcon from '@material-ui/icons/Edit';

const styles = (theme) => ({
  ...theme
});

class EditDetails extends Component {
  state = {
    bio: '',
    website: '',
    location: '',
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });

    this.state.mapUserDetailsToState(credentials);
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  componentDidMount() {
    const { credentials } = this.props;

    this.state.mapUserDetailsToState(credentials);
  }

  mapUserDetailsToState = (credentials) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '', 
      website: credentials.website ? credentials.website : '', 
      location: credentials.location ? credentials.location : ''
    });
  }

  handleChange = (event) => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      website: credentials.website ? credentials.website : '',
      location: credentials.location ? credentials.location : ''
    });
  }

  handleSubmit = () => {
    const userDetails = {
      bio: this.state.bio,
      website: this.state.website,
      location: this.state.location
    };

    this.props.editUserDetails(userDetails);
    this.handleClose()
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Edit details" placement="top">
          <IconButton onClick={ this.handleOpen } className={ classes.button }>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
            <DialogTitle>Edit your details</DialogTitle>
            <DialogContent>
              <form>
                <TextField
                  name="bio"
                  type="text"
                  label="Bio"
                  multiline
                  rows="3"
                  placeholder="A short bio about yourself"
                  className={classes.TextField}
                  value={this.state.bio}
                  onChange={this.handleChange}
                  fullWidth />
                <TextField
                  name="website"
                  type="text"
                  label="Website"
                  placeholder="Link to your website"
                  className={classes.TextField}
                  value={this.state.website}
                  onChange={this.handleChange}
                  fullWidth />
                <TextField
                  name="location"
                  type="text"
                  label="Location"
                  placeholder="Your location"
                  className={classes.TextField}
                  value={this.state.location}
                  onChange={this.handleChange}
                  fullWidth />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Save
              </Button>
            </DialogActions>
        </Dialog>
      </React.Fragment>
    )
  }
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  credentials: state.user.credentials
})

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
