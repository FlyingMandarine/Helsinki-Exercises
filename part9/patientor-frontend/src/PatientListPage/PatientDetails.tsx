import React from "react";
import axios from "axios";
import { useParams } from "react-router";

import { useStateValue } from "../state/state";
import { apiBaseUrl } from "../constants";
import { Patient } from "../types";
import { setPatientDetails } from "../state";

import EntryDetails from "./EntryDetails";
import { HospitalEntryFormValues } from "../AddEntryModal/AddHospitalEntryForm";
import { OccupationalHealthcareEntryFormValues } from "../AddEntryModal/AddOccupationalEntryForm";
import { AddHospitalEntryModal, AddOccupationalHealthcareEntryModal } from "../AddEntryModal";
import { Button } from "semantic-ui-react";

const PatientDetails = () => {
    const [hospitalModalOpen, setHospitalModalOpen] = React.useState<boolean>(false);
    const [occupationalHealthcareModalOpen, setOccupationalHealthcareModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

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

    const hospitalOpenModal = (): void => setHospitalModalOpen(true);
    const occupationalHealthcareOpenModal = (): void => setOccupationalHealthcareModalOpen(true);

    const hospitalCloseModal = (): void => {
        setHospitalModalOpen(false);
        setError(undefined);
    };

    const occupationalHealthcareCloseModal = (): void => {
        setOccupationalHealthcareModalOpen(false);
        setError(undefined);
    };

    const submitNewEntry = async (values: HospitalEntryFormValues | OccupationalHealthcareEntryFormValues) => {
        try {
            const { data: updatedPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${patientId}/entries`,
                values
            );
            dispatch(setPatientDetails(updatedPatient));
            hospitalCloseModal();
            occupationalHealthcareCloseModal();
        } catch (e) {
            console.error(e.response?.data || 'Unknown Error');
            setError(e.response?.data?.error || 'Unknown error');
        }
    };

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
                    <EntryDetails key={ entry.id } entry={ entry } />
                )
            }

            <AddHospitalEntryModal
                modalOpen={hospitalModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={hospitalCloseModal}
            />
            <AddOccupationalHealthcareEntryModal
                modalOpen={occupationalHealthcareModalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={occupationalHealthcareCloseModal}
            />
            <Button onClick={() => hospitalOpenModal()}>Add Hospital Entry</Button>
            <Button onClick={() => occupationalHealthcareOpenModal()}>Add Occupational Health Care Entry</Button>
        </>
    );
};

export default PatientDetails;