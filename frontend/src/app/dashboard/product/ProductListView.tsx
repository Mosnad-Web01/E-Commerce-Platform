'use client';

import type { IProductItem } from 'src/types/product';
import type { GridSlots, GridColDef } from '@mui/x-data-grid';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  DataGrid,
  gridClasses,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useGetProducts } from 'src/actions/product';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// import { ProductTableToolbar } from '../product-table-toolbar';
// import { ProductTableFiltersResult } from '../product-table-filters-result';
// import {
//   RenderCellStock,
//   RenderCellPrice,
//   RenderCellPublish,
//   RenderCellProduct,
//   RenderCellCreatedAt,
// } from '../product-table-row';

// ----------------------------------------------------------------------

const PUBLISH_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

const HIDE_COLUMNS = { category: false };

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export function ProductListView() {
  const { data: session, status } = useSession();

  const { data: productsData } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch('http://localhost:8000/api/merchant/products', {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          // @ts-ignore
          Authorization: `Bearer ${session?.token}`,
        },
        credentials: 'include',
      });
      const data = await res.json();
      return data.data;
    },
  });

  console.log('session', session);

  console.log(productsData);

  const confirmRows = useBoolean();

  const router = useRouter();

  const { products, productsLoading } = useGetProducts();

  const [tableData, setTableData] = useState<IProductItem[]>([]);

  useEffect(() => {
    if (products.length) {
      setTableData(products);
    }
  }, [products]);

  const CustomToolbarCallback = useCallback(
    () => <CustomToolbar />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 360,
      hideable: false,
      //   renderCell: (params) => <RenderCellProduct params={params} onViewRow={() => {}} />,
    },
    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => <Box sx={{ p: '24px' }}>{params.row.name}</Box>,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 1,
      minWidth: 200,
      hideable: false,
      //   renderCell: (params) => <RenderCellProduct params={params} onViewRow={() => {}} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'stock',
      headerName: 'Stock',
      width: 160,
      // type: 'singleSelect',
      // valueOptions: PRODUCT_STOCK_OPTIONS,
      //   renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'weight',
      headerName: 'Weight',
      width: 140,
      editable: true,
      //   renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: 'sold',
      headerName: 'Sold',
      width: 110,
      //   renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => {}}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {}}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="List"
          links={[
            { name: 'Dashboard', href: paths.dashboard.root },
            { name: 'Product', href: paths.dashboard.product.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.product.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New product
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            height: { xs: 800, md: 2 },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            disableRowSelectionOnClick
            rows={productsData}
            columns={columns}
            loading={productsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            slots={{
              toolbar: CustomToolbarCallback as GridSlots['toolbar'],
              noRowsOverlay: () => <EmptyContent />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsManagement: { getTogglableColumns },
            }}
            sx={{ [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' } }}
          />
        </Card>
      </DashboardContent>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={<>Are you sure want to delete the item?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              //   handleDeleteRows();
              //   confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

// interface CustomToolbarProps {
// canReset: boolean;
// filteredResults: number;
// selectedRowIds: GridRowSelectionModel;
// onOpenConfirmDeleteRows: () => void;
// filters: UseSetStateReturn<IProductTableFilters>;
// setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
// }

function CustomToolbar() {
  // {
  // filters,
  // canReset,
  // selectedRowIds,
  // filteredResults,
  // setFilterButtonEl,
  // onOpenConfirmDeleteRows,
  // }: CustomToolbarProps
  return (
    <GridToolbarContainer>
      {/* <ProductTableToolbar
          filters={filters}
          options={{ stocks: PRODUCT_STOCK_OPTIONS, publishs: PUBLISH_OPTIONS }}
        /> */}

      <GridToolbarQuickFilter />

      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        {/* {!!selectedRowIds.length && (
            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={onOpenConfirmDeleteRows}
            >
              Delete ({selectedRowIds.length})
            </Button>
          )} */}

        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );
}

// ----------------------------------------------------------------------
