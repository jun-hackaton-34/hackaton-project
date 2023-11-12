import './Loader.module.scss';

export function Loader() {
  return (
    <div className="loading">
      <div className="loading__spinner" />
      <p className="loading__text">Loading...</p>
    </div>
  );
}
