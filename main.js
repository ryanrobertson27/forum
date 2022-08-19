// your code here

const postDiv = document.querySelector('.posts')



let newPost = function(e) {
  // values of user inputed name and message
  const postName = document.querySelector('#name').value;
  const postMessage = document.querySelector('#message').value;
  
  //creating wrapper div for new posts
  const newPostDiv = document.createElement('div')
  newPostDiv.classList.add('container', 'border', 'rounded', 'my-3')
  postDiv.appendChild(newPostDiv)
  

  //creating wrapper dive for message and close button
  const newMessageDiv = document.createElement('div')
  newMessageDiv.classList.add('row', 'mt-2')
  newPostDiv.appendChild(newMessageDiv);

  const newPostMessagePara = document.createElement('p');
  newPostMessagePara.classList.add('my-0', 'py-3', 'col-11')
  newPostMessagePara.innerHTML = postMessage
  newMessageDiv.appendChild(newPostMessagePara)

  const closeButton = document.createElement('button')
  closeButton.classList.add('btn', 'btn-close', 'col-1', 'delete-post')
  closeButton.setAttribute('type', 'button')
  newMessageDiv.appendChild(closeButton);



  //creating wrapper div for author section
  const newAuthorDiv = document.createElement('div')
  newAuthorDiv.classList.add('row', 'my-1', 'pt-3', 'border-top', 'align-items-center')
  newPostDiv.appendChild(newAuthorDiv)

  const newPostName = document.createElement('p');
  newPostName.classList.add('my-0', 'col-8')
  newPostName.innerHTML = "Posted By: "
  newAuthorDiv.appendChild(newPostName);

  const newPostNameSpan = document.createElement('strong')
  newPostNameSpan.innerHTML = postName;
  newPostNameSpan.classList.add('fw-bold', 'my-0')
  newPostName.appendChild(newPostNameSpan) 

  const thumbsUpIcon = document.createElement('i')
  thumbsUpIcon.classList.add('bi', 'bi-hand-thumbs-up', 'col-1');
  newAuthorDiv.appendChild(thumbsUpIcon)

  const thumbsUpCounter = document.createElement('p')
  thumbsUpCounter.classList.add('my-0', 'col-1')
  thumbsUpCounter.innerHTML = 0;
  newAuthorDiv.appendChild(thumbsUpCounter);
  
  const thumbsDownIcon = document.createElement('i')
  thumbsDownIcon.classList.add('bi', 'bi-hand-thumbs-down', 'col-1');
  newAuthorDiv.appendChild(thumbsDownIcon)
  
  const thumbsDownCounter = document.createElement('p')
  thumbsDownCounter.classList.add('my-0', 'col-1')
  thumbsDownCounter.innerHTML = 0;
  newAuthorDiv.appendChild(thumbsDownCounter);

  //Create time stamp
  const postedTimeDiv = document.createElement('div')
  postedTimeDiv.classList.add('row')
  newPostDiv.append(postedTimeDiv);

  const postedTime = document.createElement('p')
  postedTime.classList.add('col', 'text-black-50', 'text-opacity-50', 'mb-2');
  const currentTime = getCurrentTime(new Date())
  postedTime.innerHTML = currentTime;
  postedTimeDiv.appendChild(postedTime);

  e.reset() 
}


//function to get current time and display in 12HR format. ie 11:49PM
// https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
let getCurrentTime = function(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  seconds = seconds < 10 ? '0'+seconds : seconds;

  let strTime = `${hours}:${minutes}:${seconds} ${ampm}`;
  return strTime;
}


document.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains('delete-post')){
    e.target.parentNode.parentNode.remove()
  }
})

