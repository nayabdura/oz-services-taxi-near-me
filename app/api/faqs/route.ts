import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { _id: '1', question: 'Are you available 24/7 in Florida?', answer: 'Yes! Our taxi services are operating 24 hours a day, 7 days a week across Orlando, Miami, Tampa, and surrounding areas.' },
    { _id: '2', question: 'Do you offer airport transfers?', answer: 'Absolutely. We provide reliable airport transfers to MCO, MIA, TPA, and others. We also offer free flight tracking to ensure we are there when you land.' },
    { _id: '3', question: 'How do you calculate fares?', answer: 'We offer a transparent pricing model. Fares consist of a base rate plus a per-mile charge. You can see an estimated cost before booking online.' },
    { _id: '4', question: 'Can I pay with a credit card?', answer: 'Yes, we accept all major credit cards, debit cards, and cash. Corporate accounts with monthly invoicing are also available.' },
  ]);
}
