

class Join extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<input type="text" value={this.props.gameName} onChange={this.props.setGameName}></input>
				<h3>Create Game</h3>
				<button onClick={this.props.create}>Create</button>
				<h3>Join Game</h3>
				<button onClick={this.props.join}>Join</button>
			</div>
		);
	}
}