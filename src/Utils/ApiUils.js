import axios from 'axios';

axios.defaults.headers.common.Accept = 'application/json';

const fetch = (endpoint) => {
return axios
    .get(endpoint)
    .then((res) => res)
    .catch((err) => {
    console.error(
        'Error catch in Apiutils at fetch method. It will be thrown...');
    throw err;
    });
}

export const getPoints = () => {
    const query = `http://localhost:5000/`;
    return fetch(query).then(res=> {
        const data = [];
        res.data.rows.forEach(point=>{
            let direction = '';
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='+point[0]+','+point[1]+'&key=API_KEY').then(geo=> {
                
                if (geo.data['results']['address_components']) {
                    direction = geo.data['results']['address_components'][0]['long_name']
                }
            });
            
            data.push({lat: point[0], lng: point[1], direction: direction})
        });
        
        return data;
    });
};