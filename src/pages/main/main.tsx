import { useState } from "react";
import Maze from "../../components/maze/maze";
import { generateMaze } from "../../helpers";
import styles from './main.module.scss';
import clsx from "clsx";

function Main(): JSX.Element {

  const maze = generateMaze(15, 15);

  const [mazeConfig, setMazeConfig] = useState<number[][][]>(maze);

  const handleDropButtonClick = () => {
    setMazeConfig(mazeConfig);
  };

  const handleStartButtonClick = () => {
    setMazeConfig(maze);
  }

  const handleStopButtonClick = () => {
    setMazeConfig(maze);
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <button
          className={clsx(styles.button, 'button--start')}
          type="button"
          onClick={handleStartButtonClick}
        >
          Начать игру
        </button>
        <button
          className={clsx(styles.button, 'button--drop')}
          type="button"
          onClick={handleDropButtonClick} >
          Сбросить игру
        </button>
        <button
          className={clsx(styles.button, 'button--stop')}
          type="button"
          onClick={handleStopButtonClick}
        >
          Закончить игру
        </button>
      </div>
      <Maze maze={maze} />
    </div>
  )
}

export default Main;
