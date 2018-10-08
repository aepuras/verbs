import React from 'react';
import classnames from 'classnames';
import data from '../data/words';

class Words extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            words: data[0].items,
        }
    }

    render () {
    	return (
			<div>words OK</div>
    	);
    }
}

export default Words;