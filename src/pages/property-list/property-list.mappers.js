//a2.2 Crear la función para mapear.
const mapPropertyFromApiToViewModel = property => {
    return {
        id: property.id,
        tittle: property.tittle,
        rooms: `${property.rooms} ${getRoomWord(property.rooms)}`,
        squareMeter: `${property.squareMeter}m2`,
        //a2.4 Utilizar el metodo substring(n1,n2) para limitar el numero de letras que se muestran.
        notes: `${property.notes.substring(0, 240)}...`,
        //a2.5 Utilizar el metodo toLocaleString() que pone los numeros segun la cultura. En caso español el ..
        price: `${property.price.toLocaleString()} €`,
        //a2.6 Asegurarnos de que es un array para que no pete en el [0].
        image: Array.isArray(property.images) ? property.images[0] : '',
    }
}

//a2.3 Crear un metodo para segun el numero de habitaciones escriba la palabra en singular o plural.
const getRoomWord = rooms => {
    return rooms > 1 ? 'habitaciones' : 'habitación';
};

//a2.7 Exportar el metodo que mapea la lista.
export const mapPropertyListFromApiToViewModel = propertyList => {
    return propertyList.map(property => mapPropertyFromApiToViewModel(property));
};

//d4.1 Obtener los parametros que se envian al servidor.
export const mapFilterToQueryParams = filter => {
    let queryParams = '';

    //d4.2 Preguntar si saleTypeId tiene valor para filtrar.
    if(filter.saleTypeId) {
        //d4.3 Que coincida el id que estamos pasando.
        queryParams = `${queryParams}saleTypeId_like=${filter.saleTypeId}&`;
    }

    if(filter.provinceId) {
        //d4.3 Que sea igual que el del filtro.
        queryParams = `${queryParams}provinceId=${filter.provinceId}&`;
    }

    if(filter.minRooms) {
        //d4.3 Mas grande o igual que.
        queryParams = `${queryParams}rooms_gte=${filter.minRooms}&`;
    }

    if(filter.minBathRooms) {
        //d4.3 Mas grande o igual que.
        queryParams = `${queryParams}bathRooms_gte=${filter.minBathRooms}&`;
    }

    if(filter.minPrice) {
        //d4.3 Mas grande o igual que.
        queryParams = `${queryParams}price_gte=${filter.minPrice}&`;
    }

    if(filter.maxPrice) {
        //d4.3 Mas pequeño o igual que.
        queryParams = `${queryParams}price_lte=${filter.maxPrice}&`;
    }

    // d4.4 Devolver el queryParams y con .slice(0, -1) eliminar el & del final de las direcciones para que no de problemas.
    return queryParams.slice(0, -1);
}