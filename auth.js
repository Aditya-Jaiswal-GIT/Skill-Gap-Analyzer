// Authentication Helper Functions

// Sign up with email and password
async function signUpWithEmail(email, password) {
    try {
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign in with email and password
async function signInWithEmail(email, password) {
    try {
        const userCredential = await firebaseAuth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign in with Google
async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        const result = await firebaseAuth.signInWithPopup(provider);
        return { success: true, user: result.user };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Sign out
async function signOut() {
    try {
        await firebaseAuth.signOut();
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Check if user is authenticated
function checkAuth(redirectTo = 'login.html') {
    return new Promise((resolve) => {
        firebaseAuth.onAuthStateChanged((user) => {
            if (user) {
                resolve(user);
            } else {
                window.location.href = redirectTo;
            }
        });
    });
}

// Get current user
function getCurrentUser() {
    return firebaseAuth.currentUser;
}

// Password reset
async function resetPassword(email) {
    try {
        await firebaseAuth.sendPasswordResetEmail(email);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}
