import * as Yup from 'yup';

import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { createTask } from '../../api/tasks';
import { fetchPriority } from '../../api/priority';
import { fetchUsers } from '../../api/users';
import styles from './CreateNewTask.module.scss';

const CreateNewTask = ({ handleClose }) => {
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [assignedToOptions, setAssignedToOptions] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const priorityOptionsData = await fetchPriority();
        const assignedToOptionsData = await fetchUsers();
        setPriorityOptions(priorityOptionsData);
        setAssignedToOptions(assignedToOptionsData);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

  const validationSchema = Yup.object().shape({
    Title: Yup.string().required('Title is required'),
    Description: Yup.string().required('Description is required'),
    StartDate: Yup.date().required('Start Date is required'),
    EndDate: Yup.date().required('End Date is required'),
    Priority: Yup.string().required('Priority is required'),
    AssignedTo: Yup.string().required('Assigned To is required'),
  });

  const handleSubmit = async (values) => {
    try {
      values.status = 'to_do';
      await createTask(values);
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Create New Task</h2>
      <Formik
        initialValues={{
          Title: '',
          Description: '',
          StartDate: '',
          EndDate: '',
          Priority: '',
          AssignedTo: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form className={styles.form}>
            <InputLabel>Title</InputLabel>
            <TextField
              name="Title"
              value={values.Title}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              className={styles.inputField}
            />
            <InputLabel>Description</InputLabel>
            <TextField
              name="Description"
              value={values.Description}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              className={styles.inputField}
            />
            <InputLabel>Start Date</InputLabel>
            <TextField
              name="StartDate"
              value={values.StartDate}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { inputMode: 'numeric' } }}
              className={styles.inputField}
            />
            <InputLabel>End Date</InputLabel>
            <TextField
              name="EndDate"
              value={values.EndDate}
              onChange={handleChange}
              onBlur={handleBlur}
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { inputMode: 'numeric' } }}
              className={styles.inputField}
            />
            <InputLabel>Priority</InputLabel>
            <Select
              name="Priority"
              value={values.Priority}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              className={styles.inputField}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.Name}
                </MenuItem>
              ))}
            </Select>
            <InputLabel>Asigned to</InputLabel>
            <Select
              name="AssignedTo"
              value={values.AssignedTo}
              onChange={handleChange}
              onBlur={handleBlur}
              fullWidth
              className={styles.inputField}
            >
              {assignedToOptions.map((option) => (
                <MenuItem key={option._id} value={option._id}>
                  {option.Name}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={styles.submitButton}
            >
              Create Task
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

CreateNewTask.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default CreateNewTask;
