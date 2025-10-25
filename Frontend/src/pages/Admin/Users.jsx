import React, { useEffect, useState } from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminYesNoDialog from '../../components/Datas/AdminYesNoDialog';
const API_URL = process.env.VITE_API_URL;

export default function Users() {

    const [ud, setUserData] = useState([]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedData, setSelectedData] = useState(null);

    const deleteData = async (id) => {
      fetchUserData();

      try {
          const res = await fetch(`${API_URL}/delete-admin-user-data/${id}`, {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },

          });

              if (!res.ok) {
                  throw new Error("HTTP Error");
              }
              location.reload();
          } catch (error) {
              console.error(error);
          }

  };


    const fetchUserData = async () => {
        setUserData([]);
        try {
            const res = await fetch(`${API_URL}/fetch-user-data-atAdmin`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });


            const data = await res.json();
            setUserData(data.master_user_admin);

            if (!res.ok) {
                throw new Error("HTTP Error");
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchUserData();
    }, []);
    return (
        <div style={{marginTop:'80px'}}>

            <Paper sx={{ opacity: 1, width: '60%', margin: '0 auto', borderRadius:'10px' }}>

                <Table sx={{ overflowX: 'auto', display: 'block', width: '100%', maxWidth: 'max-content', margin: '0 auto', borderRadius:'5px' }}>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: 'rgb(255, 144, 59)' }}>
                            <TableCell sx={{ textAlign: 'center', color: 'black' }}>ID</TableCell>
                            <TableCell sx={{ textAlign: 'center', color: 'black' }}>Customer Name</TableCell>
                            <TableCell sx={{ textAlign: 'center', color: 'black' }}>EMail ID</TableCell>
                            <TableCell sx={{ textAlign: 'center', color: 'black' }}>Account Created At</TableCell>
                            <TableCell sx={{ textAlign: 'center', color: 'black' }}>Account Updated At</TableCell>
                            <TableCell colSpan={2} sx={{ textAlign: 'center', color: 'black' }}>Actions</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>
                        {ud.map((item, index) => (
                            <TableRow key={index} sx={{"&:hover":{backgroundColor:'rgb(200, 197, 197)'}}}>
                                <TableCell sx={{ textAlign: 'center' }}>{item.ID}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{item.Name}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>{item.EMail}</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                {new Date(item.Created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                </TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                {new Date(item.Updated_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                                </TableCell>
                                <TableCell>
                                    <IconButton aria-label="delete" onClick={() => {
                                        setSelectedData(item.ID);
                                        setDeleteDialogOpen(true);
                                    }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <AdminYesNoDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={() => {
                    setDeleteDialogOpen(false);
                    deleteData(selectedData);
                }}
            />
        </div>
    )
}
