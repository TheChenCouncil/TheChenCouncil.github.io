const db = firebase.firestore();
const auth = firebase.auth();

function getInvolved() {
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;

    if (email === '' || firstname === '') {
        alert('Please fill in all fields.');
    } else {
        console.log(email, firstname);
        db.collection('members_get_in_touch').add({
            email: email,
            firstname: firstname,
            date: firebase.firestore.FieldValue.serverTimestamp()
        })
            .then(() => {
                alert('Thank you for your interest. We will get back to you soon.');

                window.location.href = 'mailto:work.jerrywu@gmail.com?subject=Getting in touch about The Louw Institute'

                document.getElementById('email').value = '';
                document.getElementById('firstname').value = '';
            })
            .catch((error) => {
                console.error(error);
            })
    }
}