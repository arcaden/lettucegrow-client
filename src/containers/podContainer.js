import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGardenPods, createPod, updatePod } from '../services/podSlice';
import { getLatestMeasurements } from '../services/measurementSlice';
import { LegacyStack, LegacyCard, Button } from '@shopify/polaris';
import { getGardens, loadInitalState } from '../services/gardenSlice';


const PodContainer = () => {
  const dispatch = useDispatch();
  const pods = useSelector((state) => state.pods);
  const measurements = useSelector((state => state.measurements))

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

  return (
    <LegacyStack>
      <LegacyCard title="Garden pH" sectioned>
        <p> Current pH </p>
        {phDisplayValue()}
      </LegacyCard>

      <LegacyCard title="Garden PPM" sectioned>
        <p> Current EC </p>
        {ecDisplayValue()}
      </LegacyCard>
      <Button onClick={handleGetGardens}> Pull measurements </Button>
    </LegacyStack>
  );
};

export default PodContainer;