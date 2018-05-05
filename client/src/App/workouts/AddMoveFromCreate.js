import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postMove } from '../../redux/moves';

class AddMoveFromCreate extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                target: "",
                type: "",
                description: "",
                imgUrl: ""
            }
        }
        this.state = this.initialState;
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.postMove(this.state.inputs);
        this.props.addFromCreate();
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }
    formReset = (e) => {
        this.setState(this.initialState)
    }

    render() {
        let { name, target, type, description, imgUrl } = this.state.inputs
        return (
            <div className='addFromCreate'>
                <div className='addFromCreateContent'>
                <button className='close' onClick={this.props.addFromCreate}>&times;</button>
                    <div className='addFromCreateTitle'>
                        Add Move To:
                        <div className='addFromCreateName'>{this.props.workoutName}</div>
                    </div>
                    <form onSubmit={this.handleSubmit} className='workoutForm'>
                        <input onChange={this.handleChange} name='name' value={name} placeholder='Workout Name' type="text" />
                        <input onChange={this.handleChange} name='target' value={target} placeholder='Target' type="text" />
                        <input onChange={this.handleChange} name='type' value={type} placeholder='Type' type="text" />
                        <textarea rows='5' cols='50' onChange={this.handleChange} name='description' value={description} placeholder='Description' type="text" />
                        <input onChange={this.handleChange} name='imgUrl' value={imgUrl} placeholder='Image Url' type="text" />
                        <div className='formButtonsContainer'>
                            <input className='submit' type="submit" />
                            <input onClick={this.formReset} className='reset' type="reset" />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default connect(null, { postMove })(AddMoveFromCreate)