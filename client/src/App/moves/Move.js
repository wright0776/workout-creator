import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMove } from '../../redux/moves';

class Move extends Component {
    constructor(props) {
        super(props);
        this.initialState = {}
    }

    componentDidMount() {
        this.props.getMove(this.props.match.params.moveId)
    }

    render() {
        const { loading, errMsg, currentMove } = this.props
        if (loading) return <div className='loading'>...loading</div>
        if (errMsg) return <div className='errMsg'>{errMsg}</div>
        else {
            const { name, type, target, description, imgUrl } = currentMove
            return (
                <div>
                    <h2 className='pageTitle'>{name}</h2>
                    <div className='navigationBar'>
                        <Link className='navigationBarLink' to='/moves'>Moves</Link>
                    </div>
                    <div className='list'>
                        <h2>{name}</h2>
                        <img src={imgUrl} alt={name} />
                        <h4>Target:</h4>
                        <p>{target}</p>
                        <h4>Type:</h4>
                        <p>{type}</p>
                        <h4>Description:</h4>
                        <p>{description}</p>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return state.moves
}

export default connect(mapStateToProps, { getMove })(Move)
