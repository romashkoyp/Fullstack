import { CoursePart, CoursePartBackground, CoursePartDescription, CoursePartGroup, CoursePartArray } from './Content';

const assertNever = (value: CoursePart): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ parts }: { parts: CoursePart[] }) => {
  return (
    <div>
      {parts.map((part, index) => {
        switch (part.kind) {
          case 'basic':
            return (
              <div key={index}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>{(part as CoursePartDescription).description}</p>
              </div>
            );
          case 'group':
            return (
              <div key={index}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>Project exercises {(part as CoursePartGroup).groupProjectCount}</p>
              </div>
            );
          case 'background':
            return (
              <div key={index}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>{(part as CoursePartDescription).description}</p>
                <p>Background material: {(part as CoursePartBackground).backgroundMaterial}</p>
              </div>
            );
          case 'special':
            return (
              <div key={index}>
                <h3>{part.name} {part.exerciseCount}</h3>
                <p>{(part as CoursePartDescription).description}</p>
                <p>
                  Required skills: {' '}
                  {(part as CoursePartArray).requirements.map((requirement, reqIndex) => (
                    <span key={reqIndex}>{requirement} </span>
                  ))}
                </p>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Part;