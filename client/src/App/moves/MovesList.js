import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoves } from '../../redux/moves';

class MovesList extends Component {
    constructor(props) {
        super(props);
        this.initialState = {}
    }

    componentDidMount() {
        this.props.getMoves()
    }

    render() {
        const { loading, errMsg, data } = this.props
        if (loading) {
            return (
                <div className='loading'>...loading</div>
            )
        }
        if (errMsg) {
            return (
                <div className='errMsg'>{errMsg}</div>
            )
        } else {
            return (
                <div className='movesList'>
                    <h2 className='pageTitle'>Exercises</h2>
                    <div className='back'>
                        <Link to='/'>Main Menu</Link>
                        <input className='search' placeholder='search' type="search" />
                    </div>
                    <div className='moveListContainer'>
                        {data.map((item,i) =>
                            <div className='moveInList' key={item._id + i}>
                                <Link to={`/moves/${item._id}`} key={item._id}>
                                    {item.name}
                                </Link>
                                <button>...</button>
                            </div>
                        )}
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return state.moves
}

export default connect(mapStateToProps, { getMoves })(MovesList);