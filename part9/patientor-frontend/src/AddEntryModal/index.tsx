import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddHospitalEntryForm, { HospitalEntryFormValues } from './AddHospitalEntryForm';
import  AddOccupationalHealthcareEntryForm, { OccupationalHealthcareEntryFormValues } from './AddOccupationalEntryForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: HospitalEntryFormValues | OccupationalHealthcareEntryFormValues) => void;
  error?: string;
}

export const AddHospitalEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Hospital entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);

export const AddOccupationalHealthcareEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new Occupational Health care entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalHealthcareEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
);