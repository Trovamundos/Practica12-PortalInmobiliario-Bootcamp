import { 
    getPropertyList,
    insertContactDetail,
} from './property-detail.api';
import { history } from '../../core/router';
import { mapPropertyFromApiToViewModel } from './property-detail.mappers';
import { setPropertyValues } from './property-detail.helpers';
import { 
    onUpdateField, 
    onSubmitForm,
    onSetError, 
    onSetFormErrors
} from '../../common/helpers';
import { formContactValidation } from './property-detail.validations';

const params = history.getParams();

getPropertyList(params.id).then(propertyList => {
    const viewModelPropertyList = mapPropertyFromApiToViewModel(propertyList);
    setPropertyValues(viewModelPropertyList);
});

let contactDetail = {
    email: '',
    message: '',
};

onUpdateField('email', (event) => {
    const value = event.target.value;
    contactDetail = {
        ...contactDetail,
        email: value,
    };

    formContactValidation.validateField('email', contactDetail.email).then(result => {
        onSetError('email', result);
    });
});

onUpdateField('message', (event) => {
    const value = event.target.value;
    contactDetail = {
        ...contactDetail,
        message: value,
    };

    formContactValidation.validateField('message', contactDetail.message).then(result => {
        onSetError('message', result);
    });
});

onSubmitForm('contact-button', () => {
    formContactValidation.validateForm(contactDetail).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            console.log({ contactDetail });
            insertContactDetail(contactDetail).then(element => {
                console.log(element)
            }); 
        } else {
            alert('Por favor, debe completar todos los campos requeridos correctamente.')
        }
    });
});


// ME HE QUEDADO CON LO DE EQUIPMENT!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!