import Axios from 'axios';

const urlProperties = `${process.env.BASE_API_URL}/properties`;

const urlEquipments = `${process.env.BASE_API_URL}/equipments`;

const urlContact = `${process.env.BASE_API_URL}/contact`;

export const getPropertyList = id => Axios.get(`${urlProperties}/${id}`).then(response => {
    return response.data;
});

export const getEquipmentList = () => Axios.get(urlEquipments).then(response => {
    return response.data;
});

export const insertContactDetail = contactDetail => Axios.post(urlContact, contactDetail).then(response => {
    return response.data;
});