import React from 'react';
import Chip from 'material-ui/Chip';

const PlayList = ({urls}) => {
    return (<div>
        {urls.map((obj, i) => (
            <Chip
                style={{ margin: 4, float: 'left' }}
                key={i}
                onTouchTap={() => { location.href = obj.url }}
                backgroundColor={obj.watched ? '#E0F7FA':'#80DEEA'}
            >
                {obj.text}
            </Chip>)
        )}
    </div>)
}

export default PlayList;