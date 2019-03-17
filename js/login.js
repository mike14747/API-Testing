// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // user is signed in
            return false;
        },
        uiShown: function () {
            // the widget is rendered, so hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    // will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: 'index.html',
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
};

// callbacks: { 'signInSuccess': function(currentUser, credential, redirectUrl) { return false; }

// this will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

function logOut() {
    firebase.auth().signOut();
}

function logIn() {
    $("#loginModal").modal("show");
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // user is signed in
        console.log("Yes");
        $("#log_in").hide();
        $("#log_out").show();
    } else {
        // user is not signed in
        console.log("No");
        $("#log_in").show();
        $("#log_out").hide();
    }
});