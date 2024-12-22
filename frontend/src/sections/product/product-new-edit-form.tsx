import type { IProductItem } from 'src/types/product';

import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { PRODUCT_CATEGORY_GROUP_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export type NewProductSchemaType = zod.infer<typeof NewProductSchema>;

export const NewProductSchema = zod
  .object({
    name: zod.string().min(1, { message: 'Name is required!' }),
    description: zod.string().min(1, { message: 'Description is required!' }),
    // images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
    price: zod.number().min(1, { message: 'Price should not be $0.00' }),
    weight: zod.number().min(1),
  })
  .refine((value) => {
    // @ts-ignore
    value.category_id = 1;
    // @ts-ignore
    value.merchant_account_id = 1;
    // @ts-ignore
    value.stock = 1;
    return true;
  });

// ----------------------------------------------------------------------

type Props = {
  currentProduct?: IProductItem;
};

export function ProductNewEditForm({ currentProduct }: Props) {
  const router = useRouter();

  const { data: session } = useSession();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('http://localhost:8000/api/merchant/products', {
        method: 'POST',
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${session?.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success('Created a product successfully');
      }
    },
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      // @ts-ignore
      weight: currentProduct?.weight || 0,
      // @ts-ignore
      stock: currentProduct?.stock || 0,
    }),
    [currentProduct]
  );

  const methods = useForm<NewProductSchemaType>({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      // @ts-ignore
      mutation.mutate(data);
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(
    (inputFile: File | string) => {
      // @ts-ignore
      const filtered = values.images && values.images?.filter((file) => file !== inputFile);
      // @ts-ignore
      setValue('images', filtered);
    },
    // @ts-ignore
    [setValue, values.images]
  );

  const handleRemoveAllFiles = useCallback(() => {
    // @ts-ignore
    setValue('images', [], { shouldValidate: true });
  }, [setValue]);

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Product name" />

        <Field.Text name="description" label="Description" multiline rows={4} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Images</Typography>
          <Field.Upload
            multiple
            thumbnail
            name="images"
            maxSize={3145728}
            onRemove={handleRemoveFile}
            onRemoveAll={handleRemoveAllFiles}
            onUpload={() => console.info('ON UPLOAD')}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional functions and attributes..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Text
            name="stock"
            label="Stock"
            placeholder="0"
            type="number"
            InputLabelProps={{ shrink: true }}
          />

          <Field.Text
            name="weight"
            label="Weight"
            placeholder="0"
            type="number"
            InputLabelProps={{ shrink: true }}
          />

          <Field.Select native name="category" label="Category" InputLabelProps={{ shrink: true }}>
            {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
              <optgroup key={category.group} label={category.group}>
                {category.classify.map((classify) => (
                  <option key={classify} value={classify}>
                    {classify}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>

          {/* <Field.MultiSelect
            checkbox
            name="colors"
            label="Colors"
            options={PRODUCT_COLOR_NAME_OPTIONS}
          /> */}

          {/* <Field.MultiSelect checkbox name="sizes" label="Sizes" options={PRODUCT_SIZE_OPTIONS} /> */}
        </Box>

        {/* <Field.Autocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={_tags.map((option) => option)}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        /> */}

        {/* <Stack spacing={1}>
          <Typography variant="subtitle2">Gender</Typography>
          <Field.MultiCheckbox row name="gender" options={PRODUCT_GENDER_OPTIONS} sx={{ gap: 2 }} />
        </Stack> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Stack direction="row" alignItems="center" spacing={3}>
          <Field.Switch name="saleLabel.enabled" label={null} sx={{ m: 0 }} />
          <Field.Text
            name="saleLabel.content"
            label="Sale label"
            fullWidth
            disabled={!values.saleLabel.enabled}
          />
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3}>
          <Field.Switch name="newLabel.enabled" label={null} sx={{ m: 0 }} />
          <Field.Text
            name="newLabel.content"
            label="New label"
            fullWidth
            disabled={!values.newLabel.enabled}
          />
        </Stack> */}
      </Stack>
    </Card>
  );

  const renderPricing = (
    <Card>
      <CardHeader title="Pricing" subheader="Price related inputs" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text
          name="price"
          label="Regular price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        />

        {/* <Field.Text
          name="priceSale"
          label="Sale price"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  $
                </Box>
              </InputAdornment>
            ),
          }}
        /> */}

        {/* {!includeTaxes && (
          <Field.Text
            name="taxes"
            label="Tax (%)"
            placeholder="0.00"
            type="number"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box component="span" sx={{ color: 'text.disabled' }}>
                    %
                  </Box>
                </InputAdornment>
              ),
            }}
          />
        )} */}
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack spacing={3} direction="row" alignItems="center" flexWrap="wrap">
      <Box sx={{ flexGrow: 1 }} />
      {/* <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      /> */}

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {!currentProduct ? 'Create product' : 'Save changes'}
      </LoadingButton>
    </Stack>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={{ xs: 3, md: 5 }} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}

        {renderProperties}

        {renderPricing}

        {renderActions}
      </Stack>
    </Form>
  );
}
