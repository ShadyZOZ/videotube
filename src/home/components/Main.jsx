import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import request from 'axios'
import MainAppBar from './AppBar.jsx'
import VideoGridList from './VideoList.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            videos: []
        };
    }
    componentWillMount() {
        request.get('/api' + location.pathname).then((resp) => {
            this.setState({
                videos: resp.data.videos
            })
        })
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <MainAppBar />
                    <VideoGridList videos={this.state.videos} />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default AppComponent;
