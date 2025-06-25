import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import * as z from "zod"

const resend = new Resend(process.env.RESEND_API_KEY)

const sendEmailSchema = z.object({
  firstName: z.string().min(1, "First name is required."),
  lastName: z.string().min(1, "Last name is required."),
  email: z.string().email(),
  projectType: z.string().min(1, "Project type is required."),
  details: z.string().min(1, "Project details are required."),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, projectType, details } = sendEmailSchema.parse(body)

    const data = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>", // This will be the sender address seen by the recipient.
      to: ["wsamatis@gmail.com"],
      subject: `New Project Inquiry from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h1>New Project Inquiry</h1>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Details:</strong></p>
        <p>${details}</p>
      `,
    })

    return NextResponse.json({ message: "Email sent successfully!", data }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: "Validation error", errors: error.errors }, { status: 400 })
    }
    console.error("Error sending email:", error)
    return NextResponse.json({ message: "Error sending email", error }, { status: 500 })
  }
} 