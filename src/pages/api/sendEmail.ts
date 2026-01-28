import type { APIRoute } from "astro";
import nodemailer from "nodemailer";

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { email, fullName } = data;
    if (!email || !fullName) {
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
    // await transporter.verify()

    const messageConfirmation = {
      from: `"Vanguardia Mexicana" <${import.meta.env.EMAIL_SENDER}>`,
      to: email,
      subject: "Afiliación a Vanguardia Mexicana",
      text: `Hola ${fullName}, gracias por tu interés en afiliarte.`,
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
    };

    await transporter.sendMail(messageConfirmation);

    const messageWithData = {
      from: `"Vanguardia Mexicana" <${import.meta.env.EMAIL_SENDER}>`,
      to: import.meta.env.EMAIL_RECEIVER,
      subject: "Nueva Solicitud de Afiliación",
      text: `${email}, a mandado su información.`,
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
    };

    await transporter.sendMail(messageWithData);

    return new Response(
      JSON.stringify({
        error: false,
        message: "Email enviado exitosamente!",
      }),
      { status: 200 },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: true,
        message: `Error al enviar email`,
      }),
      { status: 500 },
    );
  }
};
