import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const formattedMessage = `
  Name: ${name}
  Email: ${email}
    
  Message:
  ${message}
  `;

  const mailOptions = {
    from: `"${name}" <${process.env.EMAIL_USER}>`, // 送信者の名前と認証されたメールアドレス
    replyTo: email, // 返信先を実際の送信者に設定
    to: process.env.EMAIL_USER,
    subject: `New message from ${name}`,
    text: formattedMessage,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Error sending email" }), {
      status: 500,
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
