const showContainer = document.querySelector('.shows__bottom');

const renderShows = (showsArr) => {
  const renderedArr = showsArr.map((show) => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('shows__show-container');

    const itemObjectContainer = document.createElement('div');
    itemObjectContainer.classList.add('shows__show-object-item-container');

    const itemObject1 = document.createElement('div');
    itemObject1.classList.add('shows__show-object-item');

    const dateKey = document.createElement('p');
    dateKey.classList.add('shows__object-key');
    dateKey.innerHTML = 'DATE';

    const dateValue = document.createElement('p');
    dateValue.classList.add('shows__object-value--bolded');
    dateValue.innerHTML = new Date(show.date)
      .toLocaleString('en-CA', {
        timeZone: 'UTC',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
      })
      .replace(/,/g, ' ');

    const itemObject2 = document.createElement('div');
    itemObject2.classList.add('shows__show-object-item');

    const venueValue = document.createElement('p');
    venueValue.classList.add('shows__object-value');
    venueValue.innerHTML = show.place;

    const venueKey = document.createElement('p');
    venueKey.classList.add('shows__object-key');
    venueKey.innerHTML = 'VENUE';

    const itemObject3 = document.createElement('div');
    itemObject3.classList.add('shows__show-object-item');

    const locationKey = document.createElement('p');
    locationKey.classList.add('shows__object-key');
    locationKey.innerHTML = 'LOCATION';

    const locationValue = document.createElement('p');
    locationValue.classList.add('shows__object-value');
    locationValue.innerHTML = show.location;

    const buyTicketsBtn = document.createElement('button');
    buyTicketsBtn.classList.add('shows__buy-tickets');
    buyTicketsBtn.innerHTML = 'BUY TICKETS';

    buyTicketsBtn.addEventListener('click', () => {
      const selectedRow = document.querySelector(
        '.shows__show-container--active'
      );
      itemContainer.classList.toggle('shows__show-container--active');

      if (selectedRow) {
        selectedRow.classList.remove('shows__show-container--active');
      }
    });

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

let shows = [];

const getAllShows = async () => {
  const showsPromise = await axios.get(
    `https://project-1-api.herokuapp.com/showdates?api_key=4d7cc112-e75f-4f19-a2de-f1563bbe35f6`
  );
  shows = showsPromise.data;
  renderShows(shows);
};

getAllShows();
