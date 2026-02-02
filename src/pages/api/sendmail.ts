import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log("<<<<<<<<<<<<<<<<< sending email >>>>>>>>>>>>>>>>>>>>");
    const data = await request.formData();
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    if (!email || !name || !message) {
      return new Response(
        JSON.stringify({
          message: "Missing required fields",
        }),
        { status: 400 },
      );
    }

    const smtpServer = "smtp-relay.brevo.com";
    const smtpPort = 587;

    let transporter = nodemailer.createTransport({
      host: smtpServer,
      port: smtpPort,
      secure: false,
      auth: {
        user: import.meta.env.EMAIL,
        pass: import.meta.env.EMAIL_PASSWORD,
      },
    });

    // Verificar conexión
    // await transporter.verify();

    await transporter.sendMail({
      from: `"Armany's portfolio" <${import.meta.env.EMAIL_SENDER}>`,
      to: `${email}`,
      subject: "You contacted armany felix",
      text: `Hello ${name}, thank you for contact me! I will answer ASAP`,
      html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmación de Afiliación - Vanguardia Mexicana</title>
          <style>
          </style>
      </head>
      <body>

      </body>
      </html>
    `,
    });

    await transporter.sendMail({
      from: `"Mi portafolio" <${import.meta.env.EMAIL_SENDER}>`,
      to: `${import.meta.env.EMAIL_RECEIVER}`,
      subject: "Contact via portfolio",
      text: `${email}, me a contactado por el portafolio, con suerte no es otro hacker chino.`,
      html: `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Nueva Solicitud de Afiliación - Vanguardia Mexicana</title>
          <style>
          </style>
      </head>
      <body>
      </body>
      </html>
      `,
    });

    return new Response(
      JSON.stringify({
        error: false,
        message: "Email enviado exitosamente!",
      }),
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: true,
        message: `Error al enviar email`,
      }),
      { status: 500 },
    );
  }
};
