import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Shared data logic for the saved / favourite / loved card pages.
//   fetchPath:  API segment under /api/getCards (e.g. "getsavedcard")
//   listKey:    key of the array in the response (e.g. "savedCards")
//   deletePath: API segment under /api/deletecard (e.g. "deletesavedcard")
export function useCardList({ fetchPath, listKey, deletePath }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        router.push("/authentication/login");
      }, 3000);
      return () => clearTimeout(timer);
    }

    const email = session?.user?.email;
    if (!email) return;

    let cancelled = false;
    const fetchCards = async () => {
      try {
        const res = await fetch(`/api/getCards/${fetchPath}?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        if (!cancelled) setCards(data[listKey] || []);
      } catch (error) {
        console.error("Failed to fetch cards:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchCards();
    return () => {
      cancelled = true;
    };
  }, [session, status, router, fetchPath, listKey]);

  const handleDelete = useCallback(
    async (id, cardName) => {
      try {
        const res = await fetch(`/api/deletecard/${deletePath}/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          setCards((prev) => prev.filter((card) => card._id !== id));
          toast.success(`Card deleted successfully : ${cardName}`);
        } else {
          toast.error("Failed to delete card");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("An error occurred");
      }
    },
    [deletePath],
  );

  return { cards, loading, status, handleDelete };
}
