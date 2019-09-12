var board = Chessboard('board1', {
    //moveSpeed: 1,
    draggable: true
});
var chess = new Chess();

//chess.clear();

//chess.load("5rk1/R6R/8/8/8/8/8/6K1 w KQkq - 0 1")   

board.position(chess.fen());


function bestMove(board, depth = 1) {
    let moves = board.moves();
    let bestScore = -999999999;
    let bestIndex = [];
    for(let i = 0; i < moves.length; ++ i) {
        let currBoard = new Chess(board.fen());
        currBoard.move(moves[i]);
        let currScore;
        if(depth === 0) currScore = score(currBoard, currBoard.turn());
        else {
            if(currBoard.in_checkmate()) {currScore = 99999999;}
            else currScore = bestMove(currBoard, depth - 1).score;
        }
        
        if(currScore > bestScore) {
            bestScore = currScore;
            bestIndex = [];
            bestIndex.push(i);
        }
        else if(currScore === bestScore) {
            bestIndex.push(i);
        }
    }
//    console.log(bestIndex);
    if(bestIndex == []) console.log(wtf);
    let move = moves[bestIndex[Math.floor(Math.random() * (bestIndex.length))]];
//    console.log(move);
    return {move: move,score: bestScore};
}

function score(chess, turn) {
    if(chess.in_checkmate()) return chess.turn() == turn ? -99999 : 99999;
    let score = 0;
    if(chess.in_stalemate()) score++;
    const scorePerFigure = {k: 0, q: 10, r: 5, b: 3, n: 3, p: 1};
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    for(let letter of letters) {
        for(number = 1; number <= 8; ++ number) {
            const figure = chess.get(letter + number);
            if(figure != null) {
                score += scorePerFigure[figure.type] * (figure.color === turn ? 1 : -1);
            }
        } 
    }
    return score;
}

function update() {
	if(chess.game_over()) return;
    
	let move = bestMove(chess, 1, chess.turn()).move;
	chess.move(move);
    
	board.position(chess.fen());
}
//update();
setInterval(update, 2000);

