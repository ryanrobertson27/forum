// your code here


let likesDislikesObj = {} //keeps track of likes and dislikes of individual posts


const postDiv = document.querySelector('.posts')
let postCounter = 0; //used to generate post ID's



let newPost = function(e) {
  // values of user inputed name and message
  const postName = document.querySelector('#name').value;
  const postMessage = document.querySelector('#message').value;
  
  //creating wrapper div for new posts
  const newPostDiv = document.createElement('div')
  newPostDiv.classList.add('container', 'border', 'rounded', 'my-3', 'user-post')
  newPostDiv.setAttribute('id', `post-${postCounter + 1}`)
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
  thumbsUpCounter.classList.add('my-0', 'col-1', 'like-count')
  thumbsUpCounter.innerHTML = 0;
  newAuthorDiv.appendChild(thumbsUpCounter);
  
  const thumbsDownIcon = document.createElement('i')
  thumbsDownIcon.classList.add('bi', 'bi-hand-thumbs-down', 'col-1');
  newAuthorDiv.appendChild(thumbsDownIcon)
  
  const thumbsDownCounter = document.createElement('p')
  thumbsDownCounter.classList.add('my-0', 'col-1', 'dislike-count')
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

  createPostObject(`post-${postCounter + 1}`)

  postCounter++;
  e.reset() 
}

//function to create post Object each time a post is created.  That object stores the likes and
//dislikes of that specific post
let createPostObject = function(id) {
  likesDislikesObj[id] = {likes: 0, dislikes: 0}
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

//post X will remove post
document.addEventListener('click', function(e){
  if(e.target && e.target.classList.contains('delete-post')){
    postid = e.target.parentNode.parentNode
    postid.remove()
  }
  if(e.target && e.target.classList.contains('bi-hand-thumbs-up')) {
    let postid = e.target.parentNode.parentNode.id
    likesDislikesObj[postid].likes += 1;
    let likesNumber = e.target.parentNode.querySelector('.like-count');
    likesNumber.innerHTML = likesDislikesObj[postid].likes;
    e.target.classList.add('text-success')
    likesNumber.classList.add('text-success')


    //Sorts posts by number of likes. Uses the textContext of each like-count text
    let userPosts = [...document.querySelectorAll('.user-post')]
    if(userPosts.length > 1){
      userPosts.sort((a,b) => {
        let likesOfA = a.querySelector('.like-count').textContent;
        let likesOfB = b.querySelector('.like-count').textContent;
        return likesOfB - likesOfA;
      }).forEach(e => {
        e.remove();
        postDiv.appendChild(e)
      })
    }
  }
  if(e.target && e.target.classList.contains('bi-hand-thumbs-down')) {
    let postid = e.target.parentNode.parentNode.id
    likesDislikesObj[postid].dislikes += 1;
    let dislikesNumber = e.target.parentNode.querySelector('.dislike-count');
    dislikesNumber.innerHTML = likesDislikesObj[postid].dislikes;
    e.target.classList.add('text-danger')
    dislikesNumber.classList.add('text-danger')
  }
})

