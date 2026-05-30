
export default function Course({course}) {
    return (
    <div>
      <h2>{course.name}</h2>
      <Content course={course}/>
      <Total parts={course.parts}/>
    </div>
  );
}

function Content({course}) {
  return (
    <div>
      {course.parts.map(part => {
        return <Part part={part} key={part.id} />
      })}
    </div>
  );
}

function Total({parts}) {
  const exercisesSum = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
    <h4>
      Number of exercises: {exercisesSum}
    </h4>
  );
}

function Part({part}) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}