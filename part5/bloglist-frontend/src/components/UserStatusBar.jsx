export default function UserStatusBar({ user, onLogout }) {
  return (
    <div>
      <h3>{`${user.name} is logged in`}</h3>
      <button onClick={onLogout}>log out</button>
    </div>
  );
}
