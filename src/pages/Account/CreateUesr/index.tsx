import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Form from 'components/Form/Form';
import FromSpacing from 'components/Form/FormSpacing';
import FormTextField from 'components/Form/FormTextField';
import Validator from 'utils/Validator';
import type { ObjectSchema } from 'yup';
import { useTranslation } from 'react-i18next';
import { useFieldArray, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

interface FormValues {
    firstName: string;
    properties: {
        name: string;
        value: string;
    }[];
}

const schema: ObjectSchema<FormValues> = Validator.shape({
    firstName: Validator.string().required(),
    properties: Validator.array()
        .of(
            Validator.shape({
                name: Validator.string().required(),
                value: Validator.string().required(),
            }),
        )
        .required(),
});

const CreateUser = () => {
    const { t } = useTranslation();
    const form = useForm<FormValues>({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: schema.getDefault(),
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'properties', // unique name for your Field Array
    });

    const handleSubmit = (data: FormValues) => {
        console.log(data);
    };

    const handleAddRow = () => {
        append({
            name: '',
            value: '',
        });
    };

    const handleDeleteRow = (index: number) => () => {
        remove(index);
    };

    console.log(fields);

    return (
        <Card sx={{ p: 2 }}>
            <Form
                form={form}
                onSubmit={handleSubmit}
                onError={(error) => {
                    console.log(error);
                }}
            >
                <FromSpacing>
                    <FormTextField
                        name="firstName"
                        required
                        label={t('FirstName')}
                    ></FormTextField>
                    <FromSpacing>
                        {fields.map((field, index, self) => {
                            return (
                                <Box key={field.id}>
                                    <Grid container spacing={2} key={field.id}>
                                        <Grid item xs={4}>
                                            <FormTextField
                                                name={`properties.${index}.name`}
                                                required
                                                label={t('Name')}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <FormTextField
                                                name={`properties.${index}.value`}
                                                required
                                                label={t('Value')}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <IconButton
                                                onClick={handleDeleteRow(index)}
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Box>
                            );
                        })}
                    </FromSpacing>
                    <Box>
                        <Button startIcon={<AddIcon />} onClick={handleAddRow}>
                            Add row
                        </Button>
                    </Box>
                </FromSpacing>
                <Box sx={{ mt: 3 }}>
                    <LoadingButton
                        type="submit"
                        size="medium"
                        fullWidth
                        loading={false}
                    >
                        Submit
                    </LoadingButton>
                </Box>
            </Form>
        </Card>
    );
};

export default CreateUser;
