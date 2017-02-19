import React from 'react';
import AppBar from 'material-ui/AppBar';

const MainAppBar = () => (
    <AppBar
        title="Video Tube"
        showMenuIconButton={false}
        onTitleTouchTap={() => {
            location.href = '/'
        }}
    />
);

export default MainAppBar;