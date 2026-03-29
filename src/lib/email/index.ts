import { siteConfig } from '@/content/site';

export interface EmailPayload {
  name: string;
  email: string;
  phone?: string;
  climbingLevel: string;
  goals: string;
  preferredDays: string[];
  message: string;
}

export async function sendContactEmail(payload: EmailPayload): Promise<{ success: boolean }> {
  // In production, integrate with Resend, SendGrid, etc.
  // Example with Resend (uncomment and add RESEND_API_KEY to env):
  //
  // const { Resend } = await import('resend');
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send({
  //   from: 'noreply@yourdomain.com',
  //   to: siteConfig.coachEmail,
  //   subject: `New coaching inquiry from ${payload.name}`,
  //   text: formatEmail(payload),
  // });

  // Dev fallback: log full submission to console
  if (process.env.NODE_ENV === 'development') {
    console.log('───────────────────────────────────');
    console.log('📧 New Contact Form Submission');
    console.log('───────────────────────────────────');
    console.log(`Name: ${payload.name}`);
    console.log(`Email: ${payload.email}`);
    console.log(`Phone: ${payload.phone || 'Not provided'}`);
    console.log(`Climbing Level: ${payload.climbingLevel}`);
    console.log(`Goals: ${payload.goals}`);
    console.log(`Preferred Days: ${payload.preferredDays.join(', ')}`);
    console.log(`Message: ${payload.message}`);
    console.log(`Would be sent to: ${siteConfig.coachEmail}`);
    console.log('───────────────────────────────────');
    return { success: true };
  }

  // Production: no email provider configured — report failure so the user sees an error
  console.error('Email provider not configured — inquiry was not delivered');
  return { success: false };
}
