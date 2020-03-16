import React, { Component } from 'react'
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

class home extends Component {

    state = {
        screams: null
    }

    componentDidMount() {
        axios.get('/screams')
            .then((res) => {
                this.setState({
                    screams: res.data
                })
            })
            .catch((err) => {
                console.log('Error: ', err);
            })
    }

    render() {
        let recentPostsMarkup = this.state.screams ? (
            this.state.screams.map((post) => {
                return <p>{post.body}</p>;
            })
        ) : <p>Loading...</p>
        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile...</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
