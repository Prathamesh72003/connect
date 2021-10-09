document.getElementById('signup-btn').addEventListener('click', signup);

function signup()
{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    let phone = document.getElementById('phone').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        var user = userCredential.user;
        console.log(user);
        var url = "./login.html";
        window.location.href = url;

    }).catch(error =>{
        console.log(error.code);
        console.log(error.message);
    })

    db.collection('users').add({
        username:username,
        phone: phone,
        email: email,
        password: password
    });

}
