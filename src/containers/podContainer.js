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
  
    console.log(measurements)

  const handleGetGardens = () => {
    dispatch(loadInitalState());
  };


  return (
    <LegacyStack>
      <LegacyCard title="Garden pH" sectioned>
      <p> Current pH </p>
        <p> {phMeasurements[0].value} </p>
        <p> Measured at {phMeasurements[0].created_at } </p>      </LegacyCard>

      <LegacyCard title="Garden PPM" sectioned>
        <p> Current EC </p>
        <p> {ecMeasurements[0].value} </p>
        <p> Measured at {ecMeasurements[0].created_at } </p>
      </LegacyCard>
      <Button onClick={handleGetGardens}> Pull measurements </Button>
    </LegacyStack>
  );
};

export default PodContainer;