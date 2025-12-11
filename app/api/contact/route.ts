import { NextRequest, NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    console.log('API route called')
    const body = await request.json()
    console.log('Request body:', body)
    
    const { name, email, company, service, message } = body

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    console.log('Creating transporter...')
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'madevisionstudios@gmail.com',
        pass: 'bobeakoocytzmuna'
      }
    })

    console.log('Verifying transporter...')
    await transporter.verify()
    console.log('Transporter verified successfully')

    const mailOptions = {
      from: 'madevisionstudios@gmail.com',
      to: 'madevisionstudios@gmail.com',
      subject: `Contact Form: ${service || 'General Inquiry'}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Service:</strong> ${service || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    }

    console.log('Sending email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    
    return NextResponse.json({ success: true, messageId: result.messageId })
  } catch (error: any) {
    console.error('Detailed email error:', {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
      stack: error.stack
    })
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error.message 
    }, { status: 500 })
  }
}