import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const generateVerificationLink = async (email, uid, formdata, file) => {
  const verificationToken = jwt.sign({ email, uid }, process.env.JWT);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'maarijirfan8600@gmail.com',
      pass: 'nxmugzdhpevtbnvv',
    },
  });

  try {
    const verificationLink = `http://10.141.3.196:3000/api/verify/${verificationToken}`;

    const emailTemplate = `
      <div>
        <h2>Mazdoor Finder - User Verification</h2>
        <p>Please click on the following link to verify your document:</p>
        <p><a href="${verificationLink}">${verificationLink}</a></p>
      </div>
    `;

    let info = await transporter.sendMail({
      from: '"Mazdoor Finder 👻" <admin@mazdoorfinder.com>',
      to: email,
      subject: "Verification Link and Form Data",
      text: "Please click on the following link to verify your document: " + verificationLink,
      html: emailTemplate,
    });

    return {
      success: true,
      message: "Verification link sent successfully.",
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send verification link and form data." };
  }
};

export default generateVerificationLink;


