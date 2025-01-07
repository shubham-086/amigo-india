// emailTemplates.ts
export const verificationEmailTemplate = (
  userName: string,
  verificationCode: string
): string => `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
    }
    .header {
      text-align: center;
      background-color: #006298;
      color: #ffffff;
      padding: 20px;
      border-radius: 5px 5px 0 0;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      padding: 20px;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #999999;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://your-company-logo-url.com/logo.png" alt="Your Company Logo" />
      <h1>Your Company Name</h1>
    </div>
    <div class="content">
      <p>Hi ${userName},</p>
      <p>Thank you for registering with us! Your verification code is:</p>
      <h2 style="text-align: center; color: #006298;">${verificationCode}</h2>
      <p>If you didn’t request this email, you can safely ignore it.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      <p>Need help? <a href="mailto:support@yourcompany.com">Contact Support</a></p>
    </div>
  </div>
</body>
</html>
`;
