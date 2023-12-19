const db = firebase.firestore();
const auth = firebase.auth();

function getInvolved() {
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;

    if (email === '' || firstname === '') {
        alert('Please fill in all fields');
    } else {
        const userDocRef = db.collection('members_get_in_touch').doc(firstname);
        userDocRef.set({
            email: email,
            firstname: firstname
        })
        .then(() => {
            alert('Thank you for your interest. We will get back to you soon.');
            document.getElementById('email').value = '';
            document.getElementById('firstname').value = '';
        })
        .catch((error) => {
            console.error(error);
            alert(error)
        })
    }
}