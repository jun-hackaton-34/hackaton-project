import clsx from 'clsx';

import styles from './maze.module.scss';

type MazeProps = {
  maze: number[][][];
};

function Maze({ maze }: MazeProps): JSX.Element {
  return (
    <div>
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

export default Maze;
