//a1.2 Importar Axios.
import Axios from 'axios';

//a1.3 Crear una variable de entorno para hacer una llamada (get) al url para traer el array.
const url = `${process.env.BASE_API_URL}/properties`

//a1.4 Metodo para recuperar el array.
//d4.9 Actualizar el metodo.
export const getPropertyList = (queryParams) => Axios.get(`${url}?${queryParams}`).then(response => {
    return response.data;
});

// b1.2 Crear una variable de entorno para hacer una llamada (get) al url para traer la lista de ventas.
const saleTypeListUrl = `${process.env.BASE_API_URL}/saleTypes`;

// b1.3 Metodo para recuperar la lista de ventas.
export const getSaleTypeList = () => Axios.get(saleTypeListUrl).then(response => {
    return response.data;
});

// b1.4 Crear una variable de entorno para hacer una llamada (get) al url para traer la lista de provincias.
const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;

// b1.5 Metodo para recuperar la lista de provincias.
export const getProvincesList = () => Axios.get(provinceListUrl).then(response => {
    return response.data;
});