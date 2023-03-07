import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { createRecord } from '../services/recordsSlice';
import { Form, FormLayout, TextField, Button, DropZone, LegacyStack, Thumbnail, Text, Banner, List } from '@shopify/polaris';


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
    const hasError = rejectedFiles.length > 0;

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

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecord({
            ...formData,
            images: files
        }));
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const newValue = type === 'file' ? event.target.files[0] : value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: newValue,
        }));
    };

    return (
        <Form onSubmit={handleSubmit} implicitSubmit={false}>
            <FormLayout>
                <LegacyStack vertical>
                    <DropZone accept="image/*" type="image" onDrop={handleDrop}>
                        {uploadedFiles}
                        {fileUpload}
                    </DropZone>
                </LegacyStack>
                <TextField
                    value={formData.name}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    label="Start pH"
                    type="text"
                />

                <TextField
                    value={formData.end_ph}
                    onChange={handleChange}
                    label="End pH"
                    type="text"
                />
                <TextField
                    value={formData.ph_up}
                    onChange={handleChange}
                    label="pH Up"
                    type="text"
                />
                <TextField
                    value={formData.ph_down}
                    onChange={handleChange}
                    label="pH down"
                    type="text"
                />
                <TextField
                    value={formData.start_ppm}
                    onChange={handleChange}
                    label="start PPM"
                    type="text"
                />
                <TextField
                    value={formData.end_ppm}
                    onChange={handleChange}
                    label="end PPM"
                    type="text"
                />
                <TextField
                    value={formData.water}
                    onChange={handleChange}
                    label="H2O"
                    type="text"
                />
                <TextField
                    value={formData.temperature}
                    onChange={handleChange}
                    label="Temperature"
                    type="text"
                />
                <Button submit>Submit</Button>
            </FormLayout>
        </Form>
    );
};

export default CreateRecordForm
