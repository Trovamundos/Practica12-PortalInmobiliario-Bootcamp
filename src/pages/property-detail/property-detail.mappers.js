import { getEquipmentList } from './property-detail.api';

let equipments = [];

getEquipmentList().then(data => {
    equipments = data.map(item => item.name);
});

export const mapPropertyFromApiToViewModel = property => {
    return {
        id: property.id,
        title: property.title,
        notes: property.notes,
        city: property.city,
        rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
        squareMeter: `${property.squareMeter}m2`,
        bathrooms: `${property.bathrooms} ${getBathroomWord(property.bathrooms)}`,
        mainFeatures: property.mainFeatures,
        equipments: equipments,
        price: `${property.price.toLocaleString()} €`,
        mainImage: Array.isArray(property.images) ? property.images[0] : '',
        locationUrl: property.locationUrl,
        images:  Array.isArray(property.images) ? property.images : [],
    }
}

const getRoomWord = rooms => {
    return rooms > 1 ? 'habitaciones' : 'habitación';
};

const getBathroomWord = rooms => {
    return rooms > 1 ? 'baños' : 'baño';
};