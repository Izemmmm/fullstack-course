export default function InfoBar({message, isCritical}) {
  if (!message) {
    return;
  }

  const style = {
    color: isCritical ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10
  }
  return (
    <div style={style}>
      {message}
    </div>
  );
}