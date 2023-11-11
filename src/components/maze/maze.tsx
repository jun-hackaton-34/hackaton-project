import clsx from 'clsx';
import { generateMaze } from '../../helpers';
import styles from './maze.module.scss';

function Maze(): JSX.Element {
  const maze = generateMaze(15, 15);

  return (
    <div>
      <table className={styles.maze}>
        <tbody>
          {maze.map((row, i) => (
            <tr key={`row-${i}`} >
              {row.map((cell, j: number) => (
                <td
                  key={`cell-${i}-${j}`}
                  className={clsx(
                    { [styles['top-border']]: maze[i][j][0] === 0 },
                    { [styles['right-border']]: maze[i][j][1] === 0 },
                    { [styles['bottom-border']]: maze[i][j][2] === 0 },
                    { [styles['left-border']]: maze[i][j][3] === 0 },
                  )}
                >
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table >
    </div>
  );
}

export default Maze;
