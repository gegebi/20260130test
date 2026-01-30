document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const initialAmount = parseFloat(document.getElementById('initial-amount').value);
    const annualRate = parseFloat(document.getElementById('annual-rate').value);
    const monthlyContribution = parseFloat(document.getElementById('monthly-contribution').value);
    const investmentPeriod = parseInt(document.getElementById('investment-period').value);

    if (isNaN(initialAmount) || isNaN(annualRate) || isNaN(monthlyContribution) || isNaN(investmentPeriod)) {
        alert("모든 값을 올바르게 입력해주세요.");
        return;
    }

    const monthlyRate = annualRate / 100 / 12;
    let currentBalance = initialAmount;
    
    let results = [];
    
    for (let year = 1; year <= investmentPeriod; year++) {
        let yearlyPrincipal = (year === 1) ? initialAmount : 0;
        let yearlyInterest = 0;

        for (let month = 1; month <= 12; month++) {
            let interestThisMonth = (currentBalance + monthlyContribution) * monthlyRate;
            currentBalance += monthlyContribution + interestThisMonth;
            yearlyInterest += interestThisMonth;
        }
        
        const totalContribution = initialAmount + (monthlyContribution * 12 * year);
        results.push({
            year: year,
            finalBalance: Math.round(currentBalance),
            totalContribution: totalContribution,
            totalInterest: Math.round(currentBalance - totalContribution)
        });
    }

    displayResults(results);
});

function displayResults(results) {
    const container = document.getElementById('result-container');
    container.innerHTML = '';

    if (results.length === 0) return;

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>년차</th>
                <th>총 납입 원금</th>
                <th>총 이자</th>
                <th>연말 총 자산</th>
            </tr>
        </thead>
        <tbody>
            ${results.map(res => `
                <tr>
                    <td>${res.year}년</td>
                    <td>${res.totalContribution.toLocaleString('ko-KR')}만원</td>
                <td>${res.totalInterest.toLocaleString('ko-KR')}만원</td>
                <td><strong>${res.finalBalance.toLocaleString('ko-KR')}만원</strong></td>
                </tr>
            `).join('')}
        </tbody>
    `;

    container.appendChild(table);
}

// Partnership form logic
const openFormBtn = document.getElementById('open-partnership-form-btn');
const closeFormBtn = document.getElementById('close-partnership-form-btn');
const partnershipFormSection = document.getElementById('partnership-form-section');

if (openFormBtn && partnershipFormSection) {
    openFormBtn.addEventListener('click', function() {
        partnershipFormSection.classList.remove('hidden-form-section');
        openFormBtn.style.display = 'none'; // Hide the open button when form is visible
    });
}

if (closeFormBtn && partnershipFormSection) {
    closeFormBtn.addEventListener('click', function() {
        partnershipFormSection.classList.add('hidden-form-section');
        openFormBtn.style.display = 'block'; // Show the open button when form is hidden
    });
}

// Optional: Add a simple confirmation for Formspree submission
const formspreeForm = document.querySelector('#partnership-form-section form');
if (formspreeForm) {
    formspreeForm.addEventListener('submit', function(event) {
        // Formspree handles the actual submission, just provide user feedback
        alert('문의가 성공적으로 전송되었습니다!');
        // Optionally hide the form after submission
        partnershipFormSection.classList.add('hidden-form-section');
        openFormBtn.style.display = 'block';
        formspreeForm.reset(); // Clear form fields
    });
}