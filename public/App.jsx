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
			gameName: ''
		}
		setInterval(this.getBoardState.bind(this), 5000);
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
		  	context.setState({boardScreen: data})
		  	console.log(context.state.boardScreen);
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
		  	context.setState({playing: true});
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
		  	context.setState({playing: true});
		  },
		  error: function(err) {
				console.error(err);
		  }
		});
	}

	render() {
		if (this.state.playing) {
			return (
				<Board handleClick={this.move.bind(this)} boardState={this.state.boardScreen}/>
			);
		} else {
			return (
				<Join create={this.createGame.bind(this)} join={this.joinGame.bind(this)} gameName={this.state.gameName} setGameName={this.setGameName.bind(this)}/>
			);
		}
	}
}