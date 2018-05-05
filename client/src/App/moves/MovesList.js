import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMoves } from '../../redux/moves';

class MovesList extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            open: false,
            opened: ""
        }
        this.state = this.initialState;
    }

    componentDidMount() {
        this.props.getMoves()
    }

    openMenu = (e,move) => {
        let {open,opened} = this.state;
        console.log(open, opened)
        if(open){
            if(move._id !== opened){
                document.getElementById(opened).style.animation = "outToRight 1s"
            } else {
                document.getElementById(move._id).style.animation = "outToRight 1s"
            }
            setTimeout(() => {
                this.setState(prevState => ({
                    open: !prevState.open,
                    opened: move ? move._id : ''
                }))
            }, 500)
        }
        else {
        this.setState(prevState => ({
            open: !prevState.open,
            opened: move ? move._id : ''
        }))}
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
                    <h2 className='pageTitle'>Moves</h2>
                    <div className='navigationBar'>
                        <Link className='navigationBarLink' to='/'>Main Menu</Link>
                        {/*  <input className='search' placeholder='search' type="search" /> */}
                    </div>
                    <div className='listOfMoves'>
                        {data.map((item,i) =>
                            <div className='moveInList' key={item._id + i}>
                                <Link className='moveLinkInList' to={`/moves/${item._id}`} key={item._id}>
                                    {item.name}
                                </Link>
                                <button onClick={(e)=>this.openMenu(e,item)} className='moveButtonInList'>...</button>
                                {this.state.open && this.state.opened === item._id ?
                                <div id={item._id} className='moveMenu'>
                                    <button onClick={(e)=>this.openMenu(e,item)} className='close2'>&times;</button>
                                    <button className='slideMenuButton'>Edit</button>
                                    <button className='slideMenuButton'>Delete</button>
                                </div> 
                                : null}
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