
//document.getElementById('login-btn').addEventListener('click', login);

function login()
{
    event.preventDefault();
    console.log("here"); 
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredentials) =>{
        var user = userCredentials.user;
        //console.log('home');
        console.log(user);
        var url = "./home.html";
        window.location.href = url;
    }).catch(error => {
        if(error.code === "auth/user-not-found")
            alert("Invalid email, please try again")
        else
            alert("Invalid password, please try again");
        
        console.log(error.code);
        console.log(error.message);
    });

}




