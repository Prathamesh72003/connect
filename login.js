
document.getElementById('login-btn').addEventListener('click', login);

function login()
{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredentials) =>{
        var user = userCredentials.user;
        console.log(user);
    }).catch(error => {
        console.log(error.code);
        console.log(error.message);
    });

    firebase.auth().onAuthStateChanged(user =>{
        if(user)
        {
           // var url = './home.html';
            //console.log(user+"diff");
           // document.getElementById('test').location.href='https://www.google.com';
            var url = "./home.html";
            window.location.href = url;
        }   
    });

}




