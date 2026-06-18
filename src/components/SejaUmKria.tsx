import { useState } from "react";
import { Sparkles, Send, CheckCircle2 } from "lucide-react";
import { sendToFormspree } from "@/lib/contact";

const ATENDE = ["Sim", "Não", "Começando"];
const DEMANDAS = ["Sim", "Talvez", "Não"];

export default function SejaUmKria() {
  const [form, setForm] = useState({
    nome: "",
    whatsapp: "",
    instagram: "",
    cidade: "",
    areaAtuacao: "",
    portfolio: "",
    servicos: "",
    atendeClientes: "",
    desejaDemandas: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [ok, setOk] = useState(false);

  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valido =
    form.nome.trim().length >= 2 &&
    form.whatsapp.trim().length >= 8 &&
    form.cidade.trim().length >= 2 &&
    form.areaAtuacao.trim().length >= 2 &&
    !!form.atendeClientes &&
    !!form.desejaDemandas;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valido) return;
    setEnviando(true);
    await sendToFormspree({
      _subject: `🤝 Cadastro Rede de Krias — ${form.nome}`,
      origem: "Cadastro Rede de Krias",
      data_envio: new Date().toLocaleString("pt-BR", { timeZone: "America/Belem" }),
      ...form,
    });
    setEnviando(false);
    setOk(true);
  };

  return (
    <section id="seja-kria" className="bg-[#0A0414] px-5 py-20 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#A855F7]/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#C9A6FF]">
            <Sparkles className="h-3 w-3" /> Rede de Krias
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white md:text-4xl">
            Você cria, edita, grava, desenha ou vende{" "}
            <span className="text-[#FF6A2C]">soluções digitais</span>?
          </h2>
          <p className="mt-3 text-[#B8AFC8] md:text-lg">
            Faça parte da rede Kria e receba oportunidades alinhadas ao seu serviço.
          </p>
        </div>

        {ok ? (
          <div className="mt-10 rounded-3xl border border-emerald-400/30 bg-emerald-400/[0.06] p-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
            <h3 className="mt-3 text-xl font-bold text-white">Cadastro recebido!</h3>
            <p className="mt-2 text-sm text-[#B8AFC8]">
              A Kria vai entrar em contato quando aparecer uma demanda alinhada ao
              seu perfil.
            </p>
          </div>
        ) : (
          <form
            onSubmit={submit}
            className="mt-10 grid gap-4 rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md md:p-8"
          >
            <FormField label="Nome">
              <input value={form.nome} onChange={(e) => set("nome", e.target.value)} className={inputCls} />
            </FormField>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="WhatsApp">
                <input value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} placeholder="(91) 99999-9999" className={inputCls} />
              </FormField>
              <FormField label="Instagram">
                <input value={form.instagram} onChange={(e) => set("instagram", e.target.value)} placeholder="@seu_perfil" className={inputCls} />
              </FormField>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Cidade">
                <input value={form.cidade} onChange={(e) => set("cidade", e.target.value)} className={inputCls} />
              </FormField>
              <FormField label="Área de atuação">
                <input value={form.areaAtuacao} onChange={(e) => set("areaAtuacao", e.target.value)} placeholder="Edição, design, social, fotografia..." className={inputCls} />
              </FormField>
            </div>
            <FormField label="Portfólio (link)">
              <input value={form.portfolio} onChange={(e) => set("portfolio", e.target.value)} placeholder="Instagram, Behance, site..." className={inputCls} />
            </FormField>
            <FormField label="Serviços que oferece">
              <textarea value={form.servicos} onChange={(e) => set("servicos", e.target.value)} rows={3} className={inputCls} />
            </FormField>

            <FormField label="Você atende clientes hoje?">
              <Pills value={form.atendeClientes} options={ATENDE} onSelect={(v) => set("atendeClientes", v)} />
            </FormField>
            <FormField label="Deseja receber demandas?">
              <Pills value={form.desejaDemandas} options={DEMANDAS} onSelect={(v) => set("desejaDemandas", v)} />
            </FormField>

            <button
              type="submit"
              disabled={!valido || enviando}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#FF6A2C] px-6 text-sm font-bold text-white transition hover:bg-[#FF8A3D] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
              {enviando ? "Enviando..." : "Quero fazer parte da rede"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-[#07030F]/60 px-3 py-3 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-[#FF6A2C] focus:ring-2 focus:ring-[#FF6A2C]/20";

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-[#B8AFC8]">{label}</span>
      {children}
    </label>
  );
}

function Pills({ value, options, onSelect }: { value: string; options: string[]; onSelect: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onSelect(o)}
          className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
            value === o
              ? "border-[#FF6A2C] bg-[#FF6A2C] text-white"
              : "border-white/15 bg-white/[0.03] text-white/85 hover:bg-white/[0.08]"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}
