import React, {PropTypes} from 'react';
import {Card} from 'antd';
import styles from './LeftColorCard.less';

const LeftColorCard = ({children}) => (
  <Card className={styles.card} bodyStyle={{padding: 0}}>
    {children}
  </Card>
);

LeftColorCard.propTypes = {
  children: PropTypes.node
};
LeftColorCard.defaultProps = {
  children: null
};

export default LeftColorCard;
