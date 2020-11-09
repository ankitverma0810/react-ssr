import { makeStyles } from '@material-ui/core/styles';

const useGlobalStyles = makeStyles(theme => ({
	'@global': {
		'.padding-0': {
			padding: '0px'
		},
		'.margin-0': {
			margin: '0px'
		},
		'.text-center': {
			textAlign: 'center'
		},
		'.w-100': {
			width: '100%'
		},
		'.font-weight-bold': {
			fontWeight: 'bold'
		},
		'.d-flex': {
			display: 'flex'
		},
		'flex-column': {
			flexDirection: 'column'
		}
	}
}));

export default useGlobalStyles;