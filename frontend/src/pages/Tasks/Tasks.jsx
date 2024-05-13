import {
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  deleteTask,
  fetchTasks,
  updateTask as updateTaskAPI,
} from '../../api/tasks';
import { useEffect, useState } from 'react';

import CreateNewTask from './CreateNewTask';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import { Modal } from '@mui/material';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import StarRateIcon from '@mui/icons-material/StarRate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import styles from './Tasks.module.scss';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksData = await fetchTasks();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (taskId, status) => {
    try {
      await updateTaskAPI(taskId, { status });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status } : task,
        ),
      );
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end - start;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.round(durationInDays);
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'important':
        return <PriorityHighIcon className={styles.redIcon} />;
      case 'high':
        return <NotificationImportantIcon className={styles.redIcon} />;
      case 'medium':
        return <StarRateIcon className={styles.yellowIcon} />;
      case 'low':
        return <WarningAmberIcon className={styles.green} />;
      default:
        return null;
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={styles.tasksContainer}>
      <h1 className={styles.title}>Tasks</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className={styles.TableRow}>
                <TableCell className={styles.tableCell}>Title</TableCell>
                <TableCell className={styles.tableCell}>Description</TableCell>
                <TableCell className={styles.tableCell}>Start Date</TableCell>
                <TableCell className={styles.tableCell}>End Date</TableCell>
                <TableCell className={styles.tableCell}>Duration</TableCell>
                <TableCell className={styles.tableCell}>Priority</TableCell>
                <TableCell className={styles.tableCell}>Assigned To</TableCell>
                <TableCell className={styles.tableCell}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {['to_do', 'in_progress', 'done'].map((status) => [
                <TableRow key={status} className={styles.tableRow}>
                  <TableCell colSpan={9} className={styles.tableCell}>
                    <h2>{status.toUpperCase().replace('_', ' ')}</h2>
                  </TableCell>
                </TableRow>,
                ...tasks
                  .filter((task) => task.status === status)
                  .map((task) => (
                    <TableRow className={styles.TableRow} key={task._id}>
                      <TableCell>{task.Title}</TableCell>
                      <TableCell>{task.Description}</TableCell>
                      <TableCell>{task.StartDate}</TableCell>
                      <TableCell>{task.EndDate}</TableCell>
                      <TableCell>
                        {calculateDuration(task.StartDate, task.EndDate)}
                      </TableCell>
                      <TableCell c>
                        <div>{getPriorityIcon(task.priority)}</div>
                        <div>{task.priority}</div>
                      </TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>
                        {task.status === 'to_do' && (
                          <>
                            <Button
                              onClick={() =>
                                handleStatusUpdate(task._id, 'in_progress')
                              }
                            >
                              <PlayArrowIcon className={styles.green} />
                            </Button>
                            <Button onClick={() => handleDelete(task._id)}>
                              <DeleteOutlineIcon className={styles.redIcon} />
                            </Button>
                          </>
                        )}
                        {task.status === 'in_progress' && (
                          <>
                            <Button
                              onClick={() =>
                                handleStatusUpdate(task._id, 'done')
                              }
                            >
                              <DoneIcon className={styles.green} />
                            </Button>
                            <Button onClick={() => handleDelete(task._id)}>
                              <DeleteOutlineIcon className={styles.redIcon} />
                            </Button>
                          </>
                        )}
                        {task.status === 'done' && (
                          <Button onClick={() => handleDelete(task._id)}>
                            <DeleteOutlineIcon className={styles.redIcon} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  )),
              ])}
            </TableBody>
          </Table>
          <Button variant="contained" onClick={handleOpen}>
            Create New Task
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <div>
              <CreateNewTask handleClose={handleClose} />
            </div>
          </Modal>
        </TableContainer>
      )}
    </div>
  );
};

export default Tasks;
