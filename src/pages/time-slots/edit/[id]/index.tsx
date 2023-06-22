import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getTimeSlotById, updateTimeSlotById } from 'apiSdk/time-slots';
import { Error } from 'components/error';
import { timeSlotValidationSchema } from 'validationSchema/time-slots';
import { TimeSlotInterface } from 'interfaces/time-slot';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BikeRepairStationInterface } from 'interfaces/bike-repair-station';
import { getBikeRepairStations } from 'apiSdk/bike-repair-stations';

function TimeSlotEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<TimeSlotInterface>(
    () => (id ? `/time-slots/${id}` : null),
    () => getTimeSlotById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TimeSlotInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTimeSlotById(id, values);
      mutate(updated);
      resetForm();
      router.push('/time-slots');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TimeSlotInterface>({
    initialValues: data,
    validationSchema: timeSlotValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Time Slot
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="start_time" mb="4">
              <FormLabel>Start Time</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.start_time ? new Date(formik.values?.start_time) : null}
                  onChange={(value: Date) => formik.setFieldValue('start_time', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <FormControl id="end_time" mb="4">
              <FormLabel>End Time</FormLabel>
              <Box display="flex" maxWidth="100px" alignItems="center">
                <DatePicker
                  dateFormat={'dd/MM/yyyy'}
                  selected={formik.values?.end_time ? new Date(formik.values?.end_time) : null}
                  onChange={(value: Date) => formik.setFieldValue('end_time', value)}
                />
                <Box zIndex={2}>
                  <FiEdit3 />
                </Box>
              </Box>
            </FormControl>
            <AsyncSelect<BikeRepairStationInterface>
              formik={formik}
              name={'bike_repair_station_id'}
              label={'Select Bike Repair Station'}
              placeholder={'Select Bike Repair Station'}
              fetcher={getBikeRepairStations}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'time_slot',
  operation: AccessOperationEnum.UPDATE,
})(TimeSlotEditPage);
