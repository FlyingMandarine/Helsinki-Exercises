import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { useStateValue } from "../state/state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatientDetails } from "../state";

const PatientDetails = () => {
    const patientId: string = useParams<{ id: string }>().id;
    const [{ patients }, dispatch] = useStateValue();

    const patient: Patient = patients[patientId];

    React.useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const { data: patientDetailsFromApi } = await axios.get<Patient>(
                    `${apiBaseUrl}/patients/${patientId}`
                );
                dispatch(setPatientDetails(patientDetailsFromApi));
            } catch (e) {
                console.error(e);
            }
        };

        if (patients[patientId]['ssn'] === undefined) {
            void fetchPatientDetails();
        }
    }, []);

    return (
        <>
            <h1>
                {patient.name}{" "}
                { patient.gender === 'male' && <i className="mars icon"></i> }
                { patient.gender === 'female' && <i className="venus icon"></i> }
                { patient.gender === 'other' && <i className="genderless icon"></i> }
            </h1>
            ssn: {patient.ssn}<br />
            occupation: {patient.occupation}

            <h2>entries</h2>
            {
                patient.entries &&
                patient.entries.map(entry => 
                    <div key={ entry.id }>
                        <div>{ entry.date } <em>{ entry.description }</em></div>
                        <ul>
                            {
                                entry.diagnosisCodes &&
                                entry.diagnosisCodes.map(code => <li key={ code }>{ code }</li>)
                            }
                        </ul>
                    </div>
                )
            }
        </>
    );
};

export default PatientDetails;