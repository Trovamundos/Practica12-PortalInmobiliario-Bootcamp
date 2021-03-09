import { 
    getProvinceList, 
    getSaleTypeList,
    getEquipmentList,
    insertNewProperty,
} from './upload-property.api';
import { 
    setOptionList,
    setCheckboxList,
    formatCheckboxId,
    formatDeleteFeatureButtonId,
    onAddFeature,
    onRemoveFeature,
    onAddImage,
} from './upload-property.helpers';
import { 
    onUpdateField,
    onSubmitForm,
    onAddFile,
    onSetFormErrors
} from '../../common/helpers';
import { formUploadPropertyValidation } from './upload-property.validations';

let newProperty = {
    id: '',
    title: '',
    notes: '',
    email: '',
    phone: '',
    price: '',
    saleTypeIds: [],
    address: '',
    city: '',
    provinceId: '',
    squareMeter: '',
    rooms: '',
    bathrooms: '',
    locationUrl: '',
    mainFeatures: [],
    equipmentIds: [],
    images: [],
}

const addElement = (element, value) => {
    return {...newProperty,
        [element]: [
            ...newProperty[element],
            value,
        ],
    };
};

const removeElement = (element, value) => { 
    return {
        ...newProperty,
        [element]: newProperty[element].filter(el => el !== value),
    }; 
};

const getEvent = (list, element) => {
    list.forEach(el => {
        const id = formatCheckboxId(el);

        onUpdateField(id, event => {
            const value = event.target.value;
            const isChecked = event.target.checked;
            isChecked ? newProperty = addElement(element, value) : newProperty = removeElement(element, value);
        });
    });
};

Promise.all([    
    getSaleTypeList(),
    getProvinceList(),
    getEquipmentList()
]).then(([saleTypeList, provinceList, equipmentList]) => {
    setCheckboxList(saleTypeList, 'saleTypes');
    getEvent(saleTypeList, 'saleTypeIds');
    setOptionList(provinceList, 'province');
    setCheckboxList(equipmentList, 'equipments');
    getEvent(equipmentList, 'equipmentIds');
});

onUpdateField('title', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        title: value,
    };

    formUploadPropertyValidation.validateField('title', transfer.title).then(result => {
        onSetError('title', result);
    });
});

onUpdateField('notes', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        notes: value,
    };

    formUploadPropertyValidation.validateField('notes', transfer.notes).then(result => {
        onSetError('notes', result);
    });
});

onUpdateField('email', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        email: value,
    };

    formUploadPropertyValidation.validateField('email', transfer.email).then(result => {
        onSetError('email', result);
    });
});

onUpdateField('phone', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        phone: value,
    };

    formUploadPropertyValidation.validateField('phone', transfer.phone).then(result => {
        onSetError('phone', result);
    });
});

onUpdateField('price', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        price: value,
    };

    formUploadPropertyValidation.validateField('price', transfer.price).then(result => {
        onSetError('price', result);
    });
});

onUpdateField('address', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        address: value,
    };

    formUploadPropertyValidation.validateField('address', transfer.address).then(result => {
        onSetError('address', result);
    });
});

onUpdateField('city', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        city: value,
    };

    formUploadPropertyValidation.validateField('city', transfer.city).then(result => {
        onSetError('city', result);
    });
});

onUpdateField('province', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        provinceId: value,
    };

    formUploadPropertyValidation.validateField('province', transfer.provinceId).then(result => {
        onSetError('province', result);
    });
});

onUpdateField('squareMeter', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        squareMeter: value,
    };

    formUploadPropertyValidation.validateField('squareMeter', transfer.squareMeter).then(result => {
        onSetError('squareMeter', result);
    });
});

onUpdateField('rooms', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        rooms: value,
    };

    formUploadPropertyValidation.validateField('rooms', transfer.rooms).then(result => {
        onSetError('rooms', result);
    });
});

onUpdateField('bathrooms', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        bathrooms: value,
    };

    formUploadPropertyValidation.validateField('bathrooms', transfer.bathrooms).then(result => {
        onSetError('bathrooms', result);
    });
});

onUpdateField('locationUrl', (event) => {
    const value = event.target.value;
    newProperty = {
        ...newProperty,
        locationUrl: value,
    };

    formUploadPropertyValidation.validateField('locationUrl', transfer.locationUrl).then(result => {
        onSetError('locationUrl', result);
    });
});

onSubmitForm('insert-feature-button', () => {
    const value = document.getElementById('newFeature').value;
    if (value) {
        const deleteId = formatDeleteFeatureButtonId(value);
        newProperty = addElement('mainFeatures', value);
        onAddFeature(value);
        onSubmitForm(deleteId, () => {
            onRemoveFeature(value);
            newProperty = removeElement('mainFeatures', value);
        });
    }
})

onAddFile('add-image', value => {
    onAddImage(value);
    newProperty = addElement('images', value);
});

onSubmitForm('save-button', () => {
    formUploadPropertyValidation.validateForm(newProperty).then(result => {
        onSetFormErrors(result);
        if (result.succeeded) {
            console.log({ newProperty });
            insertNewProperty(newProperty).then(element => {
                console.log(element)
            });
        } else {
            alert('Por favor, debe completar todos los campos requeridos correctamente.')
        }
    });
});