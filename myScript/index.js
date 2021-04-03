//leia o README

const kamilaScript = (scenery, myMove) => {
  const getWinnerLines = (table) => {
    const diagonal = [],
      diagonalRightLine = [],
      horizontal = [],
      vertical = [],
      tableIndex = Object.keys(table);
    for (let i = 0; i < tableIndex.length; i += 3) {
      vertical.push(
        tableIndex
          .join("")
          .substr(i, 3)
          .split("")
          .map((n) => +n)
      );
    }
    diagonal.push(vertical.map((num, i) => num[i]));
    for (let i = 2, y = 0; i >= 0, y < vertical.length; i--, y++) {
      horizontal.push(vertical.map((num) => num[y]));
      diagonalRightLine.push(vertical[y][i]);
    }
    diagonal.push(diagonalRightLine);
    return vertical.concat(horizontal, diagonal);
  };

  const move = () => {
    const randomNumber = Math.floor(Math.random() * 9);
    if (scenery[randomNumber]) return move();
    moveIndex = randomNumber;
  };

  const verifyWinner = (line, player) => {
    if (
      `${scenery[line[0]]}${scenery[line[1]]}${scenery[line[2]]}` ===
      player.repeat(2)
    ) {
      line.forEach((num) => {
        if (!scenery[num]) {
          moveIndex = num;
        }
      });
    }
  };

  let moveIndex = null;
  const winnerLines = getWinnerLines(scenery),
    myOpponentMove = myMove == "X" ? "O" : "X";

  winnerLines.forEach((line) => {
    verifyWinner(line, myOpponentMove);
    verifyWinner(line, myMove);
  });

  if (!moveIndex) {
    move();
  }

  return moveIndex;
};

export default kamilaScript;
