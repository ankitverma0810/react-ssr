import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#c5e09b',
			main: '#c5e09b',
			dark: '#7cba01'
		},
		secondary: {
			main: '#525b9c'
		},
		error: {
			main: '#FE1C18'
		},
		info: {
			main: '#444444'
		},
		warning: {
			main: '#FFD219'
		}
	},
	typography: {
		h1: {
			fontSize: '6.75rem',
			fontWeight: 500
		},
		h2: {
			fontSize: '4.75rem',
			fontWeight: 500
		},
		h3: {
			fontSize: '3.75rem',
			fontWeight: 500
		},
		h4: {
			fontSize: '1.20rem',
			fontWeight: 500
		},
		body1: {
			fontSize: '1rem',
			fontWeight: 500
		}
	},
	overrides: {
		MuiCssBaseline: {
			'@global': {}
		}
	}
});

export default theme;