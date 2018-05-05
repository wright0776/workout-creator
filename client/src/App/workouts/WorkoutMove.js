import React, { Component } from 'react'

class WorkoutMove extends Component {
    constructor(props) {
        super(props);
        this.initialState = {}
    }

    render() {
        // console.log(this.props)
        const { name, target, type, description, imgUrl } = this.props
        return (
            <div className='workoutMove'>
                <h2>{name}</h2>
                <img className='moveImg' src={imgUrl} alt={name} />
                <div className='moveDetail'>
                    <div className='type'>Type:</div>
                    <div>{type}</div>
                </div>
                <div className='moveDetail'>
                    <div className='target'>Target:</div>
                    <div>{target}</div>
                </div>
                <h4 className='descriptionLabel'>Description:</h4>
                <p className='description'>{description}</p>
            </div>
        )
    }
}



export default WorkoutMove;