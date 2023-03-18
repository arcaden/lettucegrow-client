import { Select, Button, Modal, TextContainer, Form, FormLayout, TextField, Columns } from '@shopify/polaris';
import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function UpdateRecordModal({ id, user, created_at, start_ec, end_ec, start_ph, end_ph, temperature, ph_up, ph_down, water }) {

	let intitalState = {
		name: user.name,
		start_ph: start_ph,
		end_ph: end_ec,
		start_ec: start_ec,
		end_ec: end_ec,
		ph_up: ph_up,
		ph_down: ph_down,
		start_ppm: start_ec,
		end_ppm: end_ec,
		water: water,
		temperature: temperature,
		note: '',
		image: null,
	}
	const dispatch = useDispatch();
	const [active, setActive] = useState(false);
	const [formData, setFormData] = useState({
		...intitalState
	});

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

	const handleWaterChange = (event) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			water: event,
		}));
	};

	const handleChange = useCallback(() => setActive(!active), [active]);

	function populateForm(){
		setFormData((prevFormData) => ({
			...prevFormData,
			...intitalState
		}));
	}

	function toggleEditPod() {
		handleChange();
		populateForm();
	}

	function handleSubmit() {
		// dispatch(updateRecordById(pod.id, recordData));
		handleChange()
	}



	const activator = <Button onClick={toggleEditPod}>View More</Button>;

	return (
		<Modal
			activator={activator}
			open={active}
			onClose={handleChange}
			title={readableDate(created_at)}
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
			<Columns columns={2}>
				<img></img>
				<Modal.Section>
					<Form onSubmit={() => handleSubmit} implicitSubmit={false}>
						<FormLayout>
						<TextField
							value={formData.name}
							onChange={handleNameChange}
							label="Name"
							type="label"
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
							label="pH Up (mL)"
							type="text"
						/>
						<TextField
							value={formData.ph_down}
							onChange={handlePhDownChange}
							label="pH Down (mL)"
							type="text"
						/>
						<TextField
							value={formData.start_ec}
							onChange={handleStartEcChange}
							label="Start PPM"
							type="text"
						/>
						<TextField
							value={formData.end_ec}
							onChange={handleEndEcChange}
							label="End PPM"
							type="text"
						/>
						<Select
							label="H20"
							options={[{ label: 'Yes', value: true },
							{ label: 'No', value: false }]}
							onChange={handleWaterChange}
							value={formData.water}
						/>

						</FormLayout>
					</Form>
				</Modal.Section>
			</Columns>
		</Modal>
	);
}


function readableDate(dateString){
	const date = new Date(dateString);
	const options = { 
		year: 'numeric', 
		month: 'long', 
		day: '2-digit', 
		hour: 'numeric', 
		minute: 'numeric', 
		hour12: true 
	};
	const readableDate = date.toLocaleString('en-US', options);

	return readableDate
}

export default UpdateRecordModal