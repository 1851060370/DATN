import React from 'react';
import {styled} from '@mui/material/styles'
import { flexRender } from '@tanstack/react-table';
import { TableBody, TableCell, TableRow } from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
	  backgroundColor: theme.palette.action.light,
	},
  }));

const CoreTableBody = ({ table,loading }) => {

	const renderRows = () => {
		const { rows } = table.getRowModel()
		const allColumns = table.getAllColumns()
		if (rows.length === 0) {
			return (
				<TableRow>
					<TableCell align="center" colSpan={allColumns.length}>
						Không tìm thấy dữ liệu!
					</TableCell>
				</TableRow>
			)
		}
		return rows.map(row => (
			<StyledTableRow key={row.id}>
				{row.getVisibleCells().map(cell => {
					return (
						<TableCell
							key={cell.id}
							{...{
								style: {
									width: cell.column.getSize()
								}
							}}
						>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					)
				})}
			</StyledTableRow>
		))
	}

	return <TableBody>{renderRows()}</TableBody>
};

export default React.memo(CoreTableBody);
