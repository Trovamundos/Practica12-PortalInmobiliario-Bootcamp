// ===== A) ===== Primer flujo de trabajo: Recuperar y mostrar la informacion de los pisos.
// ===== B) ===== Segundo flujo de trabajo: La parte el filtrado.
// ===== C) ===== Tercer flujo de trabajo: La segunda parte del filtrado.
// ===== D) ===== Recoger información del filtrado.
// ===== E) ===== Limpiar la pagina al filtrar
// = A1 = Recuperar lista de propiedades del data.json.
// a1.1 Crear property-list.api.js.
// = A2 = Transformar el array con mapper.
// a2.1 Crear property-list.mappers.js.
// = A3 = Importar la api y el mapper. && // = B2 = Importar la api.
import { 
    getPropertyList, 
    getSaleTypeList, 
    getProvincesList 
} from './property-list.api';
// d4.5 Exportar el mapper del filtrado.
import { 
    mapPropertyListFromApiToViewModel, 
    mapFilterToQueryParams 
} from './property-list.mappers';
// = A5 = Pintar la lista en la página. && // == B4 == Pintar la lista en la página. && // = E1 = Añadir el metodo para limpiar.
import { 
    addPropertyRows,
    setOptions,
    clearPropertyRows
 } from './property-list.helpers';
// = B1 = Recuperar listas de propiedades de data.json.
// = C1 = Crear maestro en un fichero de constantes.
// = C2 = Importar las listas.
import  { 
    roomOptions, 
    bathroomOptions, 
    minPriceOptions, 
    maxPriceOptions 
} from './property-list.constants';
// = D2 = Recoger la informacion del campo cuando este se actualice. && // = D3 = Añadir onSubmitFrom para que cuando se de al
//boton de buscar se comprueben las opciones.
import { 
    onUpdateField, 
    onSubmitForm 
} from '../../common/helpers';
// = D4 = Mapear el filtrado.

// = B3 = SE PUEDEN HACER TODAS LAS PETICIONES A LA VEZ!!! con el metodo Promise.all().
Promise.all([
    getPropertyList(),
    getSaleTypeList(),
    getProvincesList(),
    // al .then llega un array de resultados.
]).then(([propertyList, saleTypeList, provinceList]) => {
    loadPropertyList(propertyList);
    // b4.1 Pintar las listas.
    setOptions(saleTypeList, 'select-sale-type', '¿Qué venta?');
    setOptions(provinceList, 'select-province', '¿Dónde?')
    //c2.1 Pintar el array.
    setOptions(roomOptions, 'select-room', '¿Habitaciones?');
    setOptions(bathroomOptions, 'select-bathroom', '¿Cuartos de baño?');
    setOptions(minPriceOptions, 'select-min-price', 'Min (EUR)');
    setOptions(maxPriceOptions, 'select-max-price', 'Max (EUR');
});
//.then(resultList => {
    // const propertyList = resultList[0];
    // const saleTypeList = resultList[1];
    // const provinceList = resultList[2]; 
    // otra opción para hacerlo mas legible es hacer destructuring.
    // const [propertyList, saleTypeList, provinceList] = resultList;
// });

// = A4 = Traer los datos del servidos.
const loadPropertyList = propertyList => {
    // a4.1 Convertirlo a modelo de lista.
    const viewModelPropertyList = mapPropertyListFromApiToViewModel(propertyList);
    // a5.1 Pintar la lista.
    addPropertyRows(viewModelPropertyList);
};

// = D1 = 'Modelar', crear un objeto de lo que quieres recuperar.
let filter = {
    saleTypeId: '',
    provinceId: '',
    minRooms: '',
    minBathrooms: '',
    minPrice: '',
    maxPrice: '', 
};

// d2.1 Utilizar el metodo.
onUpdateField('select-sale-type', (event) => {
    // d2.2 Sacamos el valor.
    const value = event.target.value;
    // d2.3 Actualizar el objeto filter.
    filter = {
        ...filter,
        saleTypeId: value,
    };
});

onUpdateField('select-province', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        provinceId: value,
    };
});

onUpdateField('select-room', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        minRooms: value,
    };
});

onUpdateField('select-bathroom', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        minBathrooms: value,
    };
});

onUpdateField('select-min-price', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        minPrice: value,
    };
});

onUpdateField('select-max-price', (event) => {
    const value = event.target.value;
    filter = {
        ...filter,
        maxPrice: value,
    };
});

onSubmitForm('search-button', () => {
    //d4.6 Utilizar el metodo de mapeado del filtrado.
    const queryParams = mapFilterToQueryParams(filter);
    // e1.1 Antes de pedir datos al servidor limpiamos el html.
    clearPropertyRows();

    //d4.7 volver a pedir la lista de propiedades.
    getPropertyList(queryParams).then(propertyList => {
        //d4.8 cargar la lista de propiedades.
        loadPropertyList(propertyList);
    });
});