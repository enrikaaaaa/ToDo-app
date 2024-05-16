import {
  deleteTask,
  fetchTasks,
  updateTask as updateTaskAPI,
} from '../../api/tasks';
import { useEffect, useState } from 'react';

import Button from '@mui/material/Button';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import StarRateIcon from '@mui/icons-material/StarRate';
import TableCell from '@mui/material/TableCell'; // Import TableCell from @mui/material
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import styled from '../MyTasks/MyTasks.module.scss';

// Import deleteTask and fetchTasks

const MyTasks = () => {
  const [userTasks, setUserTasks] = useState([]);
  const [, setTasks] = useState([]);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).Name
      : null;

    const fetchUserTasks = async () => {
      try {
        const allTasks = await fetchTasks();

        const tasksForUser = allTasks.filter(
          (task) => task.assignedTo === String(loggedInUserId),
        );

        setUserTasks(tasksForUser);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    if (loggedInUserId) {
      fetchUserTasks();
    } else {
      console.error('User ID not found in localStorage');
    }
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

  const getPriorityIcon = (priority) => {
    const priorityIcons = {
      important: <PriorityHighIcon className={styled.redIcon} />,
      high: <NotificationImportantIcon className={styled.redIcon} />,
      medium: <StarRateIcon className={styled.yellowIcon} />,
      low: <WarningAmberIcon className={styled.green} />,
    };

    return priorityIcons[priority] || null;
  };

  const sections = {
    to_do: [],
    in_progress: [],
    done: [],
  };

  userTasks.forEach((task) => {
    sections[task.status].push(task);
  });

  return (
    <div>
      <h1>My Tasks</h1>
      {Object.entries(sections).map(([status, tasksInSection]) => (
        <div key={status}>
          <h2>{status.toUpperCase().replace('_', ' ')}</h2>
          <div className={styled.cardsContainer}>
            {tasksInSection.map((task) => (
              <div className={styled.card} key={task._id}>
                <div className={styled.cardTitle}>{task.Title}</div>
                <div className={styled.cardDescription}>
                  <div>
                    Description:
                    <div>{task.Description}</div>
                  </div>
                  <div>
                    Start Date:
                    <div>{task.StartDate}</div>
                  </div>
                  <div>
                    End Date:
                    <div>{task.EndDate}</div>
                  </div>
                  <div>
                    Priority:
                    <div>
                      {getPriorityIcon(task.priority)}
                      {task.priority}
                    </div>
                  </div>
                  <TableCell>
                    {task.status === 'to_do' && (
                      <>
                        <Button
                          onClick={() =>
                            handleStatusUpdate(task._id, 'in_progress')
                          }
                        >
                          <PlayArrowIcon className={styled.green} />
                        </Button>
                        <Button
                          onClick={() => {
                            handleDelete(task._id);
                          }}
                        >
                          <DeleteOutlineIcon className={styled.redIcon} />
                        </Button>
                      </>
                    )}
                    {task.status === 'in_progress' && (
                      <>
                        <Button
                          onClick={() => handleStatusUpdate(task._id, 'done')}
                        >
                          <DoneIcon className={styled.green} />
                        </Button>
                        <Button onClick={() => handleDelete(task._id)}>
                          <DeleteOutlineIcon className={styled.redIcon} />
                        </Button>
                      </>
                    )}
                    {task.status === 'done' && (
                      <Button onClick={() => handleDelete(task._id)}>
                        <DeleteOutlineIcon className={styled.redIcon} />
                      </Button>
                    )}
                  </TableCell>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyTasks;
