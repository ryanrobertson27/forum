import { faker } from 'https://cdn.skypack.dev/@faker-js/faker'; //https://fakerjs.dev/api/image.html


let likesDislikesObj = {} //keeps track of likes and dislikes of individual posts
let postCounter = 0; //used to generate post ID's


const postDiv = document.querySelector('.posts')


/*due to html seeing this as a module, newPost doesn't have 
access to the global window object, hence the need for window.newPost */
window.newPost = function(e) {
  // values of user inputed name and message
  const postName = document.querySelector('#name').value;
  const postMessage = document.querySelector('#message').value;
  
  //ENTIRE POST DIV
  //creating wrapper div for new posts
  const newPostDiv = document.createElement('div')
  newPostDiv.classList.add('container', 'border', 'rounded', 'my-3', 'user-post')
  newPostDiv.setAttribute('id', `post-${postCounter + 1}`)
  postDiv.appendChild(newPostDiv)
 

  //MESSAGE DIV
  //creating wrapper dive for message and close button
  const newMessageDiv = document.createElement('div')
  newMessageDiv.classList.add('row', 'mt-2')
  newPostDiv.appendChild(newMessageDiv);
  
  //User Message
  const newPostMessagePara = document.createElement('p');
  newPostMessagePara.classList.add('my-0', 'py-3', 'col-11')
  newPostMessagePara.innerHTML = postMessage
  newMessageDiv.appendChild(newPostMessagePara)
  
  //Button To Delete Post
  const closeButton = document.createElement('button')
  closeButton.classList.add('btn', 'btn-close', 'col-1', 'delete-post')
  closeButton.setAttribute('type', 'button')
  newMessageDiv.appendChild(closeButton);
  
  

  //AUTHOR DIV
  //creating wrapper div for author section
  const newAuthorDiv = document.createElement('div')
  newAuthorDiv.classList.add('row', 'p-2', 'border-top', 'align-items-center', 'bg-light')
  newPostDiv.appendChild(newAuthorDiv)

  //avatar
  const img = document.createElement('img')
  img.src = faker.image.avatar()
  img.classList.add('col-1', 'rounded-circle')
  newAuthorDiv.appendChild(img)

  //Creating Wrapper COLUMN Div For Name and Date
  const nameAndDateCol = document.createElement('div')
  nameAndDateCol.classList.add('col-7')
  newAuthorDiv.appendChild(nameAndDateCol)

  //Creating Wrapper ROW Div For Name and Date
  const nameAndDateRow = document.createElement('div')
  nameAndDateRow.classList.add('row')
  nameAndDateCol.appendChild(nameAndDateRow)

  //Posted By:
  const newPostName = document.createElement('p');
  newPostName.classList.add('my-0')
  newPostName.innerHTML = "Posted By: "
  nameAndDateRow.appendChild(newPostName);

  //User Name
  const newPostNameSpan = document.createElement('strong')
  newPostNameSpan.innerHTML = postName;
  newPostNameSpan.classList.add('fw-bold', 'my-0')
  newPostName.appendChild(newPostNameSpan) 

  //thumbs Up Icon
  const thumbsUpIcon = document.createElement('i')
  thumbsUpIcon.classList.add('bi', 'bi-hand-thumbs-up', 'col-1');
  newAuthorDiv.appendChild(thumbsUpIcon)

  //thumbs Up Counter
  const thumbsUpCounter = document.createElement('p')
  thumbsUpCounter.classList.add('my-0', 'col-1', 'like-count')
  thumbsUpCounter.innerHTML = 0;
  newAuthorDiv.appendChild(thumbsUpCounter);
  
  //Thumbs Down Icon
  const thumbsDownIcon = document.createElement('i')
  thumbsDownIcon.classList.add('bi', 'bi-hand-thumbs-down', 'col-1');
  newAuthorDiv.appendChild(thumbsDownIcon)
  
  // Thumbs Down Counter
  const thumbsDownCounter = document.createElement('p')
  thumbsDownCounter.classList.add('my-0', 'col-1', 'dislike-count')
  thumbsDownCounter.innerHTML = 0;
  newAuthorDiv.appendChild(thumbsDownCounter);

  //Time Posted
  const postedTime = document.createElement('p')
  postedTime.classList.add('col', 'text-black-50', 'text-opacity-50', 'mb-0');
  const currentTime = getCurrentTime(new Date())//calls function to generate current time
  postedTime.innerHTML = currentTime;
  nameAndDateRow.appendChild(postedTime);

  //calls function that creates Object tracking likes/dislikes
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

document.addEventListener('click', function(e){
  //X button on each post will delete that post
  if(e.target && e.target.classList.contains('delete-post')){
    const postid = e.target.parentNode.parentNode
    postid.remove()
  }
  //updates likes counter when thumbs up clicked
  if(e.target && e.target.classList.contains('bi-hand-thumbs-up')) {
    let postid = e.target.parentNode.parentNode.id
    likesDislikesObj[postid].likes += 1;
    let likesNumber = e.target.parentNode.querySelector('.like-count');
    likesNumber.innerHTML = likesDislikesObj[postid].likes;
    e.target.classList.add('text-success')
    likesNumber.classList.add('text-success')
    
    
  //updates dislikes counter when thumbs up clicked
  if(e.target && e.target.classList.contains('bi-hand-thumbs-down')) {
    let postid = e.target.parentNode.parentNode.id
    likesDislikesObj[postid].dislikes += 1;
    let dislikesNumber = e.target.parentNode.querySelector('.dislike-count');
    dislikesNumber.innerHTML = likesDislikesObj[postid].dislikes;
    e.target.classList.add('text-danger')
    dislikesNumber.classList.add('text-danger')
  }

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
})
  
  