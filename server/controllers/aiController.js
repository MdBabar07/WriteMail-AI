const axios = require('axios');
const EmailHistory = require('../models/EmailHistory');

exports.generateEmail = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    if (typeof prompt !== 'string') {
      return res.status(400).json({ message: 'Prompt must be a string' });
    }

    if (prompt.trim().length === 0) {
      return res.status(400).json({ message: 'Prompt cannot be empty' });
    }

    if (prompt.length > 2000) {
      return res.status(400).json({ message: 'Prompt cannot exceed 2000 characters' });
    }

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return res.status(500).json({ message: 'AI service is not configured' });
    }

    const systemPrompt = `You are an expert email-writing assistant.

Your job is to write the ACTUAL email the user is asking for — whatever type it is. Do not assume it is a job-outreach or sales email unless the user's request clearly is one.

====================================================
STEP 1 — IDENTIFY THE REAL INTENT
====================================================

Read the user's request and figure out what kind of email this actually is. Examples:
- A leave request to a manager/HR
- A resignation letter
- A cold outreach / sales email to a prospect or recruiter
- A follow-up on an existing conversation
- A complaint or refund request
- A thank-you or apology note
- Anything else the user describes

Match the tone, length, and structure to THAT intent. A leave request is short, polite, and factual — it is not a sales pitch and should not invent scaling challenges, metrics, or a candidate pitch. A cold outreach email can be more persuasive and detailed, per the rules below.

====================================================
STEP 2 — WRITE IT
====================================================

- If the user gives very little detail, make reasonable, realistic assumptions that fit the intent (e.g. a leave request needs plausible dates/reason; do not invent unrelated context).
- Do not ask clarifying questions — just write the email.
- Keep it natural, not robotic or generic.

====================================================
OUTPUT FORMAT (STRICT)
====================================================

Return ONLY valid JSON, no markdown, no explanations:

{
  "subject": "",
  "emailBody": "",
  "linkedInDM": "",
  "followUpEmail": ""
}

- "subject" and "emailBody" are always required and must match the email the user actually asked for.
- "linkedInDM" and "followUpEmail" are ONLY for cold-outreach / sales / recruiting requests, where a LinkedIn message and a follow-up naturally make sense as part of an outreach sequence.
- If the user's request is NOT an outreach/sales email (e.g. a leave request, resignation, internal note, complaint), return "linkedInDM": "" and "followUpEmail": "" — do not invent them.

====================================================
IF THE REQUEST IS COLD OUTREACH / JOB OUTREACH
====================================================

Only in that case, follow these additional guidelines:

Assume (only if relevant and no better info given):
- Candidate has 2+ years experience
- Strong in relevant technical/professional skills for the role mentioned
- Has contributed to real, production-level work

Subject line: 6–9 words, confident, specific — avoid generic phrases like "Quick question" or "Job application".

Email body: 60–90 words, structured as: personalized observation → relevant challenge → candidate's experience/strengths → specific impact → clear CTA → sign-off. Confident and professional, no hype, no emojis.

LinkedIn DM: 30–50 words, conversational — observation + value + soft ask.

Follow-up email: 50–80 words, a new angle, professional urgency, clear CTA.

Return ONLY valid JSON.`;

    const fullPrompt = `${systemPrompt}\n\nUser's actual request: "${prompt.trim()}"\n\nWrite the real email for this request, following the rules above. Return ONLY valid JSON:\n{"subject": "...", "emailBody": "...", "linkedInDM": "...", "followUpEmail": "..."}`;

    const aiResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: "openai/gpt-oss-120b",
        messages: [
          {
            role: "user",
            content: fullPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        reasoning_effort: "low",
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    if (!aiResponse.data.choices || !aiResponse.data.choices[0] || !aiResponse.data.choices[0].message) {
      throw new Error('Invalid response from Groq API');
    }

    const generatedText = aiResponse.data.choices[0].message.content;

    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    let parsedResponse;

    try {
      parsedResponse = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(generatedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Generated text:', generatedText);
      return res.status(500).json({
        message: 'Failed to parse AI response',
        error: 'The AI generated invalid JSON. Please try again.'
      });
    }

    const emailData = {
      subject: parsedResponse.subject || "New Email",
      emailBody: parsedResponse.emailBody || "",
      linkedInDM: parsedResponse.linkedInDM || "",
      followUpEmail: parsedResponse.followUpEmail || ""
    };

    if (!emailData.subject || !emailData.emailBody) {
      return res.status(500).json({
        message: 'AI generated incomplete email data. Please try again.'
      });
    }

    const historyEntry = await EmailHistory.create({
      userId: req.user._id,
      prompt: prompt.trim(),
      subject: emailData.subject,
      emailBody: emailData.emailBody,
      linkedInDM: emailData.linkedInDM,
      followUpEmail: emailData.followUpEmail
    });

    res.status(200).json(historyEntry);
  } catch (error) {
    console.error('AI Generation Error:', error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res.status(429).json({
        message: 'Too many requests. Please wait a moment before trying again.',
        error: 'Rate limit exceeded'
      });
    }

    res.status(500).json({
      message: 'Failed to generate email',
      error: error.response?.data?.error?.message || error.message
    });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await EmailHistory.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch history' });
  }
};