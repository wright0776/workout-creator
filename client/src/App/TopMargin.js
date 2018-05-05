import React, { Component } from 'react'

class TopMargin extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render () {
        return (
                <div className='dotsButtonCont'>
                    <div className='dotsButton'>
                        <div className='dot'></div>
                        <div className='dot'></div>
                        <div className='dot'></div>
                    </div>
                </div>
        )
    }
}

export default TopMargin;