// document.getElementById('signup-btn').addEventListener('submit', signup);
// const form = document.querySelector('#form');
// form.addEventListener('submit', (e) =>{signup()});
function signup()
{
    event.preventDefault();
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('username').value;
    let phone = document.getElementById('phone').value;

    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
        var user = userCredential.user;
        console.log(user);

        
        return db.collection('users').doc(userCredential.user.uid).set({
            username:username,
            phone: phone,
            email: email,
            password: password
        }).then(()=>{
            var url = "./login.html";
            window.location.href = url;
        });
    }).catch(error =>{
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
    })
}
