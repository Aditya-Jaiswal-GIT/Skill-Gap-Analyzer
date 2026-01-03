// Check if user is logged in with Firebase
window.addEventListener('DOMContentLoaded', async function () {
    const user = await checkAuth();

    // Display user email
    const userEmailElement = document.getElementById('userEmail');
    if (userEmailElement && user.email) {
        userEmailElement.textContent = user.email;
    }
});

// Logout function with Firebase
async function logout() {
    const result = await signOut();
    if (result.success) {
        window.location.href = 'index.html';
    }
}

// Skills management
let currentSkills = [];

function addSkill() {
    const skillName = document.getElementById('skillName').value.trim();
    const skillLevel = document.getElementById('skillLevel').value;

    if (skillName) {
        currentSkills.push({ name: skillName, level: skillLevel });
        updateSkillsDisplay();
        document.getElementById('skillName').value = '';
    }
}

function removeSkill(index) {
    currentSkills.splice(index, 1);
    updateSkillsDisplay();
}

function updateSkillsDisplay() {
    const container = document.getElementById('skillsContainer');
    container.innerHTML = currentSkills.map((skill, index) => `
        <div class="skill-item">
            <span class="skill-item-name">${skill.name}</span>
            <span class="skill-item-level">${skill.level}</span>
            <button type="button" class="skill-item-remove" onclick="removeSkill(${index})">×</button>
        </div>
    `).join('');
}

// Allow adding skills with Enter key
document.getElementById('skillName').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        addSkill();
    }
});

// Form submission
document.getElementById('analysisForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    // Show loading state
    const loadingState = document.getElementById('loadingState');
    const form = document.getElementById('analysisForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    loadingState.classList.add('active');
    form.style.display = 'none';
    successMessage.classList.remove('active');
    errorMessage.classList.remove('active');

    // Collect form data
    const formData = {
        currentRole: document.getElementById('currentRole').value,
        targetRole: document.getElementById('targetRole').value,
        industry: document.getElementById('industry').value,
        yearsExperience: parseInt(document.getElementById('yearsExperience').value),
        currentSkills: currentSkills,
        educationLevel: document.getElementById('educationLevel').value,
        weeklyLearningHours: parseInt(document.getElementById('weeklyLearningHours').value),
        preferredLearningStyle: document.getElementById('preferredLearningStyle').value,
        budget: document.getElementById('budget').value,
        timelineMonths: parseInt(document.getElementById('timelineMonths').value)
    };

    try {
        // Send data to webhook
        const response = await fetch('https://aditya212005.app.n8n.cloud/webhook/skill-gap-analyzer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();

        // Get current user
        const user = getCurrentUser();

        // Save to Firestore
        if (user) {
            await firebaseDb.collection('users').doc(user.uid)
                .collection('skillAnalyses').add({
                    ...formData,
                    result: result,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
        }

        // Store result in localStorage (for immediate access)
        localStorage.setItem('skillGapAnalysis', JSON.stringify(result));

        // Redirect to results page
        window.location.href = 'results.html';

    } catch (error) {
        console.error('Error:', error);
        loadingState.classList.remove('active');
        form.style.display = 'block';
        errorMessage.textContent = 'Failed to analyze your skills. Please try again.';
        errorMessage.classList.add('active');
    }
});
