const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          {`${part.name} ${part.exercises}`}
        </p>
      ))}
    </div>
  )
}

const Total = (props) => {
  console.log(props)

  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0)
  
  return (
    <div>
      <p>
        Number of exercises {totalExercises}
      </p>
    </div>
  )
}

export default App
