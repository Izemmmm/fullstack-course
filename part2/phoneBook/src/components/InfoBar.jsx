export default function InfoBar({message}) {
  if (!message?.text) {
    return;
  }

  const style = {
    color: message.isCritical ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10
  }
  return (
    <div style={style}>
      {message.text}
    </div>
  );
}