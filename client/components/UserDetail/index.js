import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUserDetail, updateUserDetails} from '../../actions/user-detail';
import UserProfile from './UserProfile';

class UserDetailComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    user: PropTypes.shape(
      {
        _id: PropTypes.string
      }
    ).isRequired
  }

  constructor (props) {
    super(props);
    this.initUid = props.params.id;
  }

  componentDidMount () {
    const {dispatch, user} = this.props;
    if (!user._id) {
      dispatch(fetchUserDetail(this.initUid));
    }
  }
  // fieldvalues = {filed1: value1, filed2: value2}
  handleUpdateUserDetail (fieldvalues) {
    const {dispatch, user} = this.props;
    dispatch(updateUserDetails(user._id, fieldvalues));
  }

  render () {
    return (
      <div>
        {(this.props.fetching || !this.props.user._id) ? (<h2>加载中</h2>) :
            (<UserProfile
              user={this.props.user}
              updatefileds={fieldvalues => this.handleUpdateUserDetail(fieldvalues)}
            />)
        }
      </div>
    );
  }
}


const mapStateToProps = ({UserDetail}) => {
  const fetching = UserDetail.fetching || false;
  const user = UserDetail.user || {};
  return {
    fetching,
    user
  };
};

export default connect(mapStateToProps)(UserDetailComponent);
