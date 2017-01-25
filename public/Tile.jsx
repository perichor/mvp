

class Tile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clicked: false
		}
	}

	clicked() {
		this.props.handleClick(this.props.row, this.props.col);
	}

	render() {
		if (this.props.toggle === 1) {
			return (
				<div className="tile placed" onClick={this.clicked.bind(this)}></div>
			);
		} else if (this.props.toggle === 0) {
			return (
				<div className="tile unplaced" onClick={this.clicked.bind(this)}></div>
			);
		} else if (this.props.toggle === 'p1') {
			if (this.props.player === '1') {
				return (
					<div className="tile winner"><div className="lose">You Lose!</div></div>
				);
			}
			if (this.props.player === '2') {
				return (
					<div className="tile loser"><div className="win">You Win!</div></div>
				);
			}
		} else if (this.props.toggle === 'p2') {
			if (this.props.player === '2') {
				return (
					<div className="tile winner"><div className="win">You Win!</div></div>
				);
			}
			if (this.props.player === '1') {
				return (
					<div className="tile loser"><div className="lose">You Lose!</div></div>
				);
			}
		}
	}
};