import Axios from 'axios';

const urlProvinces = `${process.env.BASE_API_URL}/provinces`;

const urlSaleTypes = `${process.env.BASE_API_URL}/saleTypes`;

const urlEquipment = `${process.env.BASE_API_URL}/equipments`;

const urlProperties = `${process.env.BASE_API_URL}/properties`;

export const getProvinceList = () => Axios.get(urlProvinces).then(response => {
    return response.data;
});

export const getSaleTypeList = () => Axios.get(urlSaleTypes).then(response => {
    return response.data;
});

export const getEquipmentList = () => Axios.get(urlEquipment).then(response => {
    return response.data;
});

export const insertNewProperty = newProperty => Axios.post(urlProperties, newProperty).then(response => {
    return response.data;
});