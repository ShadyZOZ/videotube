import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

const VideoGridList = ({videos}) => (
    <div>
        <GridList>
            {videos.map((item, i) => (
                <a href={'/movies/' + item.videoName + '/1'} key={i}>
                    <GridTile title={item.videoName} >
                        <img src={item.img} />
                    </GridTile>
                </a>
            ))}
        </GridList>
    </div>
);

export default VideoGridList;