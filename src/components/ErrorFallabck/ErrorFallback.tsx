import { Link } from 'react-router-dom';

export function ErrorFallback() {
  return (
    <div className="not-found">
      <h1 className="not-found__header">Ой, возникла ошибка!</h1>
      <p className="not-found__text">
        Можете попробовать перезагрузить страницу или вернуться на главную
      </p>
      <Link to="/">Домой</Link>
    </div>
  );
}
