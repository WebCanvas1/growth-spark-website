import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { AlertCircle, CheckCircle2, Download, Loader2 } from "lucide-react";

type Status = "checking" | "paid" | "error";

const HandoverSuccess = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<Status>("checking");
  const [downloadUrl, setDownloadUrl] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!slug || !sessionId) {
        setStatus("error");
        setMessage("The payment session could not be identified.");
        return;
      }

      try {
        const response = await fetch(
          `/api/handover/${encodeURIComponent(slug)}/verify?session_id=${encodeURIComponent(sessionId)}`,
          { headers: { Accept: "application/json" } },
        );
        const data = await response.json();

        if (!response.ok) throw new Error(data?.error || "Unable to verify payment.");

        if (data?.paid && data?.download_url) {
          setDownloadUrl(data.download_url);
          setStatus("paid");
        } else {
          setStatus("error");
          setMessage("Your payment has not been confirmed yet. Please try again shortly.");
        }
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : "Unable to verify payment.");
      }
    };

    verify();
  }, [slug, sessionId]);

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-2xl px-6 py-20">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm md:p-12">
          {status === "checking" && (
            <>
              <Loader2 className="mx-auto h-12 w-12 animate-spin" />
              <h1 className="mt-6 text-3xl font-bold">Confirming your payment</h1>
              <p className="mt-3 text-muted-foreground">Please wait while we securely confirm your Stripe payment.</p>
            </>
          )}

          {status === "paid" && (
            <>
              <CheckCircle2 className="mx-auto h-14 w-14" />
              <h1 className="mt-6 text-3xl font-bold">Payment successful</h1>
              <p className="mt-3 text-muted-foreground">Thank you. Your website handover package is ready to download.</p>
              <a
                href={downloadUrl}
                className="mt-8 flex w-full items-center justify-center rounded-xl bg-primary px-6 py-4 text-lg font-semibold text-primary-foreground hover:opacity-90"
              >
                <Download className="mr-2 h-5 w-5" /> Download Website Handover
              </a>
              <p className="mt-4 text-xs text-muted-foreground">The server verifies your payment again before delivering the file.</p>
            </>
          )}

          {status === "error" && (
            <>
              <AlertCircle className="mx-auto h-14 w-14" />
              <h1 className="mt-6 text-3xl font-bold">Payment confirmation</h1>
              <p className="mt-3 text-muted-foreground">{message}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-8 rounded-xl border px-6 py-3 font-semibold"
              >
                Check payment again
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default HandoverSuccess;
