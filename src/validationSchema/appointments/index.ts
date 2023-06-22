import * as yup from 'yup';

export const appointmentValidationSchema = yup.object().shape({
  status: yup.string().required(),
  bike_owner_id: yup.string().nullable(),
  time_slot_id: yup.string().nullable(),
});
