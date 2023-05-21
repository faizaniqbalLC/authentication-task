import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../redux/slices/auth/authSlice";
import { enqueueSnackbar } from "notistack";
import axios from "axios";

const TableDashBoard = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [isLoad, setIsLoad] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.authUser);

  useEffect(() => {
    if (isLoggedIn === true) {
      enqueueSnackbar("Logged In SuccessFully", { variant: "success" });
      dispatch(reset());
    }
  }, [isLoggedIn, dispatch]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoad(true);
    const resp = await axios(
      "https://api.sampleapis.com/baseball/hitsSingleSeason"
    );
    setData(resp?.data);
    setIsLoad(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      {data.length < 1 && isLoad ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <Typography variant="h6">Loading...</Typography>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} sx={{ marginTop: 4 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Color Name</TableCell>
                  <TableCell>HEX Color</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {row.Rank}
                      </TableCell>
                      <TableCell>{row.Player}</TableCell>
                      <TableCell>{row.AgeThatYear}</TableCell>
                      <TableCell>{row.Hits}</TableCell>
                      <TableCell>{row.Year}</TableCell>
                      <TableCell>{row.Bats}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[2, 10, 15, 20, 25, 30, 35, 40, 45, 50]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ my: 2 }}
          />
        </>
      )}
    </>
  );
};

export default TableDashBoard;
