import { CircularProgress } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import React from 'react';
import { fetchTasks } from '../../api/tasks';
import styles from './ChartPie.module.scss';

const ChartPie = () => {
  const [tasks, setTasks] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
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

  const countTasksByStatus = () => {
    const counts = {
      done: 0,
      to_do: 0,
      in_progress: 0,
    };

    tasks.forEach((task) => {
      counts[task.status]++;
    });

    return counts;
  };

  const tasksByStatus = countTasksByStatus();

  const data = [
    { label: 'Done', value: tasksByStatus.done },
    { label: 'To Do', value: tasksByStatus.to_do },
    { label: 'In Progress', value: tasksByStatus.in_progress },
  ];

  const pieArcLabelClasses = {
    root: styles.arcLabel,
  };

  const size = {};

  return (
    <div className={styles.chartContainer}>
      <h1>Pie Chart</h1>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.label} (${item.value})`,
              arcLabelMinAngle: 45,
              data,
              arcLabelPosition: 'outside',
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: 'white',
              fontWeight: 'bold',
            },
          }}
          {...size}
        />
      )}
    </div>
  );
};

export default ChartPie;
