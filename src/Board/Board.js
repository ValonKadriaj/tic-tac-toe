import React, { Component } from 'react';
import Box from '../Box/Box';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentPlayer: 1, //1 = X ; 2 = O
      isGameActive: true,
      remainingGames: 3,
      numberOfVictoriesX: 0,
      numberOfVictoriesO: 0,
      draw: 0,
    };

    this.winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    this.handleClick = this.handleClick.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState({
      gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      currentPlayer: 1,
      isGameActive: true,
      remainingGames: 3,
      numberOfVictoriesX: 0,
      numberOfVictoriesO: 0,
      draw: 0,
    });
  }

  handleClick(boxIndex) {
    const { remainingGames } = this.state;
    if (this.state.isGameActive) {
      this.setState((prevState) => {
        const newGameState = [...prevState.gameState];
        const currentPlayer = prevState.currentPlayer;
        const nextPlayer = currentPlayer === 1 ? 2 : 1;
        newGameState[boxIndex] = currentPlayer;

        const winner = this.winningCombinations.reduce(
          (prevValue, combination) => {
            if (
              newGameState[combination[0]] !== 0 &&
              newGameState[combination[0]] === newGameState[combination[1]] &&
              newGameState[combination[1]] === newGameState[combination[2]]
            ) {
              return currentPlayer; // newGameState[combination[0]]
            } else {
              return prevValue;
            }
          },
          0
        );
        if (!newGameState.includes(0)) {
          return {
            ...prevState,
            remainingGames: remainingGames - 1,
            gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            draw: prevState.draw + 1,
            isGameActive: parseInt(remainingGames) - 1 === 0 ? false : true,
          };
        }

        if (winner !== 0) {
          if (prevState.currentPlayer === 1) {
            return {
              remainingGames: prevState.remainingGames - 1,
              gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              numberOfVictoriesX: prevState.numberOfVictoriesX + 1,
              isGameActive: parseInt(remainingGames) - 1 === 0 ? false : true,
            };
          } else {
            return {
              remainingGames: prevState.remainingGames - 1,
              gameState: [0, 0, 0, 0, 0, 0, 0, 0, 0],
              numberOfVictoriesO: prevState.numberOfVictoriesO + 1,
              isGameActive: parseInt(remainingGames) - 1 === 0 ? false : true,
            };
          }
        } else {
          return {
            ...prevState,
            currentPlayer: nextPlayer,
            gameState: newGameState,
          };
        }
      });
    }
  }
  render() {
    const {
      currentPlayer,
      isGameActive,
      numberOfVictoriesO,
      numberOfVictoriesX,
      remainingGames,
      draw,
    } = this.state;

    return (
      <div>
        <h2>
          {isGameActive ? (
            currentPlayer === 1 ? (
              <div>
                Radhen e ka:
                <i className="fas fa-times" />
              </div>
            ) : (
              <div>
                Radhen e ka: <i className="far fa-circle" />
              </div>
            )
          ) : null}
        </h2>
        <div className="boardContainer">
          {this.state.gameState.map((box, index) => {
            return (
              <Box
                handleClick={this.handleClick}
                key={index}
                id={index}
                iconValue={box}
              />
            );
          })}
        </div>
        {!isGameActive && (
          <div>
            <h2>
              {numberOfVictoriesO !== numberOfVictoriesX ? (
                numberOfVictoriesO < numberOfVictoriesX ? (
                  <div>
                    fitues eshte <br />
                    <i className="fas fa-times" />
                  </div>
                ) : (
                  <div>
                    fitues eshte <br />
                    <i className="far fa-circle" />
                  </div>
                )
              ) : (
                'Loja esht barazim'
              )}
            </h2>

            <button onClick={this.resetGame}>Rifillo Lojen</button>
          </div>
        )}
        {isGameActive && (
          <div>
            <h1>Numri i lojrave Qe ka Mbetur {remainingGames}</h1>
            <h1>x- ka fituar {numberOfVictoriesX}</h1>
            <h1>o- ka fituar {numberOfVictoriesO}</h1>
            <h1>barazime {draw}</h1>
          </div>
        )}
      </div>
    );
  }
}

export default Board;
