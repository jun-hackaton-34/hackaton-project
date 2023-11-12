import clsx from 'clsx';

import { generateMaze } from '../../helpers';

import styles from './Maze.module.scss';

export function Maze(): JSX.Element {
  const maze = generateMaze(15, 15);

  return (
    <div className={styles.maze__wrapper}>
      <table className={styles.maze}>
        <tbody>
          {maze.map((row, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={`row-${i}`}>
              {row.map((_cell, j: number) => (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <td
                  // eslint-disable-next-line react/no-array-index-key
                  key={`cell-${i}-${j}`}
                  className={clsx(
                    { [styles['top-border']]: maze[i][j][0] === 0 },
                    { [styles['right-border']]: maze[i][j][1] === 0 },
                    { [styles['bottom-border']]: maze[i][j][2] === 0 },
                    { [styles['left-border']]: maze[i][j][3] === 0 }
                  )}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
