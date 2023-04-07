import { TranslateBody } from '@/types/types';
import { OpenAIStream } from '@/utils';

export const config = {
  runtime: 'edge',
};

const handler = async (req: Request): Promise<Response> => {
  try {
    const { inputLanguage, outputLanguage, inputCode, model } =
      (await req.json()) as TranslateBody;

      const apiKey= process.env.OPENAI_API_KEY || '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'

    const stream = await OpenAIStream(
      inputLanguage,
      outputLanguage,
      inputCode,
      model,
      apiKey,
    );

    return new Response(stream);
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 500 });
  }
};

export default handler;
