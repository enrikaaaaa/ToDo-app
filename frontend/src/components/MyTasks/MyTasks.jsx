import { useEffect, useState } from 'react';

import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import StarRateIcon from '@mui/icons-material/StarRate';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { fetchTasks } from '../../api/tasks';
import styled from '../MyTasks/MyTasks.module.scss';

const MyTasks = () => {
  const [userTasks, setUserTasks] = useState([]);

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
                    Description:</div><div>
                    {task.Description}
                  </div>
                  <div>
                    Start Date:</div><div>
                    {task.StartDate}
                  </div>
                  <div>
                    End Date:</div><div>
                    {task.EndDate}
                  </div>
                  <div>
                    Priority:</div><div>
                    {getPriorityIcon(task.priority)}
                    {task.priority}
                  </div>
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
