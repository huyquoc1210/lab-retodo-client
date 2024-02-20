import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Form from 'components/Form/Form';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { ObjectSchema } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import FormDate from 'components/Form/FormDate';
import FormTime from 'components/Form/FormTime';
import DateTime from 'utils/DateTime';
import Validator from 'utils/Validator';

interface FormValues {
    fromDate: Dayjs | null;
    toDate: Dayjs | null;
    fromTime: Dayjs | null;
    toTime: Dayjs | null;
}

const schema: ObjectSchema<FormValues> = Validator.shape({
    fromDate: Validator.dayjs()
        .required()
        .test({
            name: 'fromDate',
            message: 'From date must be before To date',
            test: (value, context) => {
                const { toDate } = context.parent;
                // return toDate ? value?.isSameOrBefore(toDate) : true;
                return DateTime.IsSameOrBefore(value, toDate);
            },
        }),
    toDate: Validator.dayjs()
        .required()
        .test({
            name: 'toDate',
            message: 'To date must be after From date',
            test: function (value) {
                const { fromDate } = this.parent;
                // return fromDate ? value?.isSameOrAfter(fromDate) : true;
                return DateTime.IsSameOrAfter(value, fromDate);
            },
        }),
    fromTime: Validator.dayjs().required(),
    toTime: Validator.dayjs().required(),
});

const Index = () => {
    const form = useForm({
        mode: 'onChange',
        resolver: yupResolver(schema),
        defaultValues: schema.getDefault(),
    });

    const handleChangeFromDate = (date: Dayjs | null) => {
        if (!date) return;
        const { toDate } = form.getValues();
        if (toDate) {
            form.trigger('toDate');
        }
    };

    const handleChangeToDate = (date: Dayjs | null) => {
        if (!date) return;
        const { fromDate } = form.getValues();
        if (fromDate) {
            form.trigger('fromDate');
        }
    };

    const handleSubmit = (data: FormValues) => {
        // const { fromDate, toDate, fromTime, toTime } = data;

        const values = Object.keys(data).reduce<Record<string, string>>(
            (acc, key) => {
                // @ts-ignore
                acc[key] = dayjs(data[key]).toISOString();
                return acc;
            },
            {},
        );

        // const values = {
        //   fromDate: fromDate?.toISOString(),
        //   toDate: toDate?.toISOString(),
        //   fromTime: fromTime?.toISOString(),
        //   toTime: toTime?.toISOString(),
        // };

        console.log(values);
    };

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            onError={(error) => {
                console.log(error);
            }}
        >
            <Container maxWidth="md">
                <Paper sx={{ p: 3 }}>
                    <Box>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <FormDate
                                    name="fromDate"
                                    label="From"
                                    onSelect={handleChangeFromDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormDate
                                    name="toDate"
                                    label="To"
                                    onSelect={handleChangeToDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormTime name="fromTime" label="From" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormTime name="toTime" label="To" />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <Button type="submit">Submit</Button>
            </Container>
        </Form>
    );
};

export default Index;
