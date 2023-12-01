firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../login.html";
    }
})

console.log("aaaaaaa")
