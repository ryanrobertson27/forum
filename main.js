// your code here

const postDiv = document.querySelector('.posts')
const postSubmit = document.querySelector('#submit');

postSubmit.addEventListener('click', function() {

  const postName = document.querySelector('#name').value;
  const postMessage = document.querySelector('#message').value;
  
  const newPostMessage = document.createElement('p');
  newPostMessage.classList.add('new-post')
  newPostMessage.innerHTML = postMessage

  const newPostName = document.createElement('p');
  newPostName.classList.add('new-post')
  newPostName.innerHTML = `Posted By: ${postName}`

  let newPostDiv = document.createElement('div')
  postDiv.appendChild(newPostDiv)

  newPostDiv.appendChild(newPostMessage);
  newPostDiv.appendChild(newPostName);
  newPostDiv.appendChild(document.createElement('hr'))
})




