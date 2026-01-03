// Check if user is logged in
window.addEventListener('DOMContentLoaded', function () {
    const user = JSON.parse(localStorage.getItem('skillGapUser'));
    if (!user || !user.loggedIn) {
        window.location.href = 'login.html';
        return;
    }

    // Load and display results
    loadResults();
});

// Logout function
function logout() {
    localStorage.removeItem('skillGapUser');
    localStorage.removeItem('skillGapAnalysis');
    window.location.href = 'index.html';
}

function loadResults() {
    const resultData = localStorage.getItem('skillGapAnalysis');

    if (!resultData) {
        window.location.href = 'dashboard.html';
        return;
    }

    const result = JSON.parse(resultData);

    // Check if result has the expected structure
    if (!result.success || !result.data) {
        console.error('Invalid result data:', result);
        alert('Error loading results. Please try analyzing again.');
        window.location.href = 'dashboard.html';
        return;
    }

    const data = result.data;

    // Update transition title
    if (result.userProfile) {
        document.getElementById('transitionTitle').textContent =
            `${result.userProfile.currentRole} → ${result.userProfile.targetRole}`;
    }

    // Display analysis overview
    displayAnalysisOverview(data.analysis);

    // Display target role requirements
    displayTargetRole(data.targetRoleRequirements);

    // Display skill comparison
    displaySkillComparison(data.skillComparison);

    // Display gap summary
    displayGapSummary(data.gapSummary);

    // Display learning path
    displayLearningPath(data.learningPath);

    // Display weekly schedule
    displayWeeklySchedule(data.weeklySchedule);

    // Display certifications
    displayCertifications(data.certifications);

    // Display portfolio projects
    displayPortfolioProjects(data.portfolioProjects);

    // Display job search prep
    displayJobSearchPrep(data.jobSearchPrep);

    // Display milestone timeline
    displayMilestoneTimeline(data.milestoneTimeline);

    // Display tips
    displayTips(data.tips);

    // Display investment estimate
    displayInvestmentEstimate(data.estimatedInvestment);
}

function displayAnalysisOverview(analysis) {
    document.getElementById('readinessScore').textContent = `${analysis.overallReadiness}%`;
    document.getElementById('difficulty').textContent = analysis.transitionDifficulty;
    document.getElementById('keyInsight').textContent = analysis.keyInsight;
}

function displayTargetRole(targetRole) {
    const html = `
        <div class="results-grid">
            <div class="result-item">
                <h4>📝 Description</h4>
                <p>${targetRole.description}</p>
            </div>
            <div class="result-item">
                <h4>💰 Average Salary</h4>
                <p>${targetRole.averageSalary}</p>
            </div>
            <div class="result-item">
                <h4>📈 Demand Level</h4>
                <p style="text-transform: capitalize;">${targetRole.demandLevel}</p>
            </div>
        </div>
        <div class="result-item" style="margin-top: 1.5rem;">
            <h4>✅ Must-Have Skills</h4>
            <ul class="result-list">
                ${targetRole.mustHaveSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
        <div class="result-item" style="margin-top: 1rem;">
            <h4>⭐ Nice-to-Have Skills</h4>
            <ul class="result-list">
                ${targetRole.niceToHaveSkills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
        </div>
        <div class="result-item" style="margin-top: 1rem;">
            <h4>🛠️ Common Tools</h4>
            <p>${targetRole.commonTools.join(', ')}</p>
        </div>
    `;

    document.getElementById('targetRoleContent').innerHTML = html;
}

function displaySkillComparison(skillComparison) {
    const html = skillComparison.map(skill => `
        <div class="result-item" style="margin-bottom: 1rem;">
            <h4>${skill.skill} <span class="priority-${skill.priority === 'critical' ? 'critical' : skill.priority === 'high' ? 'high' : 'medium'}">${skill.priority}</span></h4>
            <p><strong>Required:</strong> ${skill.requiredLevel} | <strong>Current:</strong> ${skill.currentLevel}</p>
            <p><strong>Gap Size:</strong> ${skill.gapSize}</p>
            ${skill.transferableFrom ? `<p><strong>Transferable from:</strong> ${skill.transferableFrom}</p>` : ''}
        </div>
    `).join('');

    document.getElementById('skillComparisonContent').innerHTML = html;
}

function displayGapSummary(gapSummary) {
    const html = `
        <div class="results-grid">
            <div class="result-item">
                <h4>🔴 Critical Gaps</h4>
                <ul class="result-list">
                    ${gapSummary.criticalGaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            <div class="result-item">
                <h4>🟡 Moderate Gaps</h4>
                <ul class="result-list">
                    ${gapSummary.moderateGaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            <div class="result-item">
                <h4>🟢 Minor Gaps</h4>
                <ul class="result-list">
                    ${gapSummary.minorGaps.map(gap => `<li>${gap}</li>`).join('')}
                </ul>
            </div>
            <div class="result-item">
                <h4>💪 Your Strengths</h4>
                <ul class="result-list">
                    ${gapSummary.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;

    document.getElementById('gapSummaryContent').innerHTML = html;
}

function displayLearningPath(learningPath) {
    const html = learningPath.phases.map(phase => `
        <div class="result-item" style="margin-bottom: 2rem;">
            <h4>Phase ${phase.phase}: ${phase.name}</h4>
            <p><strong>Duration:</strong> ${phase.durationWeeks} weeks</p>
            <p><strong>Focus:</strong> ${phase.focus.join(', ')}</p>
            
            ${phase.milestones && phase.milestones.length > 0 ? `
                <p style="margin-top: 1rem;"><strong>Milestones:</strong></p>
                <ul class="result-list">
                    ${phase.milestones.map(milestone => `<li>${milestone}</li>`).join('')}
                </ul>
            ` : ''}
            
            ${phase.resources && phase.resources.length > 0 ? `
                <div style="margin-top: 1rem;">
                    <p><strong>Resources:</strong></p>
                    ${phase.resources.map(resource => `
                        <div style="padding: 1rem; background: var(--gray-50); border-radius: var(--radius-lg); margin-top: 0.5rem;">
                            <p><strong>${resource.name}</strong> (${resource.type}) - ${resource.cost}</p>
                            <p>${resource.platform} | ${resource.duration}</p>
                            ${resource.url ? `<a href="${resource.url}" target="_blank" style="color: var(--primary-500);">View Resource →</a>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${phase.projects && phase.projects.length > 0 ? `
                <div style="margin-top: 1rem;">
                    <p><strong>Projects:</strong></p>
                    ${phase.projects.map(project => `
                        <div style="padding: 1rem; background: var(--gray-50); border-radius: var(--radius-lg); margin-top: 0.5rem;">
                            <p><strong>${project.name}</strong> (${project.difficulty})</p>
                            <p>${project.description}</p>
                            <p><strong>Skills:</strong> ${project.skills.join(', ')}</p>
                            <p><strong>Estimated Hours:</strong> ${project.estimatedHours}</p>
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');

    document.getElementById('learningPathContent').innerHTML = html;
}

function displayWeeklySchedule(schedule) {
    const html = `
        <div class="result-item">
            <h4>⏰ Total Weekly Hours: ${schedule.totalHours}</h4>
            <div style="margin-top: 1rem;">
                ${schedule.breakdown.map(item => `
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--gray-200);">
                        <span>${item.activity}</span>
                        <strong>${item.hours} hours</strong>
                    </div>
                `).join('')}
            </div>
        </div>
        <div class="result-item" style="margin-top: 1.5rem;">
            <h4>📅 Suggested Routine</h4>
            <p>${schedule.suggestedRoutine}</p>
        </div>
    `;

    document.getElementById('weeklyScheduleContent').innerHTML = html;
}

function displayCertifications(certifications) {
    if (!certifications || certifications.length === 0) {
        document.getElementById('certificationsContent').innerHTML = '<p>No specific certifications recommended for this path.</p>';
        return;
    }

    const html = certifications.map(cert => `
        <div class="result-item" style="margin-bottom: 1rem;">
            <h4>${cert.name}</h4>
            <p><strong>Provider:</strong> ${cert.provider}</p>
            <p><strong>Importance:</strong> ${cert.importance}</p>
            <p><strong>Cost:</strong> ${cert.cost}</p>
            <p><strong>Prep Time:</strong> ${cert.prepTime}</p>
            <p><strong>When to Take:</strong> ${cert.whenToTake}</p>
        </div>
    `).join('');

    document.getElementById('certificationsContent').innerHTML = html;
}

function displayPortfolioProjects(projects) {
    if (!projects || projects.length === 0) {
        document.getElementById('portfolioContent').innerHTML = '<p>No specific portfolio projects recommended.</p>';
        return;
    }

    const html = projects.map(project => `
        <div class="result-item" style="margin-bottom: 1rem;">
            <h4>${project.name}</h4>
            <p>${project.description}</p>
            <p><strong>Complexity:</strong> ${project.complexity} | <strong>Estimated Hours:</strong> ${project.estimatedHours}</p>
            <p><strong>Skills Showcased:</strong> ${project.skillsShowcased.join(', ')}</p>
            <p><strong>Impact on Hiring:</strong> ${project.impactOnHiring}</p>
        </div>
    `).join('');

    document.getElementById('portfolioContent').innerHTML = html;
}

function displayJobSearchPrep(jobSearch) {
    const html = `
        <div class="results-grid">
            <div class="result-item">
                <h4>🔑 Resume Keywords</h4>
                <p>${jobSearch.resumeKeywords.join(', ')}</p>
            </div>
            <div class="result-item">
                <h4>💬 Interview Topics</h4>
                <ul class="result-list">
                    ${jobSearch.interviewTopics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div class="result-item" style="margin-top: 1.5rem;">
            <h4>🏢 Companies Hiring</h4>
            <p>${jobSearch.companiesHiring.join(', ')}</p>
        </div>
        <div class="result-item" style="margin-top: 1rem;">
            <h4>🌐 Job Boards</h4>
            <p>${jobSearch.jobBoards.join(', ')}</p>
        </div>
    `;

    document.getElementById('jobSearchContent').innerHTML = html;
}

function displayMilestoneTimeline(timeline) {
    const html = `
        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background: var(--gray-100); text-align: left;">
                        <th style="padding: 1rem; border-bottom: 2px solid var(--gray-300);">Month</th>
                        <th style="padding: 1rem; border-bottom: 2px solid var(--gray-300);">Milestone</th>
                        <th style="padding: 1rem; border-bottom: 2px solid var(--gray-300);">Expected Skill Level</th>
                    </tr>
                </thead>
                <tbody>
                    ${timeline.map(item => `
                        <tr>
                            <td style="padding: 1rem; border-bottom: 1px solid var(--gray-200); font-weight: 600;">Month ${item.month}</td>
                            <td style="padding: 1rem; border-bottom: 1px solid var(--gray-200);">${item.milestone}</td>
                            <td style="padding: 1rem; border-bottom: 1px solid var(--gray-200);">${item.expectedSkillLevel}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    document.getElementById('milestoneContent').innerHTML = html;
}

function displayTips(tips) {
    const html = `
        <ul class="result-list">
            ${tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
    `;

    document.getElementById('tipsContent').innerHTML = html;
}

function displayInvestmentEstimate(investment) {
    const html = `
        <div class="results-grid">
            <div class="result-item">
                <h4>📚 Courses</h4>
                <p>${investment.courses}</p>
            </div>
            <div class="result-item">
                <h4>🎓 Certifications</h4>
                <p>${investment.certifications}</p>
            </div>
            <div class="result-item">
                <h4>🛠️ Tools</h4>
                <p>${investment.tools}</p>
            </div>
            <div class="result-item">
                <h4>💰 Total</h4>
                <p><strong>${investment.total}</strong></p>
            </div>
        </div>
        ${investment.freeAlternative ? `
            <div class="result-item" style="margin-top: 1.5rem; background: rgba(79, 172, 254, 0.1); border-left-color: var(--primary-500);">
                <h4>🆓 Free Alternative Path</h4>
                <p>${investment.freeAlternative}</p>
            </div>
        ` : ''}
    `;

    document.getElementById('investmentContent').innerHTML = html;
}
