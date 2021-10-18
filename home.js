let curr_user = "";
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    // console.log(email);
    curr_user = email;
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        // console.log(doc.data().username);
        document.getElementById("profile_name").innerHTML = doc.data().username;
        document.getElementById("email").innerHTML = doc.data().email;

        // let id = doc.data().id;
        //if(doc.data().id == auth.)
      });
  } else {
    //llogin
  }
});

db.collection("users")
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      show_user(doc);
      
    });
  });

const users = document.querySelector(".users");
const show_user = (doc) => {
  if (curr_user !== doc.data().email) {
    const ind_user = `<div class="user" id="user"  data-id ='${doc.id}'>
<img src="./assets/user1.jpeg" alt="" class="img-circle user_img">
<div class="user_details">
    <p class="user_name">${doc.data().username}</p>
    <button class="chat_with_btn" id="chat_with_btn"><i class="material-icons">&#xe163;</i></button>
</div>
</div>`;
    users.insertAdjacentHTML("beforeend", ind_user);

    const btn_click = document.querySelector(
      `[data-id = '${doc.id}'] .chat_with_btn`
    );
    btn_click.addEventListener("click", () => {
      // console.log("button clicked");
      document.getElementById("column_right").style.display = "block";
      document.getElementById("detail_user").innerHTML = doc.data().username;
      document.getElementById("detail_email").innerHTML = doc.data().email;
      let name1 = doc.data().email+"&"+curr_user;
      let name2= curr_user+"&"+doc.data().email;
      let send_btn = document.getElementById("send_btn");
      
      
      let chat_id = name1;

      db.collection("chats").where("chat_id", "in", [name1, name2]).get().then(querySnapShot => {
        
        console.log(querySnapShot.docs.length);
        if (querySnapShot.docs.length > 0) {
          querySnapShot.forEach((doc) => {
            console.log(doc.data());
            chat_id = doc.data().chat_id;
          });
          
        }else{
          document.querySelector(".chat").innerHTML = "<img src='./assets/beginChat.png'>";
        } 
      });

      send_btn.onclick = function () {
        send_message(chat_id);
      };

    });
  }
};

const send_message = (chat_id) => {
  
    
      db.collection("chats").doc(chat_id).collection("messages").add({
        id: 12,
      }).then(res => {
        console.log("message sent!");
      })
  
}

const search_btn = document.querySelector(".search_icon");
// const search_user = () => {
  search_btn.addEventListener("click", () => {
    let name = document.getElementById("search_input").value;
    event.preventDefault();
    users.innerHTML = "";
    db.collection('users').get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        console.log(name);
        if (doc.data().username.toLowerCase().includes(name.toLowerCase())) {
          console.log(doc.data());
          // document.querySelector(".users").style.display="none";
          show_user(doc);
        } else {
          console.log("No data found!");
        }
      })
    })
    
  });
// };
