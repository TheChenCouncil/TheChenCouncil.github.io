function smoothScrollAboveElement(elementId, offset) {
    const element = document.getElementById(elementId);
    if (element) {
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top + window.pageYOffset;
        window.scrollTo({
            top: elementTop - offset,
            behavior: 'smooth'
        });
    }
}

const db = firebase.firestore();
const auth = firebase.auth();

function getInvolved() {
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

                document.getElementById('email').value = '';
                document.getElementById('firstname').value = '';
            })
            .catch((error) => {
                console.error(error);
            })
    }
}