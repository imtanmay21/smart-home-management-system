import { useTheme } from "@emotion/react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect } from "react";

export const CustomTable = ({ headers, items, tableFor }) => {
  const theme = useTheme();

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: theme.palette.primary.dark }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell
                key={header}
                sx={{ color: theme.palette.secondary.main }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {items.map((item, index) => (
            <TableRow key={index}>
              {headers.map((header) => (
                <TableCell
                  key={header}
                  sx={{ color: theme.palette.secondary.main }}
                >
                  {item[header]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
