import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRecord } from '../services/recordsSlice';
import { Modal, Form, FormLayout, TextField, Button, DropZone, LegacyStack, Thumbnail, Text, Select, LegacyCard, Scrollable, Columns } from '@shopify/polaris';
import { getLatestMeasurements } from '../services/measurementSlice';


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

    const [selected, setSelected] = useState('today');

    const handleSelectChange = useCallback((value) => setSelected(value), []);

    const options = [
        { label: 'Today', value: 'today' },
        { label: 'Yesterday', value: 'yesterday' },
        { label: 'Last 7 days', value: 'lastWeek' },
    ];


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
    function instructionsText(pods) {
        if (pods && pods[0]) {
            return (
                <div>
                    {pods[0].instructions}
                </div>
            )
        } else {
            <div>
                Check the Water Level:
                Regularly check the water level in your hydroponic system. You should aim to keep the water level consistent, neither too high nor too low, to ensure the roots have enough oxygen.

                Monitor the pH:
                Maintaining the correct pH level is crucial for the health of your plants. Check the pH level regularly and adjust it if necessary using a pH up or down solution.

                Adjust Nutrient Levels:
                Your hydroponic plants require the right balance of nutrients to grow strong and healthy. Read the nutrient levels in your system and adjust the levels as needed. Be careful not to over-fertilize, as this can damage the roots.

                Clean the System:
                Regularly clean your hydroponic system to prevent the build-up of algae, bacteria, and other contaminants. Remove any debris, and sanitize the system using a hydrogen peroxide solution or another cleaning product designed for hydroponic systems.

                Check for Pests and Diseases:
                Pests and diseases can quickly spread in a hydroponic garden, so it's important to keep a close eye on your plants. Check for signs of pests and diseases, such as discoloration, wilting, or unusual growth, and take action immediately if you spot any issues.

                Prune and Train Plants
                Regularly prune your hydroponic plants to remove any dead or damaged leaves, and train them to grow in the desired direction. This will help to maximize the space in your garden and ensure that your plants receive the right amount of light.
            </div>
        }
    }

    function getDate() {
        const date = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    }

    const measurements = useSelector((state) => state.measurements);

    const ecMeasurements = measurements.filter(measurement => {
        return measurement.measurement_type === "ec";
    });

    const phMeasurements = measurements.filter(measurement => {
        return measurement.measurement_type === "ph";
    });

    const [active, setActive] = useState(false);
    const handleChange = useCallback(() => setActive(!active), [active]);
    const [instructions, setInstructions] = useState(true);
    const cols = instructions ? 2 : 1
    const handleInstructionsChange = useCallback(() => setActive(!active), [active]);

    function renderInstructions() {
        if (instructions) {
            return (
                <LegacyCard title="Instructions" sectioned>
                    <Scrollable shadow focusable>
                        {instructionsText(pods.pods)}
                    </Scrollable>
                </LegacyCard>
            )
        }
    }

    const activator = <Button primary onClick={handleChange}>Add Adjustment</Button>;

    function handleGetStartValues() {
        dispatch(getLatestMeasurements())
        setFormData((prevFormData) => ({
            ...prevFormData,
            start_ph: phMeasurements[0].value,
            start_ec: ecMeasurements[0].value
        }));
    }

    function handleGetEndValues() {
        dispatch(getLatestMeasurements())
        setFormData((prevFormData) => ({
            ...prevFormData,
            end_ph: phMeasurements[0].value,
            end_ec: ecMeasurements[0].value
        }));
    }

    return (
        <Modal
            activator={activator}
            open={active}
            onClose={handleChange}
            title={getDate()}
            primaryAction={{
                content: 'Save',
                onAction: handleSubmit,
            }}
            large={instructions}
            secondaryActions={[
                {
                    content: 'Cancel',
                    onAction: handleChange,
                },
            ]}
        >
            <Columns columns={cols}>
                <Modal.Section>
                    <Form onSubmit={() => handleSubmit} implicitSubmit={false}>
                        <FormLayout>

                            <DropZone accept="image/*"
                                type="image"
                                onDrop={handleDrop}
                                label="Image"
                            >
                                {uploadedFiles}
                                {fileUpload}
                            </DropZone>

                            <TextField
                                value={formData.name}
                                onChange={handleNameChange}
                                label="Name"
                                type="text"
                            />
                            <LegacyStack alignment='trailing'>
                                <LegacyStack.Item fill>
                                    <TextField
                                        value={formData.start_ph}
                                        onChange={handleStartPhChange}
                                        label="Start pH"
                                        type="text"
                                    />
                                </LegacyStack.Item>
                                <LegacyStack.Item>
                                    <Button onClick={handleGetStartValues}>Take Measurement</Button>
                                </LegacyStack.Item>
                            </LegacyStack>

                            <LegacyStack alignment='trailing'>
                                <LegacyStack.Item fill>
                                    <TextField
                                        value={formData.end_ph}
                                        onChange={handleEndPhChange}
                                        label="End pH"
                                        type="text"
                                    />
                                </LegacyStack.Item>
                                <LegacyStack.Item>
                                    <Button onClick={handleGetEndValues}>Take Measurement</Button>
                                </LegacyStack.Item>
                            </LegacyStack>


                            <LegacyStack alignment='trailing'>
                                <LegacyStack.Item fill>
                                    <TextField
                                        value={formData.ph_up}
                                        onChange={handlePhUpChange}
                                        label="pH Up (mL)"
                                        type="text"
                                    />
                                </LegacyStack.Item>
                                <LegacyStack.Item fill>
                                    <TextField
                                        value={formData.ph_down}
                                        onChange={handlePhDownChange}
                                        label="pH Down (mL)"
                                        type="text"
                                    />
                                </LegacyStack.Item>
                            </LegacyStack>

                            <LegacyStack distribution="leading" alignment="trailing">
                                <LegacyStack.Item fill>
                                    <TextField
                                        value={formData.start_ppm}
                                        onChange={handleStartPpmChange}
                                        label="Start PPM"
                                        type="text"
                                    />
                                </LegacyStack.Item>
                                <Button onClick={handleGetStartValues}>Take Measurement</Button>
                            </LegacyStack>

                            <LegacyStack distribution="leading" alignment="trailing">
                                <LegacyStack.Item fill>
                                    <TextField
                                        value={formData.end_ppm}
                                        onChange={handleEndPpmChange}
                                        label="End PPM"
                                        type="text"
                                    />
                                </LegacyStack.Item>
                                <Button onClick={handleGetEndValues}>Take Measurement</Button>
                            </LegacyStack>

                            <Select
                                label="H20"
                                options={[{ label: 'Yes', value: true },
                                { label: 'No', value: false }]}
                                onChange={handleWaterChange}
                                value={selected}
                            />
                        </FormLayout>
                    </Form>
                </Modal.Section>
                {renderInstructions(pods)}
            </Columns>
        </Modal>
    );
};

export default CreateRecordForm
