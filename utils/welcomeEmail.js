const getWelcomeEmail = (firstname) => {
  return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #ff5733; text-align: center;">Welcome, ${firstname}!</h2>
        <p style="font-size: 16px; line-height: 1.5; color: #333;">
          Congratulations! We are thrilled to have you join <strong>My Jumia App</strong>.
        </p>
        <p style="font-size: 16px; line-height: 1.5; color: #333;">
          Explore amazing deals, connect with our community, and enjoy an incredible shopping experience.
        </p>
        <p style="text-align: center;">
          <a href="https://yourapp.com" style="display: inline-block; padding: 10px 20px; color: #fff; background-color: #ff5733; text-decoration: none; border-radius: 5px;">
            Visit Our Platform
          </a>
        </p>
        <p style="font-size: 14px; color: #777; text-align: center;">&copy; 2025 My Jumia App. All rights reserved.</p>
      </div>
    `;
};

module.exports = getWelcomeEmail;
