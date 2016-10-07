// import Table from 'react-bootstrap/lib/Table';
import Farmland from './farmland/farmland';

export default class Resources extends React.Component {
	render() {
		return <Farmland {...this.props.farmland}/>
	}
}
