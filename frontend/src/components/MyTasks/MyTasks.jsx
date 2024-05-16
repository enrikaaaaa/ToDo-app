import { useEffect, useState } from 'react';

import { fetchTasks } from '../../api/tasks';
import styled from '../MyTasks/MyTasks.module.scss';

const MyTasks = () => {
  const [userTasks, setUserTasks] = useState([]);

  useEffect(() => {
    const loggedInUserId = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).Name
      : null;

    console.log('local', loggedInUserId);

    const fetchUserTasks = async () => {
      try {
        const allTasks = await fetchTasks();
        console.log(allTasks);

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

  return (
    <div>
      <h1>My Tasks</h1>
      <div className={styled.cardsContainer}>
        {userTasks.map((task) => (
          <div className={styled.card} key={task._id}>
            <div className={styled.cardTitle} > {task.Title}</div>
            <div>Description: {task.Description}</div>
            <div>Start Date: {task.StartDate}</div>
            <div>End Date: {task.EndDate}</div>
            <div>Priority: {task.Priority}</div>
            <div>Status: {task.Status}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
