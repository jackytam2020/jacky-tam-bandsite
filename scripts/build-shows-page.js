const shows = [
  {
    date: 'Mon Sept 06 2021',
    venue: 'Ronald Lane',
    location: 'San Francisco, CA',
  },
  {
    date: 'Tue Sept 21 2021',
    venue: 'Pier 3 East',
    location: 'San Francisco, CA',
  },
  {
    date: 'Fri Oct 15 2021',
    venue: 'View Lounge',
    location: 'San Francisco, CA',
  },
  {
    date: 'Sat Nov 06 2021',
    venue: 'Hyatt Agency',
    location: 'San Francisco, CA',
  },
  {
    date: 'Fri Nov 26 2021',
    venue: 'Moscow Center',
    location: 'San Francisco, CA',
  },
  {
    date: 'Wed Dec 15 2021',
    venue: 'Press Club',
    location: 'San Francisco, CA',
  },
];

//selectors
let showContainer = document.querySelector('.shows__bottom');

const renderShows = (showsArr) => {
  showsArr.forEach((show, index) => {
    let itemContainer = document.createElement('div');
    itemContainer.classList.add('shows__show-container');

    let itemObjectContainer = document.createElement('div');
    itemObjectContainer.classList.add('shows__show-object-item-container');

    let itemObject1 = document.createElement('div');
    itemObject1.classList.add('shows__show-object-item');

    let dateKey = document.createElement('p');
    dateKey.classList.add('shows__object-key');
    dateKey.innerHTML = 'DATE';

    let dateValue = document.createElement('p');
    dateValue.classList.add('shows__object-value');
    dateValue.innerHTML = show.date;

    let itemObject2 = document.createElement('div');
    itemObject2.classList.add('shows__show-object-item');

    let venueValue = document.createElement('p');
    venueValue.classList.add('shows__object-value');
    venueValue.innerHTML = show.venue;

    let venueKey = document.createElement('p');
    venueKey.classList.add('shows__object-key');
    venueKey.innerHTML = 'VENUE';

    let itemObject3 = document.createElement('div');
    itemObject3.classList.add('shows__show-object-item');

    let locationKey = document.createElement('p');
    locationKey.classList.add('shows__object-key');
    locationKey.innerHTML = 'LOCATION';

    let locationValue = document.createElement('p');
    locationValue.classList.add('shows__object-value');
    locationValue.innerHTML = show.location;

    let buyTicketsBtn = document.createElement('button');
    buyTicketsBtn.classList.add('shows__buy-tickets');
    buyTicketsBtn.innerHTML = 'BUY TICKETS';

    showContainer.appendChild(itemContainer);
    itemContainer.appendChild(itemObjectContainer);
    itemObjectContainer.appendChild(itemObject1);
    itemObjectContainer.appendChild(itemObject2);
    itemObjectContainer.appendChild(itemObject3);
    itemObject1.appendChild(dateKey);
    itemObject1.appendChild(dateValue);
    itemObject2.appendChild(venueKey);
    itemObject2.appendChild(venueValue);
    itemObject3.appendChild(locationKey);
    itemObject3.appendChild(locationValue);
    itemObjectContainer.appendChild(buyTicketsBtn);
  });
};

renderShows(shows);
