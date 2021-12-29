import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // 拂晓蓝
  // primaryColor: '#1b4285',
  primaryColor: '#1890ff',
  layout: 'mix', //   side/top/mix
  headerTheme: 'light', // mix模式下生效
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: '',
  pwa: false,
  // logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
  logo: 'logo.svg',
  iconfontUrl: '',
};

export default Settings;
