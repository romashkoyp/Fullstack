interface ContentProps {
  parts: CoursePartBase[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <p key={index}>
          {`${part.name} ${part.exerciseCount}`}
        </p>
      ))}
    </div>
  )
};

export default Content;