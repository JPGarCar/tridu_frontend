import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers";
import { DateTime } from "luxon";
import StepCardLayout from "./StepCardLayout.tsx";
import { useApiServiceContext } from "../../context/ApiContext.tsx";

const CreateUserStep = (props: { handelSuccess: (arg0: number) => void }) => {
  const { getApiClient } = useApiServiceContext();

  const genderOptions = [
    { value: "U", key: "Undefined" },
    { value: "M", key: "Male" },
    { value: "F", key: "Female" },
    { value: "D", key: "Gender Diverse" },
  ];

  const UserFormSchema = Yup.object({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    dob: Yup.date().required().max(DateTime.now(), "Date must be in the past!"),
    gender: Yup.string().required(),
    email: Yup.string().required().email("Must be an email!"),
    phone: Yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dob: DateTime.now(),
      gender: genderOptions[0].value,
      email: "",
      phone: "",
    },
    validationSchema: UserFormSchema,
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);
      const apiClient = await getApiClient();
      const response = await apiClient.accounts_api_create_user(null, {
        first_name: values.firstName,
        last_name: values.lastName,
        date_of_birth: values.dob.toISO(),
        gender: values.gender,
        email: values.email,
        phone_number: values.phone,
      });

      if (response.data.id) {
        props.handelSuccess(response.data.id);
      }
    },
  });

  return (
    <StepCardLayout
      instructions={"First create the user with their personal information."}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            type={"text"}
            id={"firstName"}
            label={"First Name"}
            error={
              formik.errors.firstName != undefined && formik.touched.firstName
            }
            helperText={
              formik.errors.firstName != undefined && formik.touched.firstName
                ? formik.errors.firstName
                : ""
            }
            onChange={formik.handleChange}
          />
          <TextField
            type={"text"}
            id={"lastName"}
            label={"Last Name"}
            error={
              formik.errors.lastName != undefined && formik.touched.lastName
            }
            helperText={
              formik.errors.lastName != undefined && formik.touched.lastName
                ? formik.errors.lastName
                : ""
            }
            onChange={formik.handleChange}
          />

          <TextField
            type={"email"}
            id={"email"}
            label={"Email"}
            error={formik.errors.email != undefined && formik.touched.email}
            helperText={
              formik.errors.email != undefined && formik.touched.email
                ? formik.errors.email
                : ""
            }
            onChange={formik.handleChange}
          />
          <TextField
            type={"tel"}
            id={"phone"}
            label={"Phone Number"}
            error={formik.errors.phone != undefined && formik.touched.phone}
            helperText={
              formik.errors.phone != undefined && formik.touched.phone
                ? formik.errors.phone
                : ""
            }
            onChange={formik.handleChange}
          />

          <DatePicker
            label={"Date of Birth"}
            openTo={"year"}
            views={["year", "month", "day"]}
            onChange={(value) => {
              void formik.setFieldValue("dob", value, true);
            }}
            slotProps={{
              textField: {
                error:
                  formik.errors.dob != undefined &&
                  formik.touched.dob != undefined,
                helperText:
                  formik.errors.dob != undefined &&
                  formik.touched.dob != undefined
                    ? formik.errors.dob.invalidReason
                    : "",
              },
            }}
          />

          <FormControl>
            <InputLabel id={`label-for-gender`}>Gender</InputLabel>
            <Select
              name={"gender"}
              id={"gender"}
              labelId={`label-for-gender`}
              error={formik.errors.gender != undefined && formik.touched.gender}
              label={"Gender"}
              value={formik.values.gender}
              onChange={formik.handleChange}
              sx={{ minWidth: 100 }}
            >
              {genderOptions.map(({ key, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {key}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          {formik.isSubmitting ? (
            <CircularProgress />
          ) : (
            <Button type={"submit"} color={"success"}>
              Continue
            </Button>
          )}
        </Stack>
      </form>
    </StepCardLayout>
  );
};

export default CreateUserStep;
