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