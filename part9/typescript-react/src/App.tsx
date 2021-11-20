import React from 'react';

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
}

interface CoursePartDefinitionBase extends CoursePartBase {
    description: string;
}

interface CourseNormalPart extends CoursePartDefinitionBase {
    type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
    type: 'groupProject';
    groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartDefinitionBase {
    type: 'submission';
    exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartDefinitionBase {
    type: 'special';
    requirements: Array<string>;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br />
                    <em>{part.description}</em>
                </div>
            );
        case 'groupProject':
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br />
                    project exercises {part.groupProjectCount}
                </div>
            );
        case 'submission':
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br />
                    <em>{part.description}</em><br />
                    submit to {part.exerciseSubmissionLink}
                </div>
            );
        case 'special':
            return (
                <div>
                    <strong>{part.name} {part.exerciseCount}</strong><br />
                    <em>{part.description}</em><br />
                    required skils: {part.requirements.join(', ')}
                </div>
            )
        default:
            return assertNever(part);
    }
};

const Header = ({ courseName }: { courseName: string }) => {
    return <h1>{courseName}</h1>;
};

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
    return (
        <div>
            {
                courseParts.map(part =>
                    <div key={part.name}>
                        <Part part={part} />
                        <br />
                    </div>
                )
            }
        </div>
    );
};

const Total = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
    return (
        <>
            Number of exercises{' '}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </>
    );
};

const App = () => {
    const courseName = 'Half Stack application development';
    const courseParts: CoursePart[] = [
        {
          name: "Fundamentals",
          exerciseCount: 10,
          description: "This is the leisured course part",
          type: "normal"
        },
        {
          name: "Advanced",
          exerciseCount: 7,
          description: "This is the harded course part",
          type: "normal"
        },
        {
          name: "Using props to pass data",
          exerciseCount: 7,
          groupProjectCount: 3,
          type: "groupProject"
        },
        {
          name: "Deeper type usage",
          exerciseCount: 14,
          description: "Confusing description",
          exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
          type: "submission"
        },
        {
            name: "Backend development",
            exerciseCount: 21,
            description: "Typing the backend",
            requirements: ["nodejs", "jest"],
            type: "special"
        }
      ];

    return (
        <div>
            <Header courseName={courseName} />
            <Content courseParts={courseParts} />
            <Total courseParts={courseParts} />
        </div>
    );
};

export default App;