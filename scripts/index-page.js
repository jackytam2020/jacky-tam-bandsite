const renderedCommentsContainer = document.querySelector(
  '.comments-section__rendered-comments'
);

const renderComments = (commentsArr) => {
  //sort comments so that most recent comments appear at the top
  const sortedCommentsArr = commentsArr.sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );
  sortedCommentsArr.map((comment, index) => {
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

    datePosted.innerHTML = new Date(comment.timestamp)
      .toLocaleString('en-CA', {
        timeZone: 'UTC',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        weekday: 'short',
      })
      .replace(/,/g, ' ');

    const commentPosted = document.createElement('p');
    commentPosted.classList.add('comments-section__comment');

    const likeCount = document.createElement('p');
    likeCount.classList.add('comments-section__like-count');

    const likeIcon = document.createElement('img');
    likeIcon.classList.add('comments-section__like-icon');
    likeIcon.src = '../assets/icons/SVG/icon-like.svg';

    likeIcon.addEventListener('click', () => {
      likeComment(comment.id);
    });

    likeCount.innerHTML = comment.likes + '  likes';

    const deleteIcon = document.createElement('img');
    deleteIcon.classList.add('comments-section__delete-icon');
    deleteIcon.src = '../assets/icons/SVG/icon-delete.svg';

    deleteIcon.addEventListener('click', () => {
      deleteComment(comment.id);
    });

    commentPosted.innerHTML = comment.comment;

    renderedCommentsContainer.appendChild(commentContainer);
    commentContainer.appendChild(commentLeftContainer);
    commentLeftContainer.appendChild(avatar);
    commentContainer.appendChild(commentRightContainer);
    commentRightContainer.appendChild(userInfo);
    userInfo.appendChild(userName);
    userInfo.appendChild(datePosted);
    commentRightContainer.appendChild(commentPosted);
    commentRightContainer.appendChild(likeCount);
    commentRightContainer.appendChild(likeIcon);
    commentRightContainer.appendChild(deleteIcon);
  });
};

const getAllComments = () => {
  const commentsPromise = axios.get(
    `https://project-1-api.herokuapp.com/comments?api_key=4d7cc112-e75f-4f19-a2de-f1563bbe35f6`
  );
  commentsPromise
    .then((response) => {
      //remove all elements in the container and then repopulate the updated array
      renderedCommentsContainer.innerHTML = '';
      renderComments(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
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

const addComment = (inputedName, inputedComment) => {
  const addCommentResponse = axios.post(
    `https://project-1-api.herokuapp.com/comments?api_key=4d7cc112-e75f-4f19-a2de-f1563bbe35f6`,
    {
      name: inputedName,
      comment: inputedComment,
    }
  );
  addCommentResponse.then((response) => {
    getAllComments();
  });
};

const postComment = (event) => {
  event.preventDefault();

  //turn input border red if they are empty on click
  handleInputError();

  if (nameInputField.value !== '' && commentInputField.value !== '') {
    addComment(newUser, newComment);
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

const deleteComment = (commentID) => {
  const deleteResponse = axios.delete(
    `https://project-1-api.herokuapp.com/comments/${commentID}?api_key=4d7cc112-e75f-4f19-a2de-f1563bbe35f6`
  );
  deleteResponse
    .then((response) => {
      console.log(response);
      getAllComments();
    })
    .catch((error) => {
      console.log(error);
    });
};

const likeComment = (commentID) => {
  const likeResponse = axios.put(
    `https://project-1-api.herokuapp.com/comments/${commentID}/like?api_key=4d7cc112-e75f-4f19-a2de-f1563bbe35f6`
  );
  likeResponse
    .then((response) => {
      console.log(response.data);
      getAllComments();
    })
    .catch((error) => {
      console.log(error.data);
    });
};

getAllComments();

const postButton = document.querySelector('.comments-section__post-button');
postButton.addEventListener('click', postComment);
