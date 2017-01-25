class App extends React.Component {
	constructor() {
		super();
		this.state = {
			playing: false,
			boardScreen: 
			[
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
			],
			turn: '1',
			player: '0',
			gameName: ''
		}
	}

	setGameName(e) {
		this.setState({gameName: e.target.value});
	}

	getBoardState() {
		var context = this;
		$.ajax({
		  url: 'http://localhost:3000/boardstate',
		  type: 'GET',
		  contentType: 'application/json',
		  success: function (data) {
		  	context.setState({boardScreen: data.game, turn: data.turn});
		  },
		  error: function(err) {
				console.error(err);
		  }
		});
	}

	move(row, col) {
		var context = this;
		$.ajax({
		  url: 'http://localhost:3000/move',
		  type: 'POST',
		  contentType: 'application/json',
		  data: JSON.stringify({row: row, col: col}),
		  success: function (data) {
		  	context.getBoardState();
		  },
		  error: function(err) {
				console.error(err);
		  }
		});
	}

	createGame() {
		var context = this;
		$.ajax({
		  url: 'http://localhost:3000/creategame',
		  type: 'POST',
		  contentType: 'application/json',
		  data: JSON.stringify({'name': context.state.gameName}),
		  success: function (data) {
		  	context.setState({playing: true, player: '1'});
		  },
		  error: function(err) {
				console.error(err);
		  }
		});
	}

	joinGame() {
		var context = this;
		$.ajax({
		  url: 'http://localhost:3000/joingame',
		  type: 'POST',
		  contentType: 'application/json',
		  data: JSON.stringify({'name': context.state.gameName}),
		  success: function (data) {
		  	context.setState({playing: true, player: '2'});
		  },
		  error: function(err) {
				console.error(err);
		  }
		});
	}

	stopPlaying() {
		this.setState({playing: false});
	}

	render() {
		if (this.state.playing) {
			setInterval(this.getBoardState.bind(this), 5000);
			return (
				<Board handleClick={this.move.bind(this)} boardState={this.state.boardScreen} turn={this.state.turn} player={this.state.player} stopPlaying={this.stopPlaying.bind(this)}/>
			);
		} else {
			return (
				<Join create={this.createGame.bind(this)} join={this.joinGame.bind(this)} gameName={this.state.gameName} setGameName={this.setGameName.bind(this)}/>
			);
		}
	}
}