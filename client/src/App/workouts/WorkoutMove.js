import React, { Component } from 'react'

class WorkoutMove extends Component {
    constructor(props){
        super(props);
        this.initialState = {}
    }

    render() {
        // console.log(this.props)
        const {name,target,type,description,imgUrl} = this.props
        return (
            <div>
                <h2>{name}</h2>
                <img src={imgUrl} alt={name}/>
                <h4>Target:</h4>
                <p>{target}</p>
                <h4>Type:</h4>
                <p>{type}</p>
                <h4>Description:</h4>
                <p>{description}</p>
            </div>
        )
    }
}



export default WorkoutMove;