export default function Notification({message, isError = false}) {
  if (!message) {
    return null;
  }

  const style = {
    background: isError ? 'red' : 'green',
    color: 'lightgray',
    fontSize: 25,
    borderRadius: 5,
    height: 50,
    minWidth: 150,
    maxWidth: 300,
    position: 'fixed',
    top: 30,
    left: '50%',
    transform: "translateX(-50%)",
    alignContent: 'center',
    textAlign: 'center',
    opacity: 0.5
  };

  return (
    <div style={style}>{message}</div>
  );
}