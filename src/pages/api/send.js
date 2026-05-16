import { Resend } from 'resend';

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST = async ({ request }) => {
	try {
		const body = await request.json();
		const { email, message } = body;

		if (!email || !message) {
			return new Response(JSON.stringify({ error: 'Brak danych' }), { status: 400 });
		}

		const data = await resend.emails.send({
			from: 'Portfolio <onboarding@resend.dev>',
			to: ['krzysztofskuratowicz@gmail.com'],
			subject: `Nowa wiadomość od: ${email}`,
			text: message,
			reply_to: email
		});

		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		return new Response(JSON.stringify({ error: 'Błąd serwera' }), { status: 500 });
	}
};