import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGardenPods, createPod, updatePod } from '../services/podSlice';
import { getLatestMeasurements } from '../services/measurementSlice';
import { LegacyStack, LegacyCard, Button, Columns, Modal, TextContainer } from '@shopify/polaris';
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

  const handleGetGardens = () => {
    dispatch(loadInitalState());
  };

  function phDisplayValue() {
    if (phMeasurements.length === 0) {
      return <p> Please Refresh Value </p>
    } else {
      return (
        <div>
          <p> {phMeasurements[0].value} </p>
          <p> Measured at {phMeasurements[0].created_at} </p>
        </div>)
    }
  }

  function ecDisplayValue() {
    if (ecMeasurements.length === 0) {
      return <p> Please Refresh Value </p>
    } else {
      return (
        <div>
          <p> {ecMeasurements[0].value} </p>
          <p> Measured at {ecMeasurements[0].created_at} </p>
        </div>)
    }
  }

  function ecRangeDisplayValue() {
    console.log(active_pod)
    if (active_pod.length <= 0) {
      return <p> Please Refresh Value </p>
    } else {
      return (
        <div>
          <p> {active_pod[0].min_ec} -  {active_pod[0].max_ec}</p>
        </div>)
    }
  }

  function phRangeDisplayValue() {
    console.log(active_pod)
    if (active_pod.length <= 0) {
      return <p> Please Refresh Value </p>
    } else {
      return (
        <div>
          <p> {active_pod[0].min_ph} -  {active_pod[0].max_ph}</p>
        </div>)
    }
  }



  return (
    <React.Fragment>
      <LegacyStack>
        <LegacyCard title="Garden pH" sectioned>
          <Columns gap="4" columns={2}>
            <div>
              <p> Current pH </p>
              {phDisplayValue()}
            </div>
            <div>
              <p> Ideal pH Range </p>
              {phRangeDisplayValue()}
            </div>
          </Columns>
        </LegacyCard>

        <LegacyCard title="Garden PPM" sectioned>
          <Columns gap="4" columns={2}>
            <div>
              <p> Current PPM </p>
              {ecDisplayValue()}
            </div>
            <div>
              <p> Ideal PPM Range </p>
              {ecRangeDisplayValue()}
            </div>
          </Columns>
        </LegacyCard>
        <Button onClick={handleGetGardens}> Pull measurements </Button>
        <UpdatePodModal pod = {active_pod[0]}/>
      </LegacyStack>

    </React.Fragment>
  );
};

export default PodContainer;