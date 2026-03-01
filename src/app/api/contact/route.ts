import { NextResponse } from 'next/server';
import { contactSchema } from '@/lib/schemas/contact';
import { sendContactEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate with Zod
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 },
      );
    }

    // Honeypot check
    if (result.data.honeypot) {
      // Silently accept to not tip off bots
      return NextResponse.json({ success: true });
    }

    // Send email
    await sendContactEmail({
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone,
      climbingLevel: result.data.climbingLevel,
      goals: result.data.goals,
      preferredDays: result.data.preferredDays,
      message: result.data.message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
