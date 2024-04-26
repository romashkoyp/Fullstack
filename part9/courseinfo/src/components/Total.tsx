interface TotalProps {
  exercises: number;
}

const Total = (props: TotalProps) => {
  return <p>Total exercises: {props.exercises}</p>
};

export default Total;