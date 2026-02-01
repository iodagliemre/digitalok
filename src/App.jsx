import { useState, useRef, useEffect, useCallback } from "react";

const SUPABASE_URL = "https://fxmqpqjrcccjbqlodrcp.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bXFwcWpyY2NjamJxbG9kcmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk5ODE2ODMsImV4cCI6MjA4NTU1NzY4M30.pUf2jynrksTbmi69Sbw4tHbFS4Q8BCOejZ7Fok5adJ0";

const sb = {
  async insert(table, data) {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        Prefer: "return=minimal"
      },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error(await r.text());
    return true;
  },
  async select(table, params = "") {
    const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${params}`, {
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`
      }
    });
    if (!r.ok) throw new Error(await r.text());
    return r.json();
  }
};

const DOCS = [
  {
    id: "kvkk", title: "KVKK Aydınlatma Metni ve Açık Rıza Onayı", icon: "🔒",
    content: `KİŞİSEL VERİLERİN KORUNMASI KANUNU (KVKK) AYDINLATMA METNİ VE AÇIK RIZA ONAYI\n\n1. VERİ SORUMLUSU\n[Firma Adı] ("Şirket") olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") kapsamında, kişisel verilerinizin güvenliğine azami hassasiyet göstermekteyiz.\n\n2. KİŞİSEL VERİLERİN İŞLENME AMACI\nKişisel verileriniz aşağıdaki amaçlarla işlenmektedir:\n• İş sağlığı ve güvenliği mevzuatından kaynaklanan yükümlülüklerin yerine getirilmesi\n• İşyeri hekimliği ve iş güvenliği uzmanlığı hizmetlerinin sunulması\n• Periyodik sağlık muayenelerinin planlanması ve takibi\n• Risk değerlendirmesi çalışmalarının yürütülmesi\n• İş kazası ve meslek hastalığı bildirimlerinin yapılması\n• Acil durum planlarının oluşturulması\n• İSG eğitimlerinin planlanması, verilmesi ve belgelendirilmesi\n• Yasal bildirim ve raporlama yükümlülüklerinin yerine getirilmesi\n\n3. KİŞİSEL VERİLERİN AKTARILMASI\nKişisel verileriniz, yukarıda belirtilen amaçlar doğrultusunda:\n• Sosyal Güvenlik Kurumu (SGK)\n• Çalışma ve Sosyal Güvenlik Bakanlığı\n• İSG-KATİP sistemi\n• Sağlık Bakanlığı\n• İlgili laboratuvar ve sağlık kuruluşları\nile paylaşılabilecektir.\n\n4. KİŞİSEL VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ\nKişisel verileriniz; elektronik ortamda veya fiziki olarak, iş sözleşmesi ve İSG mevzuatı kapsamındaki yasal yükümlülüklerin yerine getirilmesi hukuki sebebine dayalı olarak toplanmaktadır.\n\n5. VERİ SAHİBİNİN HAKLARI\nKVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme\n• İşlenmişse buna ilişkin bilgi talep etme\n• İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme\n• Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme\n• Eksik veya yanlış işlenmişse düzeltilmesini isteme\n• Kanun'un 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme\n\n6. AÇIK RIZA BEYANI\nYukarıda belirtilen amaçlar doğrultusunda kişisel verilerimin ve özel nitelikli kişisel verilerimin (sağlık verileri dahil) işlenmesine, saklanmasına ve ilgili kurum/kuruluşlarla paylaşılmasına açık rızam ile onay veriyorum.\n\nİşbu aydınlatma metni ve açık rıza beyanı, 6698 sayılı KVKK kapsamında tarafıma yapılan bilgilendirmeyi içermekte olup, metni okuduğumu, anladığımı ve kabul ettiğimi beyan ederim.`
  },
  {
    id: "yonerge", title: "İç Yönerge", icon: "📋",
    content: `İŞ SAĞLIĞI VE GÜVENLİĞİ İÇ YÖNERGESİ\n\nMADDE 1 – AMAÇ\nBu yönerge, işyerinde iş sağlığı ve güvenliğinin sağlanması ve mevcut sağlık ve güvenlik şartlarının iyileştirilmesi için işveren ve çalışanların görev, yetki, sorumluluk, hak ve yükümlülüklerini düzenlemek amacıyla hazırlanmıştır.\n\nMADDE 2 – KAPSAM\nBu yönerge, işyerinde çalışan tüm personeli, alt işveren çalışanlarını, stajyerleri, ziyaretçileri ve işyerinde bulunan tüm kişileri kapsar.\n\nMADDE 3 – YASAL DAYANAK\n6331 sayılı İş Sağlığı ve Güvenliği Kanunu ve ilgili yönetmelikler bu yönergenin yasal dayanağını oluşturur.\n\nMADDE 4 – İŞVERENİN YÜKÜMLÜLÜKLERİ\na) Çalışanların sağlık ve güvenliğini sağlamak için gerekli her türlü önlemi almak\nb) İş sağlığı ve güvenliği tedbirlerine uyulup uyulmadığını izlemek, denetlemek\nc) Risk değerlendirmesi yapmak veya yaptırmak\nd) Çalışana görev verirken, sağlık ve güvenlik yönünden işe uygunluğunu göz önüne almak\n\nMADDE 5 – ÇALIŞANLARIN YÜKÜMLÜLÜKLERİ\na) İSG ile ilgili aldıkları eğitim doğrultusunda hareket etmek\nb) Kendilerinin ve diğer çalışanların sağlık ve güvenliklerini tehlikeye düşürmemek\nc) KKD'leri doğru kullanmak ve korumak\nd) Makine ve ekipmanları kurallara uygun kullanmak\ne) Ciddi ve yakın tehlike durumunda derhal amirlerine bildirmek\n\nMADDE 6 – KİŞİSEL KORUYUCU DONANIM\na) KKD'ler amacına uygun kullanılacaktır\nb) Bakım ve temizlikten kullanıcı sorumludur\nc) Hasarlı KKD'ler derhal bildirilecektir\nd) KKD'siz çalışma kesinlikle yasaktır\n\nMADDE 7 – ACİL DURUM PROSEDÜRLERİ\na) Acil durum planı tüm çalışanlara duyurulmuştur\nb) Yılda en az bir kez tatbikat yapılacaktır\nc) Yangın söndürücü yerleri bilinmelidir\nd) Acil çıkış yolları açık tutulacaktır\n\nMADDE 8 – KAZA BİLDİRİMİ\na) Her iş kazası derhal bildirilecektir\nb) Ramak kala olaylar raporlanacaktır\nc) Kaza sonrası olay yeri korunacaktır\n\nMADDE 9 – EĞİTİM\na) Tüm çalışanlar İSG eğitimini alacaktır\nb) Periyodik olarak tekrarlanacaktır\nc) Katılım zorunludur\n\nMADDE 10 – YAPTIRIMLAR\nKurallara uymayanlar hakkında 6331 ve 4857 sayılı Kanunlar çerçevesinde disiplin işlemi uygulanabilir.\n\nİşbu yönerge çalışana tebliğ edilmiş olup, çalışan hükümlerini okuduğunu, anladığını ve uyacağını kabul eder.`
  },
  {
    id: "talimat", title: "Genel İSG Talimatı", icon: "⚠️",
    content: `GENEL İŞ SAĞLIĞI VE GÜVENLİĞİ TALİMATI\n\n1. GENEL KURALLAR\n1.1. İşyerine alkol veya uyuşturucu etkisi altında gelmek yasaktır.\n1.2. Kavga, şiddet ve tehdit yasaktır.\n1.3. Sigara yalnızca belirlenen alanlarda serbesttir.\n1.4. Çalışma alanları temiz tutulacaktır.\n1.5. Acil çıkış yolları açık tutulacaktır.\n\n2. KİŞİSEL KORUYUCU DONANIM\n2.1. KKD'ler mutlaka kullanılacaktır.\n2.2. KKD'siz çalışma yasaktır.\n2.3. Arızalı KKD derhal değiştirilecektir.\n\n3. MAKİNE GÜVENLİĞİ\n3.1. Yetkilendirilmemiş kişiler makine kullanamaz.\n3.2. Koruyucu tertibatlar çıkarılmayacaktır.\n3.3. Arızalı makine kullanılmayacaktır.\n3.4. LOTO prosedürü uygulanacaktır.\n\n4. YÜKSEKTE ÇALIŞMA\n4.1. 1.5m üzerinde düşme önlemi alınacaktır.\n4.2. İzinsiz yüksekte çalışılmayacaktır.\n4.3. İskele ve merdivenler kontrol edilecektir.\n4.4. Emniyet kemeri kullanılacaktır.\n\n5. ELEKTRİK GÜVENLİĞİ\n5.1. Sadece yetkili elektrikçiler müdahale edebilir.\n5.2. Hasarlı ekipman kullanılmayacaktır.\n5.3. Islak elle dokunulmayacaktır.\n\n6. KİMYASAL GÜVENLİK\n6.1. SDS'lere uygun kullanılacaktır.\n6.2. Etiketsiz kimyasal kullanılmayacaktır.\n6.3. Döküntüler derhal temizlenecektir.\n\n7. YANGIN GÜVENLİĞİ\n7.1. Açık alev kullanımı yasaktır.\n7.2. İzinsiz sıcak çalışma yapılmayacaktır.\n7.3. Yanıcı maddeler uygun depolanacaktır.\n\n8. KAZA BİLDİRİMİ\n8.1. Her kazayı derhal bildirin.\n8.2. İlk yardım ekibini arayın.\n8.3. Acil durumlarda 112'yi arayın.\n\nDİKKAT: Bu talimata uymayanlara yasal işlem uygulanacaktır.\n\nBu talimatı okudum, anladım ve uyacağımı taahhüt ediyorum.`
  }
];

const ADMIN_PASS = "osgb2026";

export default function App() {
  const [mode, setMode] = useState("home");
  const [step, setStep] = useState(0);
  const [workerInfo, setWorkerInfo] = useState({ ad: "", tc: "", firma: "" });
  const [approvals, setApproval] = useState({});
  const [scrolledBottom, setScrolledBottom] = useState({});
  const [records, setRecords] = useState([]);
  const [adminPass, setAdminPass] = useState("");
  const [adminAuth, setAdminAuth] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingRecords, setLoadingRecords] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const scrollRef = useRef(null);

  const loadRecords = async () => {
    setLoadingRecords(true);
    try {
      const data = await sb.select("onaylar", "order=created_at.desc");
      setRecords(data);
    } catch (e) { console.error(e); }
    setLoadingRecords(false);
  };

  const handleScroll = useCallback((docId) => {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < 30) {
      setScrolledBottom(p => ({ ...p, [docId]: true }));
    }
  }, []);

  useEffect(() => {
    if (step >= 1 && step <= 3) {
      setScrolledBottom(p => ({ ...p, [DOCS[step - 1].id]: false }));
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
      setTimeout(() => {
        const el = scrollRef.current;
        if (el && el.scrollHeight <= el.clientHeight + 30) {
          setScrolledBottom(p => ({ ...p, [DOCS[step - 1].id]: true }));
        }
      }, 100);
    }
  }, [step]);

  const handleSubmit = async () => {
    setSaving(true);
    setErrMsg("");
    try {
      await sb.insert("onaylar", {
        ad_soyad: workerInfo.ad,
        tc_kimlik: workerInfo.tc,
        firma: workerInfo.firma,
        kvkk_onay: !!approvals.kvkk,
        ic_yonerge_onay: !!approvals.yonerge,
        isg_talimat_onay: !!approvals.talimat,
        user_agent: navigator.userAgent
      });
      setStep(4);
    } catch (e) {
      setErrMsg("Hata: " + (e.message || "Bilinmeyen hata"));
      console.error(e);
    }
    setSaving(false);
  };

  const exportCSV = () => {
    if (records.length === 0) return;
    let csv = "\uFEFF";
    csv += "Ad Soyad;TC Kimlik No;Firma;Tarih;KVKK;İç Yönerge;İSG Talimatı\n";
    records.forEach(r => {
      const t = new Date(r.created_at).toLocaleString("tr-TR");
      csv += `${r.ad_soyad};${r.tc_kimlik};${r.firma};${t};${r.kvkk_onay ? "EVET" : "HAYIR"};${r.ic_yonerge_onay ? "EVET" : "HAYIR"};${r.isg_talimat_onay ? "EVET" : "HAYIR"}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `ISG_Onay_Kayitlari_${new Date().toLocaleDateString("tr-TR").replace(/\./g, "_")}.csv`;
    a.click();
  };

  if (mode === "home") return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🛡️</div>
          <h1 className="text-3xl font-bold text-white mb-2">İSG Evrak Onay Sistemi</h1>
          <p className="text-blue-200">Dijital evrak okuma ve onay platformu</p>
        </div>
        <div className="space-y-4">
          <button onClick={() => { setMode("worker"); setStep(0); setWorkerInfo({ ad: "", tc: "", firma: "" }); setApproval({}); setScrolledBottom({}); setErrMsg(""); }}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg">
            👷 Çalışan Girişi
          </button>
          <button onClick={() => { setMode("admin"); setAdminAuth(false); setAdminPass(""); }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 rounded-xl text-lg font-semibold transition-colors shadow-lg">
            🔐 Yönetim Paneli
          </button>
        </div>
      </div>
    </div>
  );

  if (mode === "worker") {
    if (step === 0) return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-md mx-auto">
          <button onClick={() => setMode("home")} className="text-blue-600 mb-4 text-sm">← Ana Sayfa</button>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="text-center mb-6">
              <div className="text-4xl mb-2">👷</div>
              <h2 className="text-xl font-bold text-gray-800">Çalışan Bilgileri</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                <input type="text" value={workerInfo.ad} onChange={e => setWorkerInfo(p => ({ ...p, ad: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Adınız Soyadınız" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">TC Kimlik No *</label>
                <input type="text" maxLength={11} value={workerInfo.tc} onChange={e => setWorkerInfo(p => ({ ...p, tc: e.target.value.replace(/\D/g, "").slice(0, 11) }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="11 haneli TC No" inputMode="numeric" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Firma Adı *</label>
                <input type="text" value={workerInfo.firma} onChange={e => setWorkerInfo(p => ({ ...p, firma: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg outline-none focus:ring-2 focus:ring-blue-500" placeholder="Çalıştığınız firma" />
              </div>
            </div>
            <button onClick={() => setStep(1)}
              disabled={!workerInfo.ad.trim() || workerInfo.tc.length !== 11 || !workerInfo.firma.trim()}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors text-lg">
              Devam Et →
            </button>
          </div>
        </div>
      </div>
    );

    if (step === 4) return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-green-700 mb-2">Onayınız Kaydedildi!</h2>
          <p className="text-gray-600 mb-4">Tüm evrakları okuduğunuz ve onayladığınız kayıt altına alınmıştır.</p>
          <div className="bg-green-50 rounded-lg p-4 text-left text-sm space-y-1 mb-6">
            <div><span className="text-gray-500">Ad Soyad:</span> <strong>{workerInfo.ad}</strong></div>
            <div><span className="text-gray-500">TC:</span> <strong>{workerInfo.tc}</strong></div>
            <div><span className="text-gray-500">Firma:</span> <strong>{workerInfo.firma}</strong></div>
            <div><span className="text-gray-500">Tarih:</span> <strong>{new Date().toLocaleString("tr-TR")}</strong></div>
          </div>
          <button onClick={() => setMode("home")} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold">
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );

    const docIdx = step - 1;
    const doc = DOCS[docIdx];
    const canApprove = scrolledBottom[doc.id];
    const isApproved = approvals[doc.id];

    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="bg-white shadow-sm px-4 py-3">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Evrak {step}/3</span>
              <span className="text-sm font-medium text-blue-600">{doc.title}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>
        </div>
        <div className="flex-1 max-w-lg mx-auto w-full p-4 flex flex-col">
          <div className="bg-white rounded-xl shadow-lg flex-1 flex flex-col overflow-hidden">
            <div className="bg-blue-50 px-4 py-3 border-b">
              <h3 className="font-bold text-gray-800">{doc.icon} {doc.title}</h3>
              {!canApprove && <p className="text-xs text-orange-600 mt-1">⬇️ Lütfen metnin tamamını okuyun — aşağı kaydırın</p>}
            </div>
            <div ref={scrollRef} onScroll={() => handleScroll(doc.id)}
              className="flex-1 overflow-y-auto p-4 text-sm text-gray-700 leading-relaxed"
              style={{ maxHeight: "45vh", whiteSpace: "pre-wrap" }}>
              {doc.content}
            </div>
            <div className="border-t p-4">
              {canApprove ? (
                <div>
                  <label className="flex items-start gap-3 cursor-pointer mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <input type="checkbox" checked={!!isApproved} onChange={e => setApproval(p => ({ ...p, [doc.id]: e.target.checked }))}
                      className="mt-1 w-5 h-5" />
                    <span className="text-sm font-medium text-gray-800">Yukarıdaki metni okudum, anladım ve kabul ediyorum.</span>
                  </label>
                  {errMsg && <p className="text-red-600 text-sm mb-2">{errMsg}</p>}
                  {step < 3 ? (
                    <button onClick={() => setStep(step + 1)} disabled={!isApproved}
                      className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold">
                      Sonraki Evrak →
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={!isApproved || saving}
                      className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold">
                      {saving ? "Kaydediliyor..." : "✅ Tümünü Onayla ve Gönder"}
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-2 text-gray-400 text-sm">⬇️ Metnin sonuna kadar kaydırın</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "admin") {
    if (!adminAuth) return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8">
          <button onClick={() => setMode("home")} className="text-blue-600 mb-4 text-sm">← Ana Sayfa</button>
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">🔐</div>
            <h2 className="text-xl font-bold">Yönetim Paneli</h2>
          </div>
          <input type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && adminPass === ADMIN_PASS) { setAdminAuth(true); loadRecords(); } }}
            className="w-full border rounded-lg px-4 py-3 mb-4 outline-none focus:ring-2 focus:ring-blue-500" placeholder="Şifre" />
          <button onClick={() => { if (adminPass === ADMIN_PASS) { setAdminAuth(true); loadRecords(); } else alert("Yanlış şifre!"); }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-semibold">Giriş</button>
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <button onClick={() => setMode("home")} className="text-blue-600 text-sm">← Ana Sayfa</button>
              <h1 className="text-2xl font-bold text-gray-800 mt-1">📊 Onay Kayıtları</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={loadRecords} className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium">🔄 Yenile</button>
              <button onClick={exportCSV} disabled={records.length === 0}
                className="bg-green-600 hover:bg-green-500 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg text-sm font-medium">📥 Excel İndir</button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-3xl font-bold text-blue-700">{records.length}</div>
              <div className="text-sm text-gray-500">Toplam Kayıt</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-3xl font-bold text-green-700">{records.filter(r => r.kvkk_onay && r.ic_yonerge_onay && r.isg_talimat_onay).length}</div>
              <div className="text-sm text-gray-500">Tam Onay</div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 text-center">
              <div className="text-3xl font-bold text-purple-700">{new Set(records.map(r => r.firma)).size}</div>
              <div className="text-sm text-gray-500">Farklı Firma</div>
            </div>
          </div>
          {loadingRecords ? (
            <div className="bg-white rounded-xl shadow p-12 text-center text-gray-400">Yükleniyor...</div>
          ) : records.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-12 text-center text-gray-400">
              <div className="text-5xl mb-4">📋</div>
              <p>Henüz kayıt bulunmuyor</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left">
                      <th className="p-3">#</th>
                      <th className="p-3">Ad Soyad</th>
                      <th className="p-3">TC Kimlik</th>
                      <th className="p-3">Firma</th>
                      <th className="p-3">Tarih</th>
                      <th className="p-3 text-center">KVKK</th>
                      <th className="p-3 text-center">Yönerge</th>
                      <th className="p-3 text-center">Talimat</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r, i) => (
                      <tr key={r.id} className="border-t hover:bg-gray-50">
                        <td className="p-3 text-gray-400">{i + 1}</td>
                        <td className="p-3 font-medium">{r.ad_soyad}</td>
                        <td className="p-3 text-gray-600">{r.tc_kimlik}</td>
                        <td className="p-3">{r.firma}</td>
                        <td className="p-3 text-gray-500 text-xs">{new Date(r.created_at).toLocaleString("tr-TR")}</td>
                        <td className="p-3 text-center">{r.kvkk_onay ? "✅" : "❌"}</td>
                        <td className="p-3 text-center">{r.ic_yonerge_onay ? "✅" : "❌"}</td>
                        <td className="p-3 text-center">{r.isg_talimat_onay ? "✅" : "❌"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
