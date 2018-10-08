import React, { Component } from 'react'
import { connect } from 'react-redux';
// action imports
import { USER_ACTIONS } from '../../redux/actions/userActions';
// component imports
import TutorNav from '../TutorNav/TutorNav';
import AdminNav from '../AdminNav/AdminNav';
import SelectLocationDropdown from './SelectLocationDropdown';

const mapStateToProps = state => ({
    user: state.user,
});

class SelectLocationPage extends Component {
    componentDidMount() {
        this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
    }

    // componentDidUpdate runs after props and state have changed.
    //If we arent loading the user call AND we dont have a user, kick us out to home
    componentDidUpdate() {
        console.log(this.props.user.permissions);

        if (!this.props.user.isLoading && this.props.user.userName === null) {
            this.props.history.push('/login');
        }
    }

    render() {
        let content = null;
        let nav = null;

        if (this.props.user.permissions === 1) {
            nav = (
                    <TutorNav />
            )
        } else if (this.props.user.permissions === 2) {
            nav = (
                    <AdminNav history={this.props.history} />
            )
        }

        if (this.props.user.userName) {
            content = (
                <div>
                    <h1>Select Location</h1>
                    <SelectLocationDropdown />
                </div>
            )
        }
        return (
            <div>
                {nav}
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps)(SelectLocationPage);