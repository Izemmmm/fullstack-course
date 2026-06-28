export default function StatisticLine({ text, postText, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{postText}</td>
    </tr>
  );
}
