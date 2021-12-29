import React from 'react';
import { Layout } from 'antd';
import LeftTree from './components/LeftTree';
import RightTable from './components/RightTable';

import styles from './index.less';

const { Sider, Content } = Layout;

const BaseTableView = () => {
  return (
    <Layout>
      <Sider className={styles.siderStyle} theme="light">
        <LeftTree />
      </Sider>
      <Content className={styles.contentStyle}>
        <RightTable />
      </Content>
    </Layout>
  );
};

export default BaseTableView;
