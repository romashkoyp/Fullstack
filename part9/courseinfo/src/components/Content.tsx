import Part from './Part'

export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartDescription extends CoursePartBase {
  description: string;
  kind: string; //problem was here
}

export interface CoursePartBasic extends CoursePartDescription {
  kind: "basic"
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartArray extends CoursePartDescription {
  requirements: string[];
  kind: "special"
}

export type CoursePart = CoursePartArray | CoursePartDescription | CoursePartBasic | CoursePartGroup | CoursePartBackground;

const Content = ({ parts }: { parts: CoursePart[] }) => {
  return (
        <Part parts={parts}/>
  );
};

export default Content;