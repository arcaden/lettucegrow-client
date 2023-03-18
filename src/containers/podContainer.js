import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGardenPods, createPod, updatePod } from '../services/podSlice';
import { getLatestMeasurements } from '../services/measurementSlice';
import { LegacyStack, LegacyCard, Button, Columns, Modal, Text, Frame } from '@shopify/polaris';
import { getGardens, loadInitalState } from '../services/gardenSlice';
import ModalExample from '../components/UpdatePodModal';
import UpdatePodModal from '../components/UpdatePodModal';


const PodContainer = () => {
	const dispatch = useDispatch();
	const pods = useSelector((state) => state.pods.pods);
	const activePodId = useSelector((state) => state.activePodId);
	const measurements = useSelector((state => state.measurements))
	const [active, setActive] = useState(true);

	const handleModalChange = useCallback(() => setActive(!active), [active]);
	const activator = <Button onClick={handleModalChange}> Edit </Button>;

	useEffect(() => {
		dispatch(loadInitalState());
	}, [dispatch]);

	const handleCreatePod = (body) => {
		if (body) {
			dispatch(createPod(body));
		}
	};

	const handleUpdatePod = (id, body) => {
		if (body) {
			dispatch(updatePod(id, body));
		}
	};

	const ecMeasurements = measurements.filter(measurement => {
		return measurement.measurement_type === "ec";
	});

	const phMeasurements = measurements.filter(measurement => {
		return measurement.measurement_type === "ph";
	});

	const active_pod = pods.length > 0 ? [pods[0]] : []
	let title = pods.length > 0 ? active_pod[0].label : "Please Refresh"
	let last_refresh_time = phMeasurements.length === 0 ? "Please Refresh Value" : phMeasurements[0].created_at

	const handleGetGardens = () => {
		dispatch(loadInitalState());
	};

	function phDisplayValue() {
		if (phMeasurements.length === 0) {
			return <p> Please Refresh Value </p>
		} else {
			let measurementColor = ""
			if (Number(phMeasurements[0].value < active_pod[0].min_ph) || Number(phMeasurements[0].value > active_pod[0].max_ph)) {
				measurementColor = "critical"
			}
			return (
				<LegacyStack vertical>
					<Text variant="headingSm" as="h1">
						Current pH
					</Text>
					<Text variant="heading4xl" color={measurementColor}>
						{phMeasurements[0].value}
					</Text>
				</LegacyStack>)
		}
	}

	function ecDisplayValue() {
		if (ecMeasurements.length === 0) {
			return <p> Please Refresh Value </p>
		} else {
			let measurementColor = ""
			if (Number(ecMeasurements[0].value) < Number(active_pod[0].min_ec) || Number(ecMeasurements[0].value) > Number(active_pod[0].max_ec)) {
				measurementColor = "critical"
			}
			return (
				<LegacyStack vertical>
					<Text variant="headingSm">
						Current PPM
					</Text>
					<Text variant="heading4xl" as="h1" color={measurementColor}>
						{ecMeasurements[0].value}
					</Text>
				</LegacyStack>)
		}
	}

	function ecRangeDisplayValue() {
		console.log(active_pod)
		if (active_pod.length <= 0) {
			return <p> Please Refresh Value </p>
		} else {
			return (
				<LegacyStack vertical>
					<Text variant="headingSm">
						Ideal PPM Range
					</Text>
					<Text variant="heading4xl" as="h1">
						{active_pod[0].min_ec} -  {active_pod[0].max_ec}
					</Text>
				</LegacyStack>)
		}
	}

	function phRangeDisplayValue() {
		console.log(active_pod)
		if (active_pod.length <= 0) {
			return <p> Please Refresh Value </p>
		} else {
			return (
				<LegacyStack vertical>
					<Text variant="headingSm">
						Ideal pH Range
					</Text>
					<Text variant="heading4xl" as="h1">
						{active_pod[0].min_ph} -  {active_pod[0].max_ph}
					</Text>
				</LegacyStack>)
		}
	}

	function readableDate(dateString) {
		const date = new Date(dateString);
		const options = {
			month: 'long',
			day: '2-digit',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: true
		};
		const readableDate = date.toLocaleString('en-US', options);

		return readableDate
	}

	return (
		<React.Fragment>
			<LegacyCard title={title}>
				<LegacyCard.Section>
					<LegacyStack vertical>
						<LegacyStack spacing='loose' distribution="fill">
							<LegacyCard sectioned>
								<LegacyStack vertical>
									<Columns columns={2}>
										{phDisplayValue()}
										{phRangeDisplayValue()}
									</Columns>
									<Text> Last Updated: {readableDate(last_refresh_time)} </Text>
								</LegacyStack>
							</LegacyCard>

							<LegacyCard sectioned>
								<LegacyStack vertical>
									<Columns columns={2}>
										{ecDisplayValue()}
										{ecRangeDisplayValue()}
									</Columns>
									<Text> Last Updated: {readableDate(last_refresh_time)} </Text>
								</LegacyStack>
							</LegacyCard>

						</LegacyStack>

						<LegacyStack distribution="trailing">
							<Button primary onClick={handleGetGardens}> Refresh </Button>
							<UpdatePodModal pod={active_pod[0]} />
						</LegacyStack>
					</LegacyStack>
				</LegacyCard.Section>

			</LegacyCard>
		</React.Fragment>
	);
};

export default PodContainer;