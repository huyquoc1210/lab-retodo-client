import { Box, type BoxProps } from '@mui/material';
import {
    type FieldValues,
    type SubmitHandler,
    type SubmitErrorHandler,
    type UseFormReturn,
    FormProvider,
} from 'react-hook-form';

interface FormProps<T extends FieldValues, C = any>
    extends Omit<BoxProps<'form'>, 'onSubmit' | 'onError'> {
    form: UseFormReturn<T, C>;
    onSubmit: SubmitHandler<T>;
    onError?: SubmitErrorHandler<T>;
}

const Form = <T extends FieldValues, C = any>(props: FormProps<T, C>) => {
    const { form, onSubmit, onError, ...rest } = props;

    return (
        <FormProvider {...form}>
            <Box
                component="form"
                noValidate
                onSubmit={form.handleSubmit(onSubmit, onError)}
                {...rest}
            />
        </FormProvider>
    );
};

export default Form;
