import { AlphaStack, Button, Modal, TextContainer, Form, FormLayout, TextField } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePodById } from '../services/podSlice';

function UpdatePodModal({ pod }) {
  let intitalState = {}
  if (pod) {
    intitalState = {
      id: pod.id,
      label: pod.label,
      plant_name: pod.plant_name,
      instructions: pod.instructions,
      min_ec: pod.min_ec,
      max_ec: pod.max_ec,
      min_ph: pod.min_ph,
      max_ph: pod.max_ph,
      min_temp: pod.min_temp,
      max_temp: pod.max_temp,
    }
  } else {
    intitalState = {
      id: "",
      label: "",
      plant_name: "",
      instructions: "",
      min_ec: "",
      max_ec: "",
      min_ph: "",
      max_ph: "",
      min_temp: "",
      max_temp: "",

    }
  }

  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [formData, setFormData] = useState({
    ...intitalState
  });

  const handleLabelChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      label: event,
    }));
  };

  const handlePlantNameChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      plant_name: event,
    }));
  };

  const handleMinECChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      min_ec: event,
    }));

  };

  const handleMinPHChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      min_ph: event,
    }));

  };


  const handleMaxECChange = (event) => {
    if (event >= formData.min_ec) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        min_ec: event,
      }));
    }
  };

  const handleMaxPHChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      max_ph: event,
    }));

  };

  const handleMinTempChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      min_ec: event,
    }));
  };

  const handleMaxTempChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      min_ec: event,
    }));
  };

  const handleInstructionsChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      instructions: event,
    }));
  };

  const handleChange = useCallback(() => setActive(!active), [active]);

  function handleSubmit() {
    dispatch(updatePodById(pod.id, formData));
    handleChange()
  }


  const activator = <Button onClick={handleChange}>Edit Pod</Button>;

  return (
    <Modal
      activator={activator}
      open={active}
      onClose={handleChange}
      title="Edit Pod"
      primaryAction={{
        content: 'Update',
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: 'Cancel',
          onAction: handleChange,
        },
      ]}
    >
      <Modal.Section>
        <Form onSubmit={() => handleSubmit} implicitSubmit={false}>
          <FormLayout>
            <TextField
              value={formData.label}
              onChange={handleLabelChange}
              label="Pod Name"
              type="label"
            />

            <TextField
              value={formData.plant_name}
              onChange={handlePlantNameChange}
              label="Plant Name"
              type="text"
            />

            <TextField
              value={formData.min_ph}
              onChange={handleMinPHChange}
              label="Max pH"
              type="text"
            />

            <TextField
              value={formData.max_ph}
              onChange={handleMaxPHChange}
              label="Max pH"
              type="text"
            />
            <TextField
              value={formData.min_ec}
              onChange={handleMinECChange}
              label="pH Up"
              type="text"
            />
            <TextField
              value={formData.max_ec}
              onChange={handleMaxECChange}
              label="pH down"
              type="text"
            />
            <TextField
              value={formData.min_temp}
              onChange={handleMinTempChange}
              label="start PPM"
              type="text"
            />
            <TextField
              value={formData.max_temp}
              onChange={handleMaxTempChange}
              label="end PPM"
              type="text"
            />
            <TextField
              label="Instructions"
              value={formData.instructions}
              onChange={handleInstructionsChange}
              multiline={6}
              autoComplete="off"
            />

          </FormLayout>
        </Form>
      </Modal.Section>
    </Modal>
  );
}

export default UpdatePodModal