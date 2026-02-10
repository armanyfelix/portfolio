import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const email = data.email;
		const name = data.name;
		const message = data.message;

		if (!email || !name || !message) {
			return new Response(
				JSON.stringify({
					message: "Missing required fields",
				}),
				{ status: 400 },
			);
		}

		const userEmailResponse = await fetch(
			"https://api.brevo.com/v3/smtp/email",
			{
				method: "POST",
				headers: {
					accept: "application/json",
					"api-key": import.meta.env.BREVO_API_KEY,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					sender: {
						name: "Armany's Portfolio",
						email: import.meta.env.EMAIL_SENDER || "noreply@armanyfelix.dev",
					},
					to: [
						{
							email: email,
							name: name,
						},
					],
					subject: "Thank you for contacting me!",
					textContent: `Hello ${name},\n\nThank you for reaching out! I have received your message and will get back to you as soon as possible.\n\nBest regards,\nArmany Felix`,
					htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2>Hello ${name},</h2>
            <p>Thank you for reaching out! I have received your message and will get back to you as soon as possible.</p>
            <p>Best regards,<br><strong>Armany Felix</strong></p>
            <hr style="margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              This is an automated message from <a href="https://armanyfelix.dev">armanyfelix.dev</a>
            </p>
          </div>
        `,
				}),
			},
		);

		const userResult = await userEmailResponse.json();
		// console.log(
		//   "📧 Brevo User Response:",
		//   userEmailResponse.status,
		//   userResult,
		// );

		if (!userEmailResponse.ok) {
			throw new Error(`Brevo API Error: ${JSON.stringify(userResult)}`);
		}

		// console.log("📤 Enviando email de notificación...");

		const notificationResponse = await fetch(
			"https://api.brevo.com/v3/smtp/email",
			{
				method: "POST",
				headers: {
					accept: "application/json",
					"api-key": import.meta.env.BREVO_API_KEY,
					"content-type": "application/json",
				},
				body: JSON.stringify({
					sender: {
						name: "Portfolio Contact Form",
						email: import.meta.env.EMAIL_SENDER || "noreply@armanyfelix.dev",
					},
					to: [
						{
							email: import.meta.env.EMAIL_RECEIVER || "armanyfelix@proton.me",
							name: "Armany",
						},
					],
					subject: `New contact from portfolio: ${name}`,
					textContent: `
              New contact from portfolio:

              Name: ${name}
              Email: ${email}
              Message: ${message}

              Timestamp: ${new Date().toISOString()}
              URL: https://armanyfelix.dev
            `,
					htmlContent: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>New contact from portfolio</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">
                      <a href="mailto:${email}">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Message:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${message}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px; border: 1px solid #ddd;"><strong>Timestamp:</strong></td>
                    <td style="padding: 10px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
                <hr style="margin: 30px 0;">
                <p style="font-size: 12px; color: #666;">
                  Sent from <a href="https://armanyfelix.dev">armanyfelix.dev</a>
                </p>=
              </div>
            `,
				}),
			},
		);

		const notificationResult = await notificationResponse.json();
		// console.log(
		//   "📧 Brevo Notification Response:",
		//   notificationResponse.status,
		//   notificationResult,
		// );

		if (!notificationResponse.ok) {
			console.warn(
				"⚠️ Notification email failed, but user email was sent:",
				notificationResult,
			);
		}

		// console.log("✅ Emails enviados exitosamente");

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
