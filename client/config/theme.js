import { createMuiTheme } from '@material-ui/core/styles';
import { lightBlue, pink, red } from '@material-ui/core/colors'

// 创建一个主题的实例。
const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: pink,
    type: 'light',
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme
