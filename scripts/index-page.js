const comments = [
  {
    name: 'Connor Walton',
    date: '02/17/2021',
    comment:
      'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
  },
  {
    name: 'Emilie Beach',
    date: '01/09/2021',
    comment:
      'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
  },
  {
    name: 'Miles Acosta',
    date: '12/20/2020',
    comment: `I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.`,
  },
];

const renderedCommentsContainer = document.querySelector(
  '.comments-section__rendered-comments'
);

const renderComments = (commentsArr) => {
  commentsArr.map((comment, index) => {
    const commentContainer = document.createElement('div');
    commentContainer.classList.add('comments-section__comment-container');

    const commentLeftContainer = document.createElement('div');
    commentLeftContainer.classList.add(
      'comments-section__left-comment-container'
    );

    const avatar = document.createElement('div');
    avatar.classList.add('comments-section__avatar');

    const commentRightContainer = document.createElement('div');
    commentRightContainer.classList.add(
      'comments-section__right-comment-container'
    );

    const userInfo = document.createElement('div');
    userInfo.classList.add('comments-section__user-info');

    const userName = document.createElement('p');
    userName.classList.add('comments-section__user-name');

    userName.innerHTML = comment.name;

    const datePosted = document.createElement('p');
    datePosted.classList.add('comments-section__date-posted');

    datePosted.innerHTML = comment.date;

    const commentPosted = document.createElement('p');
    commentPosted.classList.add('comments-section__comment');

    commentPosted.innerHTML = comment.comment;

    renderedCommentsContainer.appendChild(commentContainer);
    commentContainer.appendChild(commentLeftContainer);
    commentLeftContainer.appendChild(avatar);
    commentContainer.appendChild(commentRightContainer);
    commentRightContainer.appendChild(userInfo);
    userInfo.appendChild(userName);
    userInfo.appendChild(datePosted);
    commentRightContainer.appendChild(commentPosted);
  });
};

let newUser;
let newComment;

const nameInputField = document.querySelector('.comments-section__name-input');
const commentInputField = document.querySelector(
  '.comments-section__comment-input'
);

const handleInputName = (event) => {
  newUser = event.target.value;

  if (event.target.value !== '') {
    nameInputField.className = 'comments-section__name-input';
  } //if users backspaces till empty, trigger error outline
  else if (event.target.value === '') {
    nameInputField.className = 'comments-section__name-input--invalid';
  }
};

nameInputField.addEventListener('keyup', handleInputName);

const handleMessage = (event) => {
  newComment = event.target.value;

  if (event.target.value !== '') {
    commentInputField.className = 'comments-section__comment-input';
  } //if users backspaces till empty, trigger error outline
  else if (event.target.value === '') {
    commentInputField.className = 'comments-section__comment-input--invalid';
  }
};

commentInputField.addEventListener('keyup', handleMessage);

const handleInputError = () => {
  if (nameInputField.value === '') {
    nameInputField.className = 'comments-section__name-input--invalid';
  }

  if (commentInputField.value === '') {
    commentInputField.className = 'comments-section__comment-input--invalid';
  }
};

const postComment = (event) => {
  event.preventDefault();

  const day = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  let newDate = month + '/' + day + '/' + year;

  //turn input border red if they are empty on click
  handleInputError();

  if (nameInputField.value !== '' && commentInputField.value !== '') {
    comments.unshift({ name: newUser, date: newDate, comment: newComment });

    //remove all elements in the container
    renderedCommentsContainer.innerHTML = '';
    renderComments(comments);

    //clear input value and stored input values
    nameInputField.value = '';
    commentInputField.value = '';
    newUser.value = '';
    newComment.value = '';
  } else {
    //do nothing
    null;
  }
};

renderComments(comments);

const postButton = document.querySelector('.comments-section__post-button');
postButton.addEventListener('click', postComment);
