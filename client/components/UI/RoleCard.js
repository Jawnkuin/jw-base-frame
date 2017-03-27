import React, {PropTypes} from 'react';
import {Icon, Card} from 'antd';
import styles from './RoleCard.less';

function NumberCard ({icon, color, name, description}) {
  return (
    <Card className={styles.numberCard} bordered bodyStyle={{padding: 0}}>
      <Icon className={styles.iconWarp} style={{color}} type={icon} />
      <div className={styles.content}>
        <p className={styles.title}>{name || 'No Title'}</p>
        <p className={styles.number}>
          {description || ''}
        </p>
      </div>
    </Card>
  );
}

NumberCard.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

NumberCard.defaultProps = {
  icon: 'team',
  color: '#2233ff'
};

export default NumberCard;
