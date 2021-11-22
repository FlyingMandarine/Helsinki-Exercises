import React from "react";
import { Entry, HospitalEntry, OccupationalHealthCareEntry, HealthCheckEntry } from "../types";

import { useStateValue } from "../state/state";
import { Container } from "semantic-ui-react";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled switch case: ${JSON.stringify(value)}`
    );
};

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    const [{ diagnoses }, ] = useStateValue();

    return (
        <Container style={{border: 'solid lightgrey 2px', padding: '5px', margin: '10px', borderRadius: '5px'}}>
            <h2>{ entry.date }<i className="big doctor icon" /></h2>
            <em>{ entry.description }</em>
            <ul>
                {
                    entry.diagnosisCodes &&
                    entry.diagnosisCodes.map(code =>
                        <li key={ code }>
                            { code } { diagnoses[code]['name'] }
                        </li>
                    )
                }
            </ul>
        </Container>
    );
};

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
    const [{ diagnoses }, ] = useStateValue();

    return (
        <Container style={{border: 'solid lightgrey 2px', padding: '5px', margin: '10px', borderRadius: '5px'}}>
            <h2>{ entry.date }<i className="big stethoscope icon" /> { entry.employerName }</h2>
            <em>{ entry.description }</em>
            <ul>
                {
                    entry.diagnosisCodes &&
                    entry.diagnosisCodes.map(code =>
                        <li key={ code }>
                            { code } { diagnoses[code]['name'] }
                        </li>
                    )
                }
            </ul>
        </Container>
    );
};

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const [{ diagnoses }, ] = useStateValue();

    return (
        <Container style={{border: 'solid lightgrey 2px', padding: '5px', margin: '10px', borderRadius: '5px'}}>
            <h2>{ entry.date }<i className="big doctor icon" /></h2>
            <p><em>{ entry.description }</em><br /></p>
            { entry.healthCheckRating === 0 &&
            <i className="green heart icon" />}
            { entry.healthCheckRating === 1 &&
            <i className="orange heart icon" />}
            { entry.healthCheckRating === 2 &&
            <i className="red heart icon" />}
            { entry.healthCheckRating === 3 &&
            <i className="black heart icon" />}
            <ul>
                {
                    entry.diagnosisCodes &&
                    entry.diagnosisCodes.map(code =>
                        <li key={ code }>
                            { code } { diagnoses[code]['name'] }
                        </li>
                    )
                }
            </ul>
        </Container>
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    

    switch (entry.type) {
        case "Hospital":
            return <HospitalEntryDetails entry={ entry } />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareDetails entry={ entry } />;
        case "HealthCheck":
            return <HealthCheckDetails entry={ entry } />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;