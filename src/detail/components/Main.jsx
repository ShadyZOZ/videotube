/*eslint no-console:0 */
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Subheader from 'material-ui/Subheader';
import request from 'axios'
import MainAppBar from './AppBar.jsx'
import PlayList from './PlayList.jsx'
import Player from './Player.jsx'

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

class AppComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            video: {},
            urls: []
        };
    }
    componentWillMount() {
        request.get('/api' + location.pathname).then((resp) => {
            this.setState(resp.data)
        })
    }
    componentDidMount() {
        request.post('/api' + location.pathname, {action: 'watched'}).then((resp) => {
            if (resp.code == 200) {
                console.log('success')
            }
        })
    }
    render() {
        return (
            <MuiThemeProvider>
                <div>
                    <MainAppBar />
                    <Subheader>{this.state.id + ': ' + this.state.video.name}</Subheader>
                    <Player url={this.state.video.url} />
                    <PlayList urls={this.state.urls} />
                </div>
            </MuiThemeProvider>
        );
    }
}

export default AppComponent;
