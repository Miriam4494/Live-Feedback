import axios from "axios";

export const sendEmail = async ({
  to,
  subject,
  body,
  isHtml = true,
}: {
  to: string;
  subject: string;
  body: string;
  isHtml?: boolean;
}) => {
  try {
    const response = await axios.post("https://live-feedback-lgcr.onrender.com/api/email/send", {
      to,
      subject,
      body,
      isHtml,
    });
    console.log("📩 Email sent!", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw error;
  }
};