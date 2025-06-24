import { getActions } from '@/lib/getActions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  if (!data || typeof data !== 'object') {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  if (!data.expenses || !Array.isArray(data.expenses)) {
    return NextResponse.json({ error: 'Expenses data is required and should be an array' }, { status: 400 });
  }

  if (data.expenses.length === 0) {
    return NextResponse.json({ error: 'No expenses found' }, { status: 400 });
  }

  const actions = getActions(data.expenses);

  // ...handle data, e.g., save to DB
  return NextResponse.json(actions);
}