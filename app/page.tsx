"use client"; // Bu satır sayfanın kullanıcıyla etkileşime gireceğini belirtir
import { useState } from "react";

export default function Home() {
  // Kullanıcının girdilerini ve AI'ın cevabını hafızada tutmak için "state" kullanıyoruz
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Resmi ve Kurumsal");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Butona basıldığında çalışacak fonksiyon
  const handleGenerate = async () => {
    if (!text) return alert("Lütfen önce bir metin yazın!");
    
    setLoading(true); // Yükleniyor animasyonunu başlat
    setResult(""); // Eski cevabı temizle

    try {
      // Arka plandaki köprümüze (API) verileri gönderiyoruz
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, tone }),
      });

      const data = await response.json();
      
      if (data.result) {
        setResult(data.result); // Gelen cevabı ekrana yazdır
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      alert("Bağlantı hatası!");
    } finally {
      setLoading(false); // Yükleniyor animasyonunu bitir
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
      <h1 className="text-4xl font-bold text-blue-600 mb-2">MailSihirbazı 🪄</h1>
      <p className="text-gray-600 mb-8">Kaba taslağını yaz, profesyonel bir e-postaya dönüşsün.</p>

      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        
        <label className="block text-gray-700 font-semibold mb-2">Ne söylemek istiyorsun?</label>
        <textarea
          className="w-full p-3 border border-gray-300 rounded mb-4 h-32 text-black"
          placeholder="Örn: Patron maaşıma zam yap, çok çalışıyorum..."
          value={text}
          onChange={(e) => setText(e.target.value)} // Klavyeden girilen yazıyı kaydet
        ></textarea>

        <label className="block text-gray-700 font-semibold mb-2">Mailin Tonu Nasıl Olsun?</label>
        <select 
          className="w-full p-3 border border-gray-300 rounded mb-6 text-black"
          value={tone}
          onChange={(e) => setTone(e.target.value)} // Seçilen tonu kaydet
        >
          <option>Resmi ve Kurumsal</option>
          <option>Arkadaşça ve Samimi</option>
          <option>Özür Dileyen ve Kibar</option>
          <option>Sert ve Net</option>
        </select>

        <button 
          onClick={handleGenerate} 
          disabled={loading} // Yüklenirken butona basılmasını engelle
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "Sihir Yapılıyor... ✨" : "Profesyonelleştir ✨"}
        </button>
        
        {/* Eğer yapay zekadan bir sonuç geldiyse bu kutuyu göster */}
        {result && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded">
            <h3 className="text-green-800 font-bold mb-2">✨ Sonuç:</h3>
            <p className="text-gray-800 whitespace-pre-wrap">{result}</p>
          </div>
        )}
        
      </div>
    </div>
  );
}