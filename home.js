const users = document.querySelector('.users');
const show_user = (doc) =>{
  const ind_user = `<div class="user" id="user"  data-id ='${doc.id}'>
<img src="./assets/user1.jpeg" alt="" class="img-circle user_img">
<div class="user_details">
    <p class="user_name">${doc.data().username}</p>
    <button class="chat_with_btn" id="chat_with_btn">Chat</button>
</div>
</div>`;
users.insertAdjacentHTML("beforeend", ind_user);

const btn_click = document.querySelector(`[data-id = '${doc.id}'] .chat_with_btn`);
btn_click.addEventListener('click', () => {
  // console.log("button clicked");
  document.getElementById('column_right').style.display = 'block';
  document.getElementById('detail_user').innerHTML = doc.data().username;
  document.getElementById('detail_email').innerHTML = doc.data().email;
});
}


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var email = user.email;
      console.log(email);


      db.collection("users").doc(user.uid).get().then((doc)=> {
        console.log(doc.data().username);
        document.getElementById('profile_name').innerHTML = doc.data().username;
        document.getElementById('email').innerHTML = doc.data().email;
       // let id = doc.data().id;
        //if(doc.data().id == auth.)
    });
    } else {
      // User is signed out.
      // ...
    }
      
    
  
  });

