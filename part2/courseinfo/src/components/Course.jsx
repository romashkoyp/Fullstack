const Course = (props) => {
    const Header = () => {
        return (
          <div>
            <h1>
                {props.course.name}
            </h1>
          </div>
        )
      }

    const Content = () => {
        return (
            <div>
                {props.course.parts.map((part, index) => (
                    <p key={index}>
                        {`${part.name} ${part.exercises}`}
                    </p>                  
                ))}
            </div>         
        )
      }

    const Total = () => {
        const totalExercises = props.course.parts.reduce((sum, part) => sum + part.exercises, 0)
        return (
            <div>
                <strong>
                    Total of {totalExercises} exercises
                </strong>
            </div>
        )
    }

    return (
      <div>
        <Header />
        <Content />
        <Total />
      </div>
    )
  }
    
export default Course