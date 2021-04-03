//leia o README
// - Se possível faça a jogada com a qual você ganhe o jogo; ok
// – Se possível faça a jogada com a qual você não perca o jogo na próxima jogada do adversário; ok
// – Se possível jogue na posição central do tabuleiro ...
// – Se possível jogue nas diagonais ...
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

  let moveIndex = null;
  const winnerLines = getWinnerLines(scenery);
  const myOpponentMove = myMove == "X" ? "O" : "X";

  winnerLines.forEach((line) => {
    if (
      `${scenery[line[0]]}${scenery[line[1]]}${scenery[line[2]]}` ===
      myMove.repeat(2)
    ) {
      line.forEach((num) => {
        if (!scenery[num]) {
          moveIndex = num;
          console.log("myMove", moveIndex);
        }
      });
    } else if (
      `${scenery[line[0]]}${scenery[line[1]]}${scenery[line[2]]}` ===
      myOpponentMove.repeat(2)
    ) {
      line.forEach((num) => {
        if (!scenery[num]) {
          moveIndex = num;
          console.log("myOpponentMove", moveIndex);
        }
      });
    } else {
      if (!moveIndex) {
        for (let i = 0; i < scenery.length; i += 2) {
          if (!scenery[i]) {
            moveIndex = i;
            console.log("elseMove", moveIndex);
          }
        }
      }
    }
    // if (!moveIndex){
    //   scenery
    //     .filter((field) => !field)
    //     .forEach((emptyField, index) =>
    //       moveIndex = index);

    // }
  });
  console.log(moveIndex);
  return moveIndex;
};

export default kamilaScript;
