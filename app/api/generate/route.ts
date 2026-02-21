import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Şifremizi kullanarak Gemini'yi hazırlıyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    // Ön yüzden gelen metni ve seçilen tonu alıyoruz
    const body = await req.json();
    const { text, tone } = body;

    // Senin hesabına özel, en hızlı ve yeni modeli seçtik! 🚀
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // Yapay zekaya vereceğimiz komut (Prompt)
    const prompt = `Sen uzman bir iletişim asistanısın. Aşağıdaki kaba taslak metni al ve '${tone}' bir dille profesyonel bir e-postaya çevir. Sadece e-posta içeriğini yaz, ekstra açıklama veya yorum yapma.\n\nTaslak Metin: "${text}"`;

    // Gemini'ye soruyu soruyoruz ve cevabı bekliyoruz
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Cevabı ön yüze geri gönderiyoruz
    return NextResponse.json({ result: responseText });
    
  } catch (error) {
    console.error("API Hatası:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}