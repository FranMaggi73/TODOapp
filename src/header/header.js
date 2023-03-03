export default function Header() {
  return (
    <header id="top-bar">
      <h1 onClick={e => (window.location.href = '/')}>TODOapp</h1>
    </header>
  )
};