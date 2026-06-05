document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const namn = document.getElementById('namn').value;
    const email = document.getElementById('email').value;
    const telefon = document.getElementById('telefon').value;
    const paket = document.getElementById('paket').value;
    const datum = document.getElementById('datum').value;
    const meddelande = document.getElementById('meddelande').value;

    // Create email body
    const emailBody = `
Ny bokning från Fönster Rent:

Namn: ${namn}
E-post: ${email}
Telefon: ${telefon}
Paket: ${paket}
Önskat datum: ${datum}
Meddelande: ${meddelande}
    `.trim();

    // Send email using mailto
    const mailtoLink = `mailto:axel.walhjalt@icloud.com?subject=Ny Bokning från ${namn}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    // Show success message
    document.getElementById('successMessage').style.display = 'block';
    
    // Reset form
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(function() {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
});

// Review form handling
document.getElementById('reviewFormElement').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('reviewName').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const reviewText = document.getElementById('reviewText').value;

    // Create star display
    const stars = '⭐'.repeat(parseInt(rating));

    // Create new review element
    const newReview = document.createElement('div');
    newReview.className = 'review';
    newReview.innerHTML = `
        ${stars}
        <p>"${reviewText}"</p>
        <strong>- ${name}</strong>
    `;

    // Add to reviews container
    document.getElementById('reviewsContainer').appendChild(newReview);

    // Show success message
    document.getElementById('reviewSuccessMessage').style.display = 'block';

    // Reset form
    this.reset();

    // Hide success message after 5 seconds
    setTimeout(function() {
        document.getElementById('reviewSuccessMessage').style.display = 'none';
    }, 5000);

    // Scroll to reviews section
    document.getElementById('reviewForm').scrollIntoView({ behavior: 'smooth' });
});

// Custom Packet Calculator
const windowCountInput = document.getElementById('windowCount');
const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
const calculatedPriceElement = document.getElementById('calculatedPrice');
const priceBreakdownElement = document.getElementById('additionalCost');

const PRICE_PER_WINDOW = 20; // 20 kr per fönster
const MIN_PRICE = 299; // Minimum pris

function calculatePrice() {
    let windowCount = parseInt(windowCountInput.value) || 20;
    
    // Minimum check - minst 20 fönster
    if (windowCount < 20) {
        windowCount = 20;
        windowCountInput.value = 20;
    }

    // Beräkna pris baserat på antal fönster
    let basePrice = windowCount * PRICE_PER_WINDOW;
    
    // Om priset är mindre än 299 kr, använd 299 kr
    if (basePrice < MIN_PRICE) {
        basePrice = MIN_PRICE;
    }

    let additionalCost = 0;
    let services = [];

    // Check selected services
    serviceCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            services.push(checkbox.value);
            if (checkbox.value === 'Invändig puts') {
                additionalCost += 150;
            } else if (checkbox.value === 'Karmar och detaljer') {
                additionalCost += 200;
            }
        }
    });

    const totalPrice = basePrice + additionalCost;

    // Update display
    calculatedPriceElement.textContent = totalPrice;

    // Update breakdown
    let breakdown = `${windowCount} fönster × 20 kr = ${windowCount * PRICE_PER_WINDOW} kr`;
    
    if (windowCount * PRICE_PER_WINDOW < MIN_PRICE) {
        breakdown += `<br><span style="color: #666;">(Minsta pris: ${MIN_PRICE} kr)</span>`;
    }
    
    if (additionalCost > 0) {
        breakdown += `<br>Tjänster: +${additionalCost} kr`;
    }
    
    breakdown += `<br><strong style="color: #0d6efd; font-size: 1.1rem;">Totalt: ${totalPrice} kr</strong>`;
    
    priceBreakdownElement.innerHTML = breakdown;
}

// Update price on input change
windowCountInput.addEventListener('change', calculatePrice);
windowCountInput.addEventListener('input', calculatePrice);

// Update price on checkbox change
serviceCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', calculatePrice);
});

// Custom Packet Form Submit
document.getElementById('customPacketFormElement').addEventListener('submit', function(e) {
    e.preventDefault();

    const windowCount = document.getElementById('windowCount').value;
    const services = Array.from(serviceCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value)
        .join(', ');
    const price = document.getElementById('calculatedPrice').textContent;
    const name = document.getElementById('customName').value;
    const email = document.getElementById('customEmail').value;
    const phone = document.getElementById('customPhone').value;
    const date = document.getElementById('customDate').value;
    const message = document.getElementById('customMessage').value;

    // Create email body
    const emailBody = `
Ny Anpassad Offert från Fönster Rent:

Namn: ${name}
E-post: ${email}
Telefon: ${phone}

--- OFFERT DETALJER ---
Antal fönster: ${windowCount}
Pris per fönster: 20 kr
Tjänster: ${services || 'Endast utvändig puts'}
Beräknad Pris: ${price} kr
Önskat datum: ${date || 'Inte angett'}

Meddelande:
${message}
    `.trim();

    // Send email using mailto
    const mailtoLink = `mailto:axel.walhjalt@icloud.com?subject=Anpassad Offert från ${name}&body=${encodeURIComponent(emailBody)}`;
    window.location.href = mailtoLink;

    // Show success message
    document.getElementById('customSuccessMessage').style.display = 'block';

    // Reset form
    this.reset();
    calculatePrice(); // Reset price display

    // Hide success message after 5 seconds
    setTimeout(function() {
        document.getElementById('customSuccessMessage').style.display = 'none';
    }, 5000);
});

// Initialize price calculation on page load
window.addEventListener('load', calculatePrice);