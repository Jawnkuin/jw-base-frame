import React, {PropTypes} from 'react';
import {Modal, Button, Checkbox, Icon, Table} from 'antd';
import LeftCard from '../UI/LeftColorCard';
import dummyImage from '../../utils/dummyimage';
import RoleCard from '../UI/RoleCard';
import lessStyle from './UserProfile.less';

const styles = {
  avatar: text => ({
    width: 64,
    height: 64,
    marginTop: 12,
    marginBottom: 12,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: '50%',
    background: '#f8f8f8',
    display: 'inline-block',
    backgroundImage: `url(${dummyImage(text)})`
  }),
  field: {
    marginTop: 18,
    fontSize: 24,
    color: '#efefef',
    textAlign: 'left'
  }
};

class UserProfile extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      loginname: PropTypes.string.isRequired,
      email: PropTypes.string,
      useralias: PropTypes.string,
      roles: PropTypes.array
    }).isRequired,
    updatefileds: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      dlgOpen: false
    };
    this.showModal = this.showModal.bind(this);
  }
  showModal () {
    this.setState({dlgOpen: true});
  }

  render () {
    const name = this.props.user.loginname;
    return (
      <LeftCard className={lessStyle.leftCard}>
        <div className={lessStyle.content}>
          <div className={lessStyle.detailrow}>
            <div style={styles.avatar(name)} />
            <div style={styles.field}>
              <p><Icon type="user" />{name}</p>
            </div>
            <p className={lessStyle.subfield}>{this.props.user.useralias}</p>
            <p className={lessStyle.subfield}><Icon type="mail" />{this.props.user.email}</p>
            <div style={styles.field}>
              <Button type="primary" size="large" onClick={this.showModal}>修改</Button>
            </div>
          </div>
          <div className={lessStyle.rolesrow}>
            {this.props.user.roles && this.props.user.roles.map(r => (
              <RoleCard
                key={r._id}
                icon={'team'}
                color={'#8fc9fb'}
                name={r.name || ''}
                description={r.description || ''}
              />
            ))}
          </div>
        </div>
      </LeftCard>
    );
  }
}
export default UserProfile;
