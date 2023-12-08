import { setLocale, string } from 'yup';
import RegExps from './RegExps';

class Utils {
    constructor() {
        setLocale({
            mixed: {
                required: 'validator.mixed.required',
                notType: 'validator.mixed.type',
            },
            string: {
                max: 'validator.string.max',
            },
        });
    }

    public string() {
        return string().max(255).trim().default('');
    }

    public email() {
        return this.string().matches(RegExps.email, 'validator.email.invalid');
    }
}

const Validator = new Utils();
export default Validator;
