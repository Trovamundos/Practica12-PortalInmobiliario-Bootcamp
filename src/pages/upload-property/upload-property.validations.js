import { Validators, createFormValidation } from '@lemoncode/fonk';
import { arrayRequired } from '@lemoncode/fonk-array-required-validator';
import { isUrl } from '@lemoncode/fonk-is-url-validator';

const validationSchema = {
    field: {
        title: [
            {
                validator: Validators.required,
                message: 'Campo requerido'
            }
        ],
        notes: [
            {
                validator: Validators.required,
                message: 'Campo requerido'
            }
        ],
        email: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            }, {
                validator: Validators.email,
                message: 'Formato de email no válido',
            },
        ],
        phone: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^(6|7|8|9)\d{8}$/ },
                message: 'Formato no válido',
            },
        ],
        price: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^\d+((.|,)\d{1,2})?$/ },
                message: 'Por favor, introduzca una cantidad válida',
            }
        ],
        saleTypes: [
            {
                validator: arrayRequired,
                message: 'Por favor, seleccione al menos una casilla.',
            }
        ],
        address: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^\d{5}$/ },
                message: 'Por favor, introduzca una dirección postal valida',
            }
        ],
        city: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        provinceId: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
        ],
        squareMeter: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^\d+((.|,)\d{1,2})?$/ },
                message: 'Por favor, introduzca una medida válida',
            }
        ],
        rooms: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^\d+$/ },
                message: 'Por favor, introduzca un número',
            }
        ],
        bathrooms: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: Validators.pattern,
                customArgs: { pattern: /^\d+$/ },
                message: 'Por favor, introduzca un número',
            }
        ],
        locationUrl: [
            {
                validator: Validators.required,
                message: 'Campo requerido',
            },
            {
                validator: isUrl,
                message: 'Por favor, introduzca un formato válido',
            }
        ],
    },
};

export const formUploadPropertyValidation = createFormValidation(validationSchema);