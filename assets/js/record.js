const db = firebase.firestore();
const auth = firebase.auth();

function stayConnected() {
    const email = document.getElementById('email').value;
    const firstname = document.getElementById('firstname').value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '' || firstname === '' || !emailRegex.test(email)) {
        alert('Please fill in all fields and ensure the email is valid.');
    } else {
        const userInfo = {
            browserInfo: navigator.userAgent,
            operatingSystem: navigator.platform,
            language: navigator.language,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            connection: navigator.connection ? navigator.connection.effectiveType : 'unknown',
            cookies: document.cookie
        };

        db.collection('members_get_in_touch').add({
            email: email,
            firstname: firstname,
            date: firebase.firestore.FieldValue.serverTimestamp(),
            redirectPage: window.location.href,
            userInfo: userInfo
        })
            .then(() => {
                alert('Thank you for your interest. We will get back to you soon.');

                window.location.href = 'mailto:thelouwParty@googlegroups.com?subject=Getting in touch about The Louw Party'

                document.getElementById('email').value = '';
                document.getElementById('firstname').value = '';
            })
            .catch((error) => {
                console.error(error);
            })
    }
}