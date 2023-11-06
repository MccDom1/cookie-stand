'use strict';

const time = [
  '6 am',
  '7 am',
  '8 am',
  '9 am',
  '10 am',
  '11 am',
  '12 pm',
  '1 pm',
  '2 pm',
  '3 pm',
  '4 pm',
  '5 pm',
  '6 pm',
  '7 pm',
];

function CookieStand(
  name,
  minCustomers,
  maxCustomers,
  avgCookies,
  hours,
  contact,
  address
) {
  this.name = name;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.totalCookies = 0;
  this.hours = hours;
  this.contact = contact;
  this.address = address;
  this.hourlyCookies = this.estimate();
}



const addLocationForm = document.getElementById('addLocationForm');

if (addLocationForm) {
  // event listeners need to know: what event do they care about, and what do they want to do when it happens

  addLocationForm.addEventListener('submit', function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.name.value; // gets location name from form
    let minCustomers = event.target.minCustomers.value;
    minCustomers = parseInt(minCustomers);
    let maxCustomers = event.target.maxCustomers.value;
    maxCustomers = parseInt(maxCustomers);
    let avgCookies = event.target.avgCookies.value;
    avgCookies = parseFloat(avgCookies);

    // check if location exists
    const doesCityExist = cities.some(
      (CookieStand) => CookieStand.name.toLowerCase() === name.toLowerCase()
    );

    console.log(doesCityExist);
    if (doesCityExist) {
      event.preventDefault(); // prevent form submission
      alert('This location already exists. Please resubmit.');
    } else if (minCustomers > maxCustomers) {
      event.preventDefault(); // prevent form submission
      alert(
        'Max customers must be greater than or equal to min customers. Please resubmit.'
      );
    } else {
      const newLocation = new CookieStand(
        name,
        minCustomers,
        maxCustomers,
        avgCookies
      );
      console.log(newLocation);
      newLocation.estimate();
      newLocation.renderLocationData();
      cities.push(newLocation); // push new location object into cities array
      renderFooter();
      addLocationForm.reset();
    }
  });
}

// add methods
CookieStand.prototype.estimate = function () {
  this.hourlyCookies = esimateSales(this);
  return this.hourlyCookies;
};

const Africa = new CookieStand(
  'Africa',
  4,
  65,
  6.3,
  '6 am - 8 pm',
  '121-454-787',
  'Africa, Africa 10101'
);
const Sasebo = new CookieStand(
  'Sasebo',
  2,
  24,
  1.2,
  '6 am - 8 pm',
  '122-455-788',
  'Sasebo, Japan 121-5656'
);
const NewYork = new CookieStand(
  'NewYork',
  1,
  38,
  3.7,
  '6 am - 8 pm',
  '123-456-789',
  '1 World Trade Center NewYork, NewYork'
);
const Syria = new CookieStand(
  'Syria',
  2,
  38,
  2.3,
  '6 am - 8 pm',
  '123-456-789',
  'Joint Base Syria, Syria, 65000'
);
const Bali = new CookieStand(
  'Bali',
  2,
  16,
  4.6,
  '6 am - 8 pm',
  '123-456-789',
  '123 you know me Bali, Indonesia 12453'
);

const cities = [Africa, Sasebo, NewYork, Syria, Bali];

// helper function - Randomly generate number
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// helper function - estimate sales
function esimateSales(store) {
  const hourlyCookies = [];
  for (let i = 0; i < time.length; i++) {
    const numCustomers = random(store.minCustomers, store.maxCustomers);
    const hourSales = Math.ceil(numCustomers * store.avgCookies);
    hourlyCookies.push(hourSales);
  }
  return hourlyCookies;
}

// global reference to container referenced by DOM
const locationContainerElem = document.getElementById('locationSales');

const articleElem = document.createElement('article');
const tableElem = document.createElement('table');

// add article element and append to container IF the location container "location sales" exists in the HTML
if (locationContainerElem) {
  locationContainerElem.appendChild(articleElem);
  articleElem.classList.add('sales-table');
  // initiate the table and append to the article
  articleElem.appendChild(tableElem);
}

// add the sales table header
function renderHeader() {
  // add table head
  const tableHeadElem = document.createElement('thead');
  tableElem.appendChild(tableHeadElem);

  // add header Row
  const headerRow = document.createElement('tr');
  tableHeadElem.appendChild(headerRow);

  const locationHeadingCell = document.createElement('th');
  headerRow.appendChild(locationHeadingCell);
  locationHeadingCell.textContent = 'Location';

  // create store hours hours table heading
  for (let i = 0; i < time.length; i++) {
    const storeHoursCell = document.createElement('th');
    headerRow.appendChild(storeHoursCell);
    storeHoursCell.textContent = time[i];
  }

  const storeTotalCell = document.createElement('th');
  headerRow.appendChild(storeTotalCell);
  storeTotalCell.textContent = 'Daily Location Total';
}

CookieStand.prototype.renderLocationData = function () {
  for (let i = 0; i < this.hourlyCookies.length; i++) {
    const cookiesSoldThisHour = this.hourlyCookies[i];
    this.totalCookies += cookiesSoldThisHour; // cumulative sum of total cookies sold
  }

  // add tbody element
  const tableBodyElem = document.createElement('tbody');
  tableElem.appendChild(tableBodyElem);

  // add data row
  const dataRow = document.createElement('tr');
  tableBodyElem.appendChild(dataRow);

  const locationNameCell = document.createElement('td');
  dataRow.appendChild(locationNameCell);
  locationNameCell.textContent = this.name;
  locationNameCell.classList.add('body-data');

  // add data cells
  for (let i = 0; i < this.hourlyCookies.length; i++) {
    const salesDataCell = document.createElement('td');
    dataRow.appendChild(salesDataCell);
    salesDataCell.classList.add('body-data');
    salesDataCell.textContent = this.hourlyCookies[i];
  }

  // add daily total for the location row
  const locationDailyTotal = document.createElement('td');
  dataRow.appendChild(locationDailyTotal);
  locationDailyTotal.textContent = this.totalCookies;
  locationDailyTotal.classList.add('total-data');
};

// add table footer
function renderFooter() {
  // Since the footer row now needs to be able to render repeatedly
  // then we need to empty it out if it has already rendered

  let tableFooter = document.querySelector('tfoot');

  if (tableFooter) {
    tableFooter.innerHTML = ''; // removes all children of existing tfoot
  } else {
    tableFooter = document.createElement('tfoot');
    tableElem.appendChild(tableFooter);
  }

  // add table row
  const headerRowTotal = document.createElement('tr');
  tableFooter.appendChild(headerRowTotal);

  const totalHeadingCell = document.createElement('th');
  headerRowTotal.appendChild(totalHeadingCell);
  totalHeadingCell.textContent = 'Hourly Totals for All Locations';

  let totalAllLocations = 0;

  // calculate Daily hourly total and overall total for all locations using nested for loop
  for (let i = 0; i < time.length; i++) {
    let hourTotal = 0;
    const hourlyTotalData = document.createElement('td');
    headerRowTotal.appendChild(hourlyTotalData);
    for (let j = 0; j < cities.length; j++) {
      hourTotal += cities[j].hourlyCookies[i];
      // console.log(cities[j].hourlyCookies[i]);
    }
    hourlyTotalData.textContent = hourTotal;
    totalAllLocations += hourTotal;
    // console.log(hourTotal);
    hourlyTotalData.classList.add('total-data');
  }

  const overallTotalCell = document.createElement('td');
  headerRowTotal.appendChild(overallTotalCell);
  overallTotalCell.textContent = totalAllLocations;
  overallTotalCell.classList.add('total-data');
}

if (locationContainerElem) {
  renderHeader();
  Africa.renderLocationData();
  Sasebo.renderLocationData();
  NewYork.renderLocationData();
  Syria.renderLocationData();
  Bali.renderLocationData();
  renderFooter();
}

// INDEX.HTML

// global reference to container referenced by DOM
const infoContainerElem = document.getElementById('locationInfo');
const articleInfoElem = document.createElement('article');

// LOCATION INFO

CookieStand.prototype.renderInfo = function () {
  infoContainerElem.appendChild(articleInfoElem);

  const locationHeader = document.createElement('h2');
  articleInfoElem.appendChild(locationHeader);
  locationHeader.classList.add('info');
  locationHeader.textContent = this.name;

  const locationHours = document.createElement('p');
  locationHeader.appendChild(locationHours);
  locationHours.classList.add('info');
  locationHours.textContent = this.hours;

  const locationContact = document.createElement('p');
  locationHeader.appendChild(locationContact);
  locationContact.classList.add('info');
  locationContact.textContent = this.contact;

  const locationAddress = document.createElement('p');
  locationHeader.appendChild(locationAddress);
  locationAddress.classList.add('info');
  locationAddress.textContent = this.address;
};

if (infoContainerElem) {
  Africa.renderInfo();
  NewYork.renderInfo();
  Sasebo.renderInfo();
  Syria.renderInfo();
  Bali.renderInfo();
}
