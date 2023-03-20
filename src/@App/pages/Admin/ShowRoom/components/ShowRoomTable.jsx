import { Box, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import ShowRoomFilter from './ShowRoomFilter';
import { usePageContext } from '@App/components/Provider/PageProvider';
import CoreTable, { columnHelper } from '@Core/components/Table/CoreTable';
import {
    CoreTableActionEdit,
    CoreTableActionDelete
} from '@Core/components/Table/components/CoreTableActions';
import { useNavigate } from 'react-router-dom';
import { CMS_ROUTERS } from '@App/configs/constants';
import moment from 'moment';

const UserTable = () => {
    const { showRoomTableHandler, handleDeleteShowRoom } = usePageContext();
    const navigate = useNavigate();

    const columns = useMemo(() => {
        return [
            columnHelper.accessor('_id', {
                header: 'Mã người dùng'
            }),
            columnHelper.accessor('name', {
                header: 'Tên người dùng'
            }),
            columnHelper.accessor('area', {
                header: 'Khu vực'
            }),
            columnHelper.accessor('address', {
                header: 'Địa chỉ'
            }),
            columnHelper.accessor('createdAt', {
                header: 'Ngày tạo',
                cell: ({ row }) => {
                    return <Typography>{moment(row?.original?.createdAt).format('L')}</Typography>;
                }
            }),
            columnHelper.accessor('action', {
                header: 'Chức năng',
                cell: ({ row }) => {
                    const showRoom = row?.original;
                    return (
                        <Box className='flex items-center gap-x-4'>
                            <CoreTableActionEdit
                                callback={() => navigate(CMS_ROUTERS.showRoom.list + '/' + showRoom?._id)}
                            />
                            <CoreTableActionDelete
                                callback={() => handleDeleteShowRoom(showRoom?._id)}
                                content='Bạn có muốn xoá người dùng này'
                            />
                        </Box>
                    );
                }
            })
        ];
    }, []);

    return (
        <Box>
            <ShowRoomFilter />
            <CoreTable
                isPagination
                columns={columns}
                {...showRoomTableHandler}
                data={showRoomTableHandler?.data}
            />
        </Box>
    );
};

export default UserTable;