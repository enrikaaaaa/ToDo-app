import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { deleteTask, fetchTasks, updateTask } from '../../api/tasks';
import { useEffect, useState } from 'react';

import { fetchUsers } from '../../api/users';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchTasks().then((data) => setTasks(data));
    fetchUsers().then((data) => setUsers(data));
  }, []);

  const handleStatusUpdate = async (taskId, status) => {
    await updateTask(taskId, { status });
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId ? { ...task, status } : task,
      ),
    );
  };

  const handleDelete = async (taskId) => {
    await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const durationInMilliseconds = end - start;
    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
    return Math.round(durationInDays);
  };

  return (
    <div>
      <h1>Tasks</h1>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task._id}>
                <TableCell>{task.Title}</TableCell>
                <TableCell>{task.Description}</TableCell>
                <TableCell>{task.StartDate}</TableCell>
                <TableCell>{task.EndDate}</TableCell>
                <TableCell>
                  {calculateDuration(task.StartDate, task.EndDate)}
                </TableCell>
                <TableCell>{task.Priority}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  {users.find((user) => user._id === task.UserId)?.Name}
                </TableCell>
                <TableCell>
                  {task.status === 'to_do' && (
                    <>
                      <Button
                        onClick={() =>
                          handleStatusUpdate(task._id, 'in_progress')
                        }
                      >
                        Start
                      </Button>
                      <Button onClick={() => handleDelete(task._id)}>
                        Delete
                      </Button>
                    </>
                  )}
                  {task.status === 'in_progress' && (
                    <>
                      <Button
                        onClick={() => handleStatusUpdate(task._id, 'done')}
                      >
                        Finish
                      </Button>
                      <Button onClick={() => handleDelete(task._id)}>
                        Delete
                      </Button>
                    </>
                  )}
                  {task.status === 'done' && (
                    <Button onClick={() => handleDelete(task._id)}>
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tasks;
