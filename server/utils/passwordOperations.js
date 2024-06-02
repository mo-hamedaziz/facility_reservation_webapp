// Define a function to generate a random password
const generateRandomPassword = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

// Generate the email body
const passwordEmailBody = (password) => {
  const body = `<p>This message was sent to you by the Facility Reservation App admin.</p>
    <p>Your signup request has been approved and we're glad you have joined us. Here's your generated login password: <strong>${password}</strong> .</p>
    <p>Use your unique email address and password to login and access your dashboard.</p><p>*This account will be automatically deleted after exactly one year from today.</p>`;

  return body;
};

module.exports = {
  generateRandomPassword,
  passwordEmailBody,
};
