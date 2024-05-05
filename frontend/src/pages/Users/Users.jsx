import { deleteUser, fetchUsers } from '../../api/users';
import { useEffect, useState } from 'react';

import styled from 'styled-components';

const UsersContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const UsersTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  border: 1px solid #ddd;
  padding: 8px;
  background-color: #f2f2f2;
`;

const TableData = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
`;

const HoverTableRow = styled.tr`
  &:hover {
    background-color: #ddd;
  }
`;

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <UsersContainer>
      <h1>All Users</h1>
      <UsersTable>
        <thead>
          <tr>
            <TableHeader>ID</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Last Name</TableHeader>
            <TableHeader>Password</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Position</TableHeader>
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <HoverTableRow
              key={index}
              className={index % 2 === 0 ? 'even' : ''}
            >
              <TableData>{user._id}</TableData>
              <TableData>{user.Name}</TableData>
              <TableData>{user.LastName}</TableData>
              <TableData>{user.Password}</TableData>
              <TableData>{user.Email}</TableData>
              <TableData>{user.Role}</TableData>
              <TableData>{user.Position}</TableData>
              <TableData>
                <button onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </button>
              </TableData>
            </HoverTableRow>
          ))}
        </tbody>
      </UsersTable>
    </UsersContainer>
  );
};

export default Users;
