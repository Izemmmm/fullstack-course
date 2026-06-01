export default function WeatherInfo({temp, wind, image}){
  return (
    <div>
      <p>Temperature {temp} Celsius</p>
      <img src={image} />
      <p>Wind {wind} m/s</p>
    </div>
  );
}