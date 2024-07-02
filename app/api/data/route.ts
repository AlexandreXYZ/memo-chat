import { Database } from '@/app/types';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'app', 'data.json');

export async function GET(req: Request) {
  try {
    const data = (JSON.parse(fs.readFileSync(filePath, 'utf8')) as Database)?.data;

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error reading data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return console.error('Cannot read file:', err);

      const database = JSON.parse(data) as Database;
      const dataExist = database?.data?.length > 0;

      dataExist
        ? fs.writeFileSync(filePath, JSON.stringify({ data: [...database.data, body] }))
        : fs.writeFileSync(filePath, JSON.stringify({ data: [body] }))
    })

    return new Response(JSON.stringify({ message: 'Data updated successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error updating data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

export async function DELETE(req: Request) {
  try {
    const id = await req.json();
    console.log(id)

    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) return console.error('Cannot read file:', err);

      const database = JSON.parse(data) as Database;

      const currentData = database?.data?.filter(data => data.id !== id);

      fs.writeFileSync(filePath, JSON.stringify({ data: [...currentData] }))
    })

    return new Response(null, {
      status: 204,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ message: 'Error deleting data', error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}