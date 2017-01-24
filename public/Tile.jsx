

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		}
	}

	clicked() {
		console.log(this.props.toggle);
		this.props.handleClick(this.props.row, this.props.col);
	}

	render() {
		console.log(this.props.toggle === 1)
		if (this.props.toggle === 1) {
			return (
				<div className="tile placed" onClick={this.clicked.bind(this)}></div>
			);
		} else {
			return (
				<div className="tile unplaced" onClick={this.clicked.bind(this)}></div>
			);
		}
	}
};