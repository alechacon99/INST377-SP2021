function mapInit() {
  // follow the Leaflet Getting Started tutorial here
  var mymap = L.map('mapid').setView([38.989, -76.938], 13);

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWxlam85OTkiLCJhIjoiY2ttNnFid3hoMHFtdjJ5bzQ0bXNxczliayJ9.ooPHohzkuPeEE5d5un_dyQ'
  }).addTo(mymap);
  return mymap;
};

async function dataHandler(mapObjectFromFunction) {
  // use your assignment 1 data handling code here
  // and target mapObjectFromFunction to attach markers
  const form = document.querySelector('#search-form');
  const search = document.querySelector('#search');
  const targetList = document.querySelector('.suggestions');

  const request = await fetch('/api');
  const data = await request.json();
  console.log(data);
  
  form.addEventListener('submit', async (event) => {
    targetList.innerText = '';

    event.preventDefault();
    console.log('form submitted');

    const filtered = data.filter((record) => record.zip.includes(search.value) && record.geocoded_column_1);
    console.log(filtered);
    const topFive = filtered.slice(0,5);
    console.log(topFive);

    topFive.forEach((item) => {
      const longLat = item.geocoded_column_1.coordinates;
      const marker = L.marker([longLat[1], longLat[0]]).addTo(mapObjectFromFunction);

        const appendItem = document.createElement('li');
        appendItem.classList.add('block');
        appendItem.classList.add('list-item');
        appendItem.innerHTML = `<div class="list-header is-size-5">${item.name}</div><address class="is-size-6">${item.address_line_1}</address>`;
        targetList.append(appendItem);
    });

    const {coordinates} = topFive[0]?.geocoded_column_1;
    mapObjectFromFunction.panTo([coordinates[1], coordinates[0]], 0);
  });
};

async function windowActions() {
  const map = mapInit();
  await dataHandler(map);
};

window.onload = windowActions;