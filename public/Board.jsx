

var Board = (props) => (
	<div className="board">
		<div className="row">
			<Tile toggle={props.boardState[0][0]} row={0} col={0} handleClick={props.handleClick}/>
			<Tile toggle={props.boardState[0][1]} row={0} col={1} handleClick={props.handleClick}/>
			<Tile toggle={props.boardState[0][2]} row={0} col={2} handleClick={props.handleClick}/>
		</div>
		<div className="row">
			<Tile toggle={props.boardState[1][0]} row={1} col={0} handleClick={props.handleClick}/>
			<Tile toggle={props.boardState[1][1]} row={1} col={1} handleClick={props.handleClick}/>
			<Tile toggle={props.boardState[1][2]} row={1} col={2} handleClick={props.handleClick}/>
		</div>
		<div className="row">
			<Tile toggle={props.boardState[2][0]} row={2} col={0} handleClick={props.handleClick}/>
			<Tile toggle={props.boardState[2][1]} row={2} col={1} handleClick={props.handleClick}/>
			<Tile toggle={props.boardState[2][2]} row={2} col={2} handleClick={props.handleClick}/>
		</div>
	</div>
);