import { useState } from "react";
import { Check, Loader2, MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { waLink } from "@/lib/contact";

const BENEFITS = [
  "Divulgação no site da Kria AI",
  "Leads qualificados encaminhados direto para você",
  "Conexão com agências e clientes da nossa rede",
];

export default function Clube() {
  const [form, setForm] = useState({
    nome: "",
    area: "",
    cidade: "",
    whatsapp: "",
    email: "",
    portfolio: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const valid =
    form.nome.trim().length >= 2 &&
    form.area.trim().length >= 2 &&
    form.whatsapp.trim().length >= 8 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid || sending) return;
    setSending(true);
    try {
      const res = await fetch("https://formspree.io/f/xkoabjow", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Clube Kria — novo interessado: ${form.nome}`,
          _replyto: form.email,
          tipo: "clube",
          ...form,
        }),
      });
      if (!res.ok) throw new Error("falha");
      setDone(true);
    } catch {
      toast.error("Não foi possível enviar. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const whatsMsg =
    "Olá! Tenho interesse em participar do Clube Kria como prestador/agência.";

  return (
    <section id="clube" className="px-6 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">
            Clube Kria
          </div>
          <h2 className="mt-4 text-3xl font-black tracking-tight md:text-4xl">
            Para prestadores e agências
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Filmmakers, fotógrafos, editores, designers e agências: faça parte da rede
            que a Kria AI indica todos os dias.
          </p>

          <ul className="mt-6 space-y-3">
            {BENEFITS.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-gradient-to-br from-primary to-primary-deep px-5 py-3 text-white">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/70">
              A partir de
            </div>
            <div className="text-2xl font-black">R$ 50<span className="text-sm font-bold text-white/80">/mês</span></div>
          </div>
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5 md:p-8">
          {done ? (
            <div className="py-10 text-center">
              <div className="mx-auto inline-flex items-center justify-center rounded-full bg-success p-4 text-success-foreground">
                <Check className="h-8 w-8" strokeWidth={3} />
              </div>
              <h3 className="mt-4 text-xl font-black">Recebido!</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                A Kria vai te chamar no WhatsApp em breve.
              </p>
              <a
                href={waLink(whatsMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-emerald-600"
              >
                <MessageCircle className="h-4 w-4" /> Abrir WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <h3 className="text-lg font-black">Quero entrar no Clube</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="c-nome">Nome</Label>
                  <Input id="c-nome" value={form.nome} onChange={onChange("nome")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-area">Área</Label>
                  <Input id="c-area" placeholder="Filmmaker, fotógrafo..." value={form.area} onChange={onChange("area")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-cidade">Cidade</Label>
                  <Input id="c-cidade" value={form.cidade} onChange={onChange("cidade")} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-whatsapp">WhatsApp</Label>
                  <Input id="c-whatsapp" placeholder="(91) 99999-9999" value={form.whatsapp} onChange={onChange("whatsapp")} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="c-email">E-mail</Label>
                  <Input id="c-email" type="email" value={form.email} onChange={onChange("email")} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="c-port">Portfólio (opcional)</Label>
                  <Input id="c-port" placeholder="Link do Instagram, Behance..." value={form.portfolio} onChange={onChange("portfolio")} className="mt-1.5" />
                </div>
              </div>

              <Button
                type="submit"
                disabled={!valid || sending}
                size="lg"
                className="w-full gap-2 rounded-full bg-accent font-bold text-accent-foreground hover:bg-accent/90"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {sending ? "Enviando..." : "Quero participar"}
              </Button>

              <a
                href={waLink(whatsMsg)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:underline"
              >
                <MessageCircle className="h-4 w-4" /> Prefiro falar no WhatsApp
              </a>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
