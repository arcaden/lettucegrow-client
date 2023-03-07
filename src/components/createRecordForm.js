import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord } from '../services/recordsSlice';
import { Form, FormLayout, TextField, Button, DropZone, LegacyStack, Thumbnail, Text } from '@shopify/polaris';


const CreateRecordForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        start_ph: '',
        end_ph: '',
        start_ec: '',
        end_ec: '',
        ph_up: '',
        ph_down: '',
        start_ppm: '',
        end_ppm: '',
        water: '',
        temperature: '',
        note: '',
        image: null,
    });

    const [files, setFiles] = useState([]);
    const [rejectedFiles, setRejectedFiles] = useState([]);

    const handleNameChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          name: event,
        }));
      };

    const handleStartPhChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          start_ph: event,
        }));
      };
    
      const handleEndPhChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          end_ph: event,
        }));
      };
    
      const handleStartEcChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          start_ec: event,
        }));
      };
    
      const handleEndEcChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          end_ec: event,
        }));
      };
    
      const handlePhUpChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ph_up: event,
        }));
      };
    
      const handlePhDownChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          ph_down: event,
        }));
      };
    
      const handleStartPpmChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          start_ppm: event,
        }));
      };
    
      const handleEndPpmChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          end_ppm: event,
        }));
      };
    
      const handleWaterChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          water: event,
        }));
      };
    
      const handleTemperatureChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          temperature: event,
        }));
      };
    
      const handleNoteChange = (event) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          note: event,
        }));
      };

    const handleDrop = useCallback(
        (_droppedFiles, acceptedFiles, rejectedFiles) => {
            setFiles((files) => [...files, ...acceptedFiles]);
            setRejectedFiles(rejectedFiles);
        },
        [],
    );

    const fileUpload = !files.length && <DropZone.FileUpload />;
    const uploadedFiles = files.length > 0 && (
        <LegacyStack vertical>
            {files.map((file, index) => (
                <LegacyStack alignment="center" key={index}>
                    <Thumbnail
                        size="small"
                        alt={file.name}
                        source={window.URL.createObjectURL(file)}
                    />
                    <div>
                        {file.name}{' '}
                        <Text variant="bodySm" as="p">
                            {file.size} bytes
                        </Text>
                    </div>
                </LegacyStack>
            ))}
        </LegacyStack>
    );


    const dispatch = useDispatch();

    const handleSubmit = (event, pods) => {
        event.preventDefault();
        dispatch(createRecord({
            ...formData,
            images: files
        }));
    };

    const pods = useSelector((state) => state.pods);

    return (
        <Form onSubmit={() => handleSubmit} implicitSubmit={false}>
            <FormLayout>
                <LegacyStack vertical>
                    <DropZone accept="image/*" type="image" onDrop={handleDrop}>
                        {uploadedFiles}
                        {fileUpload}
                    </DropZone>
                </LegacyStack>
                <TextField
                    value={formData.name}
                    onChange={handleNameChange}
                    label="Entered By"
                    type="text"
                    helpText={
                        <span>
                            The name of the member that made the adjustment.
                        </span>
                    }
                />

                <TextField
                    value={formData.start_ph}
                    onChange={handleStartPhChange}
                    label="Start pH"
                    type="text"
                />

                <TextField
                    value={formData.end_ph}
                    onChange={handleEndPhChange}
                    label="End pH"
                    type="text"
                />
                <TextField
                    value={formData.ph_up}
                    onChange={handlePhUpChange}
                    label="pH Up"
                    type="text"
                />
                <TextField
                    value={formData.ph_down}
                    onChange={handlePhDownChange}
                    label="pH down"
                    type="text"
                />
                <TextField
                    value={formData.start_ppm}
                    onChange={handleStartPpmChange}
                    label="start PPM"
                    type="text"
                />
                <TextField
                    value={formData.end_ppm}
                    onChange={handleEndPpmChange}
                    label="end PPM"
                    type="text"
                />
                <TextField
                    value={formData.water}
                    onChange={handleWaterChange}
                    label="H2O"
                    type="text"
                />
                <TextField
                    value={formData.temperature}
                    onChange={handleTemperatureChange}
                    label="Temperature"
                    type="text"
                />
                <Button submit>Submit</Button>
            </FormLayout>
        </Form>
    );
};

export default CreateRecordForm
