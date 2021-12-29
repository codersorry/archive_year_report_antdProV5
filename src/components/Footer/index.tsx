import { useIntl } from 'umi';
import { DefaultFooter } from '@ant-design/pro-layout';

const Footer: React.FC = () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Macrowing Software Technology Co.,Ltd.  沪ICP备07013484号-2',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
    style={{backgroundColor: `rgba(${0}, ${0}, ${0}, ${0})`}}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'help',
          title: '帮助',
          href: 'www.吴彦祖.com',
          blankTarget: false,
        },
        {
          key: 'secret',
          title: '隐私',
          href: 'www.陈冠希.com',
          blankTarget: false,
        },
        {
          key: '条款',
          title: '条款',
          href: 'www.彭于晏.com',
          blankTarget: false,
        },
      ]}
    />
  );
};

export default Footer;
