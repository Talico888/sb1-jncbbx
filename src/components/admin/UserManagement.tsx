import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { openDb } from '../../db/database';
import { User } from '../../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: '' });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const db = await openDb();
    const fetchedUsers = await db.all('SELECT * FROM users');
    setUsers(fetchedUsers);
  };

  const handleAddUser = async () => {
    const db = await openDb();
    await db.run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [newUser.username, newUser.password, newUser.role]);
    setNewUser({ username: '', password: '', role: '' });
    fetchUsers();
  };

  const handleDeleteUser = async (id: number) => {
    const db = await openDb();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    fetchUsers();
  };

  return (
    <div>
      <h2>User Management</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h3>Add New User</h3>
      <TextField
        label="Username"
        value={newUser.username}
        onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      />
      <FormControl>
        <InputLabel>Role</InputLabel>
        <Select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value as string })}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="cashier">Cashier</MenuItem>
          <MenuItem value="supervisor">Supervisor</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleAddUser}>Add User</Button>
    </div>
  );
};

export default UserManagement;